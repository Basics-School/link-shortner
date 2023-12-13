import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
    const code = await params.code;
        const data = await prisma.link.findUnique({
            where: {
                shortCode: code,
            },
        });
        return NextResponse.redirect(data.url);

}