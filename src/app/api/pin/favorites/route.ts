import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { pinId, userId } = await req.json();

  try {
    await prismadb.pin.update({
      where: {
        id: pinId,
      },
      data: {
        likeIds: {
          push: userId,
        },
      },
    });

    return NextResponse.json("Like pin!", { status: 201 });
  } catch (error) {
    return NextResponse.json("Something went wrong!", { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const { pinId, userId } = await req.json();

  try {
    const pin = await prismadb.pin.findFirst({
      where: {
        id: pinId,
      },
    });

    await prismadb.pin.update({
      where: {
        id: pinId,
      },
      data: {
        likeIds: pin?.likeIds.filter((likeId) => likeId !== userId),
      },
    });
    return NextResponse.json("Unlike pin!", { status: 201 });
  } catch (error) {
    return NextResponse.json("Something Went wrong!", { status: 500 });
  }
};
