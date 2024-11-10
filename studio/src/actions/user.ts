"use server";

import { prisma } from "@/lib/db";
import { UpdateUser } from "@/schema";

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function updateUser(id: string, data: UpdateUser) {
    return await prisma.user.update({
        where: {
            id,
        },
        data,
    });
}

export async function isAdmin(id: string) {
  const user = await getUserById(id);
  return user?.role === "ADMIN";
}

export async function getUsers() {
  return await prisma.user.findMany();
}