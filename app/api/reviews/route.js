import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import client from "@/lib/mongoClient";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const collegeId = searchParams.get("collegeId");

    const db = client.db("pathFinder");
    const reviews = db.collection("Reviews");

    const query = {};
    if (collegeId) {
      query.collegeId = collegeId;
    }

    const reviewsList = await reviews
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: reviewsList,
      total: reviewsList.length,
    });
  } catch (error) {
    console.error("Get reviews error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { collegeId, rating, comment } = body;

    if (!collegeId || !rating || !comment) {
      return NextResponse.json(
        { error: "College ID, rating, and comment are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const db = client.db("pathFinder");
    const reviews = db.collection("Reviews");

    // Check if user already reviewed this college
    const existingReview = await reviews.findOne({
      collegeId,
      userEmail: token.email,
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this college" },
        { status: 409 }
      );
    }

    const reviewData = {
      collegeId,
      rating: Number.parseInt(rating),
      comment: comment.trim(),
      userEmail: token.email,
      userName: token.name,
      userImage: token.picture,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await reviews.insertOne(reviewData);

    return NextResponse.json({
      success: true,
      message: "Review added successfully",
      data: {
        _id: result.insertedId,
        ...reviewData,
      },
    });
  } catch (error) {
    console.error("Add review error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
