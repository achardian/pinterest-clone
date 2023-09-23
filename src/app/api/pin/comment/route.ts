import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { pinId, userId, comment } = await req.json();

  try {
    await prismadb.comment.create({
      data: {
        pinId,
        userId,
        comment,
      },
    });

    return NextResponse.json("Created new comment!", { status: 201 });
  } catch (error) {
    return NextResponse.json("Unable to create new comment!", { status: 500 });
  }
};
