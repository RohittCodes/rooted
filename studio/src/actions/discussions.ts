"use server";

import { prisma } from "@/lib/db";
import { createDiscussionSchema, updateDiscussionSchema } from "@/schema";
import { z } from "zod";

export async function getDiscussionById(id: string) {
  return await prisma.discussion.findUnique({
    where: {
      id,
    },
  });
}

export async function getDiscussions() {
  return await prisma.discussion.findMany();
}

export async function createDiscussion(data: z.infer<typeof createDiscussionSchema>) {
  return await prisma.discussion.create({
    data,
  });
}

export async function updateDiscussion(id: string, data: z.infer<typeof updateDiscussionSchema>) {
  return await prisma.discussion.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteDiscussion(id: string) {
  return await prisma.discussion.delete({
    where: {
      id,
    },
  });
}