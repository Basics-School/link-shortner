import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
    const code = await params.code;
    try {
        const data = await prisma.link.findUnique({
            where: {
                shortCode: code,
            },
        });
        return NextResponse.redirect(data.url);

    } catch (error) {

        return NextResponse.redirect(new URL("/", request.url));
    }
}