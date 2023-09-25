import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const userData = prismadb.user.findFirst({
      where: {
        id: params.id,
      },
    });

    const createdPinsData = prismadb.pin.findMany({
      where: {
        userId: params.id,
      },
    });

    const savedPinsData = prismadb.pin.findMany({
      where: {
        saveIds: {
          has: params.id,
        },
      },
    });

    const [user, createdPins, savedPins] = await Promise.all([
      userData,
      createdPinsData,
      savedPinsData,
    ]);

    return NextResponse.json({ user, createdPins, savedPins }, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong!", { status: 500 });
  }
};
