import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import client from "@/lib/mongoClient";
import React from "react";

export async function GET(req, context) {
  const { params } = context;
  const email = params?.email;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 🔒 Check authorization
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (email !== token.email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const db = client.db("pathFinder");
    const users = db.collection("Users");

    const user = await users.findOne(
      { email },
      {
        projection: {
          password: 0, // Exclude password from response
        },
      }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, context) {
  const { params } = context;
  const email = params?.email;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 🔒 Check authorization
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (email !== token.email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();

    // ✅ Pick only allowed fields to update
    const updateFields = {};

    // Basic user profile
    if (body.collegeId) updateFields.collegeId = body.collegeId;
    if (body.applications) updateFields.applications = body.applications;
    if (body.profile) updateFields.profile = body.profile;

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { message: "No valid fields to update" },
        { status: 400 }
      );
    }

    updateFields.updatedAt = new Date();

    const db = client.db("pathFinder");
    const users = db.collection("Users");

    const result = await users.updateOne(
      { email },
      { $set: updateFields },
      { upsert: false }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
