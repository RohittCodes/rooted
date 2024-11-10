import { z } from "zod";

// Helper schemas
const slugSchema = z
  .string()
  .min(1, "Slug is required")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be in kebab-case format");

const idArraySchema = z.array(z.string()).min(1, "At least one item is required");

// Enums
export const RoleEnum = z.enum(["USER", "CREATOR", "ADMIN"]);
export const DifficultyEnum = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]);
export const LessonStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
export const ProgressStatusEnum = z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]);
export const ExerciseTypeEnum = z.enum(["QUIZ", "MULTIPLE_CHOICE", "TEXT_INPUT", "PRACTICE", "CODE_CHALLENGE"]);

// Base schemas for creation/updates
export const createUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  image: z.string().url().optional(),
  role: RoleEnum.default("USER"),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  slug: slugSchema,
  parentId: z.string().optional(),
  lessonIds: idArraySchema.optional(),
});

export const createTagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: slugSchema,
  description: z.string().optional(),
});

export const createLessonTagSchema = z.object({
  lessonId: z.string(),
  tagId: z.string(),
});

export const createLessonSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: slugSchema,
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  difficulty: DifficultyEnum,
  status: LessonStatusEnum.default("DRAFT"),
  publishedAt: z.date().optional(),
  categoryIds: idArraySchema,
  tagIds: idArraySchema,
  createdById: z.string(),
});

export const createExerciseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: ExerciseTypeEnum,
  data: z.record(z.any()),
  lessonId: z.string(),
});

export const createExerciseAttemptSchema = z.object({
  exerciseId: z.string(),
  userId: z.string(),
  answer: z.record(z.any()),
  isCorrect: z.boolean(),
});

export const createProgressSchema = z.object({
  userId: z.string(),
  lessonId: z.string(),
  status: ProgressStatusEnum,
  score: z.number().min(0).max(100).optional(),
  completedAt: z.date().optional(),
});

export const createAchievementSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  criteria: z.record(z.any()),
  icon: z.string().url().optional(),
  points: z.number().min(0).default(0),
});

export const createUserAchievementSchema = z.object({
  userId: z.string(),
  achievementId: z.string(),
});

export const createDiscussionSchema = z.object({
  content: z.string().min(1, "Content is required"),
  lessonId: z.string(),
  userId: z.string(),
  parentId: z.string().optional(),
});

// Update schemas (extending create schemas with partial fields)
export const updateUserSchema = createUserSchema.partial();
export const updateCategorySchema = createCategorySchema.partial();
export const updateTagSchema = createTagSchema.partial();
export const updateLessonSchema = createLessonSchema.partial();
export const updateLessonTagSchema = createLessonTagSchema.partial();
export const updateExerciseSchema = createExerciseSchema.partial();
export const updateProgressSchema = createProgressSchema.partial();
export const updateAchievementSchema = createAchievementSchema.partial();
export const updateDiscussionSchema = createDiscussionSchema.partial();

// Type exports
export type CreateUser = z.infer<typeof createUserSchema>;
export type CreateCategory = z.infer<typeof createCategorySchema>;
export type CreateTag = z.infer<typeof createTagSchema>;
export type CreateLesson = z.infer<typeof createLessonSchema>;
export type CreateLessonTag = z.infer<typeof createLessonTagSchema>;
export type CreateExercise = z.infer<typeof createExerciseSchema>;
export type CreateProgress = z.infer<typeof createProgressSchema>;
export type CreateAchievement = z.infer<typeof createAchievementSchema>;
export type CreateDiscussion = z.infer<typeof createDiscussionSchema>;

export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
export type UpdateTag = z.infer<typeof updateTagSchema>;
export type UpdateLesson = z.infer<typeof updateLessonSchema>;
export type UpdateLessonTag = z.infer<typeof updateLessonTagSchema>;
export type UpdateExercise = z.infer<typeof updateExerciseSchema>;
export type UpdateProgress = z.infer<typeof updateProgressSchema>;
export type UpdateAchievement = z.infer<typeof updateAchievementSchema>;
export type UpdateDiscussion = z.infer<typeof updateDiscussionSchema>;