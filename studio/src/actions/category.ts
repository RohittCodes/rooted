"use server";

import { prisma } from "@/lib/db";
import { createCategorySchema, updateCategorySchema } from "@/schema";
import { z } from "zod";

export async function getCategoryById(id: string) {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
}

export async function getCategories() {
  return await prisma.category.findMany();
}

export async function createCategory(data: z.infer<typeof createCategorySchema>) {
  return await prisma.category.create({
    data,
  });
}

export async function updateCategory(id: string, data: z.infer<typeof updateCategorySchema>) {
  return await prisma.category.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteCategory(id: string) {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
}

export async function getCategoryLessons(id: string) {
  return await prisma.lesson.findMany({
    where: {
      categories: {
        some: {
          id,
        },
      },
    },
  });
}

export async function getParentCategory(id: string) {
  const category = await getCategoryById(id);
  return category?.parentId ? getCategoryById(category.parentId) : null;
}

export async function getCategoryChildren(id: string) {
  return await prisma.category.findMany({
    where: {
      parentId: id,
    },
  });
}