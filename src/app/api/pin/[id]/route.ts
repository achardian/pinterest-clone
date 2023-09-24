import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const pinData = prismadb.pin.findFirst({
      where: {
        id: params.id,
      },
      include: {
        user: true,
      },
    });

    const commentsData = prismadb.comment.findMany({
      where: {
        pinId: params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    const [pin, comments] = await Promise.all([pinData, commentsData]);

    return NextResponse.json({ pin, comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong!", { status: 500 });
  }
};
