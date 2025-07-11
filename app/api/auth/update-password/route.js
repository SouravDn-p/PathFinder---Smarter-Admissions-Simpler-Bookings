import { NextResponse } from "next/server";
import client from "@/lib/mongoClient";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { currentPassword, newPassword, email } = await req.json();

    if (!currentPassword || !newPassword || !email) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const db = client.db("pathFinder");
    const user = await db.collection("Users").findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await db.collection("Users").updateOne(
      { email },
      {
        $set: {
          password: hashedNewPassword,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
