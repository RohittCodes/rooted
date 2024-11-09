"use server";

import { prisma } from "@repo/db";

export async function getUserById(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return user;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export async function getUserByEmail(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        return user;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export async function isAdmin(id: string) {
    try {
        const user = await getUserById(id);
        if(user && user.role === "ADMIN") {
            return true;
        }
    }
    catch (error) {
        console.error(error);
    }
    return false;
}