import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export const GET = async (req: Request) => {
  const text = req.url.split("?query=")[1].split("%20").join(" ");
  try {
    const pins = await prismadb.pin.findMany({
      where: {
        OR: [
          {
            title: {
              contains: text,
            },
          },
          {
            tags: {
              has: text,
            },
          },
        ],
      },
    });

    return NextResponse.json(pins, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong!", { status: 500 });
  }
};
