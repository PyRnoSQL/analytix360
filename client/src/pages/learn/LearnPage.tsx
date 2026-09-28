import { Link, useParams } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { CoursePlayer } from "../../lms/CoursePlayer";
import { COURSES } from "../../lms/registry";
import "../../lms/lms.css";

// /learn/:courseId — opens any course in the course player.
export function LearnPage() {
  const { courseId = "" } = useParams();
  const course = COURSES[courseId.toLowerCase()];

  if (!course) {
    return (
      <div className="lms grid min-h-[100dvh] place-items-center px-6 text-center">
        <div>
          <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-white/[0.06] text-[color:var(--muted)]"><BookOpen size={30} /></span>
          <h1 className="lms-display text-3xl font-semibold text-white">Course not found</h1>
          <p className="mt-2 text-[color:var(--muted)]">Check the link, or choose a program from the training catalog.</p>
          <Link to="/training" className="mt-6 inline-flex rounded-xl bg-[color:var(--acc)] px-6 py-3 font-bold text-[#1F1303]">Browse programs</Link>
        </div>
      </div>
    );
  }

  return <CoursePlayer key={course.id} course={course} backLink={<Link to="/training">← Training</Link>} />;
}
