"use server";

import { prisma } from "@/lib/db";
import { createProgressSchema, updateProgressSchema } from "@/schema";
import { z } from "zod";

export async function getProgressById(id: string) {
  return await prisma.progress.findUnique({
    where: {
      id,
    },
  });
}

export async function getProgresses() {
  return await prisma.progress.findMany();
}

export async function createProgress(data: z.infer<typeof createProgressSchema>) {
  return await prisma.progress.create({
    data,
  });
}

export async function updateProgress(id: string, data: z.infer<typeof updateProgressSchema>) {
  return await prisma.progress.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteProgress(id: string) {
  return await prisma.progress.delete({
    where: {
      id,
    },
  });
}

export async function getProgressByUserId(userId: string) {
  return await prisma.progress.findMany({
    where: {
      userId,
    },
  });
}

export async function getProgressByLessonId(lessonId: string) {
  return await prisma.progress.findMany({
    where: {
      lessonId,
    },
  });
}