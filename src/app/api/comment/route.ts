import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { redis } from "@/lib/redis";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { text, tags } = body;

    const commentId = nanoid();

    // Add comment to list
    await redis.rpush("comments", commentId);

    // Add tags to comments
    await redis.sadd(`tags:${commentId}`, tags);

    // Retrieve and store comment details
    const comment = {
      text,
      timestamp: new Date(),
      author: req.cookies.get("userId")?.value,
    };

    await redis.hset(`comment_details:${commentId}`, comment);

    return new Response("OK");
  } catch (err) {
    console.error(err);
    return new Response("Error", { status: 500 }); // Return an error response
  }
};
