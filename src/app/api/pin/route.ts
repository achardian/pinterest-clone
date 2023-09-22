import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const {
    title,
    description,
    destination,
    tags,
    imageUrl,
    imageHeight,
    imageWidth,
    userId,
  } = await req.json();

  try {
    await prismadb.pin.create({
      data: {
        title,
        description,
        destination,
        tags,
        imageUrl,
        imageHeight,
        imageWidth,
        userId,
      },
    });

    return NextResponse.json("Sucessfully created pin!", { status: 201 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(err.message);
  }
};
