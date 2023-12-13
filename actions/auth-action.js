"use server";

import { redirect } from "next/navigation";
import { generateCode } from "@/lib/generate-code";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { signIn } from "@/lib/auth";

export const signInWithCredential = async (prevState, formData) => {
    try {
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        })
    } catch (err) {
        if (err) {
            return {
                error: "Email or password don't match ",
                code: 301,
            }
        }
        throw err;
    }
    redirect("/dashboard");
};

export const signUp = async (prevState, formaData) => {
    try {
        const username = formaData.get("username")
        const lastName = formaData.get("last-name")
        const firstName = formaData.get("first-name")
        const password = formaData.get("password")
        const email = formaData.get("email")


        const data = await prisma.user.findFirst({
            where: { username: username },
        });
        if (data)
            return {
                code: 302,
                error: "Username already exists",
            };
        const hashedPassword = await hash(password, 10);
        const response = await prisma.user.create({
            data: {
                name: firstName + " " + lastName,
                email: email,
                username: username,
                password: hashedPassword,
                accounts: {
                    create: [
                        {
                            provider: "email-password",
                            type: "credentials",
                            providerAccountId: await generateCode(16),
                            access_token: await generateCode(16),
                            token_type: "bearer",
                        },
                    ],
                },
            },
        });
        if (!response) {
            return {
                code: 301,
                error: "Something went wrong,please try again later",
            };
        }
        console.log(response);
    } catch (error) {
        console.log(error);
        return {
            code: 301,
            error: "Something went wrong,please try again later",
        };
    }
    redirect("/sign-in");
};