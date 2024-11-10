"use server";

import { prisma } from "@/lib/db";
import { createUserAchievementSchema } from "@/schema";
import { z } from "zod";

export async function getUserAchievementById(id: string) {
  return await prisma.userAchievement.findUnique({
    where: {
      id,
    },
  });
}

export async function getUserAchievements() {
  return await prisma.userAchievement.findMany();
}

export async function createUserAchievement(data: z.infer<typeof createUserAchievementSchema>) {
  return await prisma.userAchievement.create({
    data,
  });
}

export async function updateUserAchievement(id: string, data: z.infer<typeof createUserAchievementSchema>) {
  return await prisma.userAchievement.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteUserAchievement(id: string) {
  return await prisma.userAchievement.delete({
    where: {
      id,
    },
  });
}

export async function getUserAchievementByUserId(userId: string) {
  return await prisma.userAchievement.findMany({
    where: {
      userId,
    },
  });
}

export async function getUserAchievementByAchievementId(achievementId: string) {
  return await prisma.userAchievement.findMany({
    where: {
      achievementId,
    },
  });
}