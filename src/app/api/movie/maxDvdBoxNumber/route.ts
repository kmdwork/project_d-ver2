import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId } = await req.json();
    if (!userId) {
        return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const result = await prisma.movie.aggregate({
        where: {
            authorId: userId
        },
        _max: {
            dvdBoxNumber: true, // 最大値を取得
        },
    })

    return NextResponse.json({ maxBoxNumber: result._max.dvdBoxNumber ?? 0 })
}