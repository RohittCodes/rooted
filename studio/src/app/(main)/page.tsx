import { getLessons } from "@/actions/lessons";
import { auth } from "@/auth";
import LessonCard from "@/components/globals/lesson-card";
import Link from "next/link";

export default async function Page() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return null;
  }

  const lessons = await getLessons();

  return (
    <main className="container p-4">
      <h1 className="text-2xl font-bold">
        Lessons created by you
      </h1>
      {lessons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              description={lesson.description}
              slug={lesson.slug}
              difficulty={lesson.difficulty}
              status={lesson.status}
              categoryId={lesson.categoryId}
              tagIds={lesson.tagIds}
              createdById={lesson.createdById}
            />
          ))}
        </div>
      ) : (
        <div className="h-[calc(100vh-176px)] flex flex-col justify-center items-center">
          <p>You haven't created any lessons yet.</p>
          <p>
            <Link href="/lessons/create" className="text-blue-500 hover:underline">
              Create your first lesson
            </Link>
          </p>
        </div>
      )}
    </main>
  );
}
