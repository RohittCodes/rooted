"use server";

import { prisma } from "@/lib/db";
import { createAchievementSchema, updateAchievementSchema } from "@/schema";
import { z } from "zod";

export async function getAchievementById(id: string) {
  return await prisma.achievement.findUnique({
    where: {
      id,
    },
  });
}

export async function getAchievements() {
  return await prisma.achievement.findMany();
}

export async function createAchievement(data: z.infer<typeof createAchievementSchema>) {
  return await prisma.achievement.create({
    data,
  });
}

export async function updateAchievement(id: string, data: z.infer<typeof updateAchievementSchema>) {
  return await prisma.achievement.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteAchievement(id: string) {
  return await prisma.achievement.delete({
    where: {
      id,
    },
  });
}