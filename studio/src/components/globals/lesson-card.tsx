import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  slug: string;
  difficulty: string;
  status: string;
  categoryId: string;
  tagIds: string[];
  createdById: string;
}

const LessonCard = ({
  id,
  title,
  description,
  slug,
  difficulty,
  status,
  categoryId,
  tagIds,
  createdById,
}: LessonCardProps) => {
  return (
    <Link href={`/lesson/${slug}`}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
        <CardFooter>
          <p>{difficulty}</p>
          <p>{status}</p>
          <p>{categoryId}</p>
          <p>{tagIds}</p>
          <p>{createdById}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default LessonCard;
