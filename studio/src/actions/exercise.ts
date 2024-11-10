"use server";

import { prisma } from "@/lib/db";
import { createExerciseSchema, updateExerciseSchema } from "@/schema";
import { z } from "zod";

export async function getExerciseById(id: string) {
  return await prisma.exercise.findUnique({
    where: {
      id,
    },
  });
}

export async function getExercises() {
  return await prisma.exercise.findMany();
}

export async function createExercise(data: z.infer<typeof createExerciseSchema>) {
  return await prisma.exercise.create({
    data,
  });
}

export async function updateExercise(id: string, data: z.infer<typeof updateExerciseSchema>) {
  return await prisma.exercise.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteExercise(id: string) {
  return await prisma.exercise.delete({
    where: {
      id,
    },
  });
}