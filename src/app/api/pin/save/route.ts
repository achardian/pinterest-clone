import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export const POST = async (req: Request) => {
  const { pinId, userId } = await req.json();

  try {
    await prismadb.pin.update({
      where: {
        id: pinId,
      },
      data: {
        saveIds: {
          push: userId,
        },
      },
    });

    return NextResponse.json("Save pin", { status: 201 });
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
        saveIds: pin?.saveIds.filter((saveId) => saveId !== userId),
      },
    });
    return NextResponse.json("Pin unsave", { status: 201 });
  } catch (error) {
    return NextResponse.json("Something went wrong!", { status: 500 });
  }
};
