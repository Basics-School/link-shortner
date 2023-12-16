"use server";

import * as cheerio from "cheerio";


import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";


export const createLink = async (formData) => {
    const url = formData.get("url");
    const shortCode = formData.get("shortCode");
    try {

        const response = await fetch(url);
        const htmlContent = await response.text();
        const $ = cheerio.load(htmlContent);
        const title = $("title").text() || "Untitled";

        const favicon = $("link[rel='icon']").attr("href") || "";

        if (url && shortCode)
            await prisma.link.create({
                data: {
                    favicon: favicon,
                    title: title,
                    url: url,
                    shortCode: shortCode,
                    createdAt: new Date(),
                },
            });
        revalidatePath("/");
        return {
            redirectUrl: `${process.env.NEXT_PUBLIC_AUTH_URL}/${shortCode}`,
        };
    } catch (error) {
        console.log(error);
        return { error: "Please Provide a Secure URl" };
    }
};

export const createLinkWithUser = async (formData) => {
    const session = await auth()
    console.log(session.id);
    const url = formData.get("url");
    const shortCode = formData.get("shortCode");
    try {

        const response = await fetch(url);
        const htmlContent = await response.text();
        const $ = cheerio.load(htmlContent);
        const title = $("title").text() || "Untitled";
        const favicon = $("link[rel='icon']").attr("href") || "";
        if (url && shortCode) {
            await prisma.link.create({
                data: {
                    favicon: favicon,
                    title: title,
                    url: url,
                    shortCode: shortCode,
                    createdAt: new Date(),
                    userId: session?.user.id
                },
            });
            revalidatePath("/dashboard");
        }
        return {
            redirectUrl: `${process.env.NEXT_PUBLIC_AUTH_URL}/${shortCode}`,
        };
    } catch (error) {
        console.log(error);
        return { error: "Please Provide a Secure URl" };
    }
};
