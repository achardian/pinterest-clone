import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const pins = await prismadb.pin.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(pins, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong!", { status: 500 });
  }
};
