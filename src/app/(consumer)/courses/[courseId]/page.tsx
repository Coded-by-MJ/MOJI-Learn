import { AsyncBoundary } from "@/components/global/AsyncBoundary";
import { PageHeader } from "@/components/global/PageHeader";
import { db } from "@/drizzle/db";
import { CourseTable } from "@/drizzle/schema";
import { getCourseIdTag } from "@/features/courses/db/cache";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { notFound } from "next/navigation";

export default  function CoursePage(
  props: PageProps<"/courses/[courseId]">
) {
  return (
    <AsyncBoundary>
      <CoursePageContent {...props} />
    </AsyncBoundary>
  );
}

async function CoursePageContent(props: PageProps<"/courses/[courseId]">) {
  const { courseId } = await props.params;
  const course = await getCourse(courseId);

  if (course == null) return notFound();

  return (
    <div className="my-6 container">
      <PageHeader className="mb-2" title={course.name} />
      <p className="text-muted-foreground">{course.description}</p>
    </div>
  );
}

async function getCourse(id: string) {
  "use cache";
  cacheTag(getCourseIdTag(id));

  return db.query.CourseTable.findFirst({
    columns: { id: true, name: true, description: true },
    where: eq(CourseTable.id, id),
  });
}
