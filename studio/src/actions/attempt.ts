"use server";

import { prisma } from "@/lib/db";
import { createExerciseAttemptSchema } from "@/schema";
import { z } from "zod";

export async function getAttemptById(id: string) {
  return await prisma.exerciseAttempt.findUnique({
    where: {
      id,
    },
  });
}

export async function getAttempts() {
  return await prisma.exerciseAttempt.findMany();
}

export async function createAttempt(data: z.infer<typeof createExerciseAttemptSchema>) {
  return await prisma.exerciseAttempt.create({
    data,
  });
}

export async function updateAttempt(id: string, data: z.infer<typeof createExerciseAttemptSchema>) {
  return await prisma.exerciseAttempt.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteAttempt(id: string) {
  return await prisma.exerciseAttempt.delete({
    where: {
      id,
    },
  });
}

export async function getAttemptByExerciseId(exerciseId: string) {
  return await prisma.exerciseAttempt.findMany({
    where: {
      exerciseId,
    },
  });
}

export async function getAttemptByUserId(userId: string) {
  return await prisma.exerciseAttempt.findMany({
    where: {
      userId,
    },
  });
}
