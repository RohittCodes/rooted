"use server";

import { prisma } from "@/lib/db";
import { createLessonSchema, updateLessonSchema } from "@/schema";
import { z } from "zod";
import { getUserById } from "./user";

export async function getLessonById(id: string) {
  return await prisma.lesson.findUnique({
    where: { id },
    include: {
      categories: true,
      lessonTags: {
        include: {
          tag: true
        }
      }
    }
  });
}

export async function getLessons() {
  return await prisma.lesson.findMany({
    include: {
      categories: true,
      lessonTags: {
        include: {
          tag: true
        }
      }
    }
  });
}

export async function createLesson(data: z.infer<typeof createLessonSchema>) {
  const { categoryIds, tagIds, ...lessonData } = data;

  return await prisma.lesson.create({
    data: {
      ...lessonData,
      categories: {
        connect: categoryIds.map(id => ({ id }))
      },
      lessonTags: {
        create: tagIds.map(tagId => ({
          tag: { connect: { id: tagId } }
        }))
      }
    },
    include: {
      categories: true,
      lessonTags: {
        include: {
          tag: true
        }
      }
    }
  });
}

export async function updateLesson(id: string, data: z.infer<typeof updateLessonSchema>) {
  const { categoryIds, tagIds, ...updateData } = data;

  // Start building the update operation
  const updateOperation: any = {
    ...updateData
  };

  // If categoryIds is provided, update categories
  if (categoryIds) {
    updateOperation.categories = {
      set: [], // Clear existing connections
      connect: categoryIds.map(id => ({ id }))
    };
  }

  // If tagIds is provided, update tags
  if (tagIds) {
    // First delete existing tag relationships
    await prisma.lessonTag.deleteMany({
      where: { lessonId: id }
    });

    // Then create new ones
    updateOperation.lessonTags = {
      create: tagIds.map(tagId => ({
        tag: { connect: { id: tagId } }
      }))
    };
  }

  return await prisma.lesson.update({
    where: { id },
    data: updateOperation,
    include: {
      categories: true,
      lessonTags: {
        include: {
          tag: true
        }
      }
    }
  });
}

export async function deleteLesson(id: string) {
  // LessonTags will be automatically deleted due to cascading delete
  return await prisma.lesson.delete({
    where: { id }
  });
}

export async function getLessonExercises(id: string) {
  return await prisma.exercise.findMany({
    where: { lessonId: id }
  });
}

export async function getLessonDiscussions(id: string) {
  return await prisma.discussion.findMany({
    where: { lessonId: id },
    include: {
      user: true,
      replies: true
    }
  });
}

export async function getLessonProgresses(id: string) {
  return await prisma.progress.findMany({
    where: { lessonId: id },
    include: {
      user: true
    }
  });
}

export async function getLessonTags(id: string) {
  return await prisma.lessonTag.findMany({
    where: { lessonId: id },
    include: {
      tag: true
    }
  });
}

export async function getLessonCategories(id: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      categories: true
    }
  });
  return lesson?.categories || [];
}

export async function getLessonCreator(id: string) {
  const lesson = await getLessonById(id);
  return lesson ? getUserById(lesson.createdById) : null;
}

export async function getLessonUsers(id: string) {
  return await prisma.progress.findMany({
    where: { lessonId: id },
    select: {
      user: true
    }
  });
}

export async function getLessonUserProgress(id: string, userId: string) {
  return await prisma.progress.findFirst({
    where: {
      lessonId: id,
      userId
    }
  });
}

export async function getLessonUserAttempts(id: string, userId: string) {
  return await prisma.exerciseAttempt.findMany({
    where: {
      userId,
      exercise: {
        lessonId: id
      }
    },
    include: {
      exercise: true
    }
  });
}

// New helper functions for managing tags and categories

export async function addTagToLesson(lessonId: string, tagId: string) {
  return await prisma.lessonTag.create({
    data: {
      lesson: { connect: { id: lessonId } },
      tag: { connect: { id: tagId } }
    },
    include: {
      tag: true
    }
  });
}

export async function removeTagFromLesson(lessonId: string, tagId: string) {
  return await prisma.lessonTag.delete({
    where: {
      lessonId_tagId: {
        lessonId,
        tagId
      }
    }
  });
}

export async function addCategoryToLesson(lessonId: string, categoryId: string) {
  return await prisma.lesson.update({
    where: { id: lessonId },
    data: {
      categories: {
        connect: { id: categoryId }
      }
    },
    include: {
      categories: true
    }
  });
}

export async function removeCategoryFromLesson(lessonId: string, categoryId: string) {
  return await prisma.lesson.update({
    where: { id: lessonId },
    data: {
      categories: {
        disconnect: { id: categoryId }
      }
    },
    include: {
      categories: true
    }
  });
}