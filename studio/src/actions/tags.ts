"use server";

import { prisma } from "@/lib/db";
import { createTagSchema, updateTagSchema } from "@/schema";
import { z } from "zod";

export async function getTagById(id: string) {
  return await prisma.tag.findUnique({
    where: {
      id,
    },
  });
}

export async function getTags() {
  return await prisma.tag.findMany();
}

export async function createTag(data: z.infer<typeof createTagSchema>) {
  return await prisma.tag.create({
    data,
  });
}

export async function updateTag(id: string, data: z.infer<typeof updateTagSchema>) {
  return await prisma.tag.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteTag(id: string) {
  return await prisma.tag.delete({
    where: {
      id,
    },
  });
}

export async function getTagLessons(id: string) {
  return await prisma.lesson.findMany({
    where: {
      lessonTags: {
        some: {
          tagId: id,
        },
      },
    },
  });
}