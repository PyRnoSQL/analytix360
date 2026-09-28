import { Link } from "react-router-dom";
import { CoursePlayer } from "../../lms/CoursePlayer";
import { MOSP_COURSE } from "../../data/courses/mosp";

export function MospCoursePage() {
  return <CoursePlayer course={MOSP_COURSE} backLink={<Link to="/training">← Training</Link>} />;
}
