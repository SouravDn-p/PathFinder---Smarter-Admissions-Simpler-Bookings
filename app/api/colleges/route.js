import client from "@/lib/mongoClient";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await client.connect();
    const db = client.db("pathFinder");
    const collegeCollection = db.collection("colleges");

    const college = await collegeCollection.find({}).toArray();

    return NextResponse.json({
      message: "success",
      status: 200,
      data: college,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch colleges",
        error: error.message,
      },
      { status: 500 }
    );
  } finally {
    // Optional: Do not close the client for serverless functions
    // await client.close();
  }
}
