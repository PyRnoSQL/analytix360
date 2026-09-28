import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, BookOpen, CheckCircle2,
  FileText, Download, ClipboardList, GraduationCap,
  Menu, X,
} from "lucide-react";
import { QuizEngine, type QuizQuestion } from "@/components/learn/QuizEngine";
import { DAS_COURSE } from "@/data/courses/das";

// ─── Types ───
export interface LessonContent {
  id: string;
  title: string;
  type: "lesson" | "quiz" | "assignment";
  content?: string; // HTML/markdown content for lessons
  videoUrl?: string; // YouTube embed URL
  downloadUrl?: string; // PDF download
  quiz?: QuizQuestion[];
  assignmentBrief?: string;
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  lessons: LessonContent[];
}

export interface CourseData {
  id: string;
  title: string;
  acronym: string;
  modules: CourseModule[];
}

// ─── Progress Storage (localStorage until Supabase) ───
function getProgress(courseId: string): Record<string, { completed: boolean; score?: number }> {
  try {
    const raw = localStorage.getItem(`progress_${courseId}`);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveProgress(courseId: string, lessonId: string, completed: boolean, score?: number) {
  const progress = getProgress(courseId);
  progress[lessonId] = { completed, score };
  localStorage.setItem(`progress_${courseId}`, JSON.stringify(progress));
}

// ─── Course Lookup ───
function getCourse(courseId: string): CourseData | null {
  if (courseId === "das") return DAS_COURSE;
  return null;
}

// ─── Main Component ───
export function CourseViewer() {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [progress, setProgress] = useState<Record<string, { completed: boolean; score?: number }>>({});

  const course = getCourse(courseId ?? "");

  useEffect(() => {
    if (courseId) setProgress(getProgress(courseId));
  }, [courseId]);

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto text-slate-300" />
          <h2 className="mt-4 text-xl font-bold text-navy">Course Not Found</h2>
          <p className="mt-2 text-sm text-slate-500">This course doesn't exist or you don't have access.</p>
          <Link to="/training" className="mt-4 inline-block rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white">Browse Courses</Link>
        </div>
      </div>
    );
  }

  const mod = course.modules[activeModule];
  const lesson = mod?.lessons[activeLesson];
  if (!mod || !lesson) return null;

  const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = Object.values(progress).filter(p => p.completed).length;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const handleLessonComplete = (score?: number) => {
    if (courseId) {
      saveProgress(courseId, lesson.id, true, score);
      setProgress(getProgress(courseId));
    }
  };

  const handleQuizComplete = (score: number, passed: boolean) => {
    if (passed) handleLessonComplete(score);
  };

  const navigateToLesson = (modIdx: number, lesIdx: number) => {
    setActiveModule(modIdx);
    setActiveLesson(lesIdx);
    window.scrollTo(0, 0);
  };

  const goNext = () => {
    if (activeLesson < mod.lessons.length - 1) {
      navigateToLesson(activeModule, activeLesson + 1);
    } else if (activeModule < course.modules.length - 1) {
      navigateToLesson(activeModule + 1, 0);
    }
  };

  const goPrev = () => {
    if (activeLesson > 0) {
      navigateToLesson(activeModule, activeLesson - 1);
    } else if (activeModule > 0) {
      const prevMod = course.modules[activeModule - 1];
      if (prevMod) navigateToLesson(activeModule - 1, prevMod.lessons.length - 1);
    }
  };

  const isFirstLesson = activeModule === 0 && activeLesson === 0;
  const isLastLesson = activeModule === course.modules.length - 1 && activeLesson === mod.lessons.length - 1;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* ─── Sidebar ─── */}
      <div className={`fixed inset-y-0 left-0 z-40 w-80 transform bg-white border-r border-slate-200 transition-transform lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <Link to="/training" className="text-xs font-semibold text-brand hover:underline flex items-center gap-1">
                <ChevronLeft size={12} /> Back to Institute
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden rounded-full p-1 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>
            <h3 className="mt-2 text-sm font-extrabold text-navy">{course.title}</h3>
            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[10px] font-semibold">
                <span className="text-slate-400">{overallProgress}% complete</span>
                <span className="text-slate-400">{completedLessons}/{totalLessons}</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-emerald-500 transition-all" style={{ width: `${overallProgress}%` }} />
              </div>
            </div>
          </div>

          {/* Module List */}
          <div className="flex-1 overflow-y-auto p-3">
            {course.modules.map((m, mi) => (
              <div key={m.id} className="mb-3">
                <div className={`rounded-lg px-3 py-2 text-xs font-bold ${mi === activeModule ? "bg-brand/10 text-brand" : "text-slate-500"}`}>
                  M{m.number}: {m.title}
                </div>
                <div className="mt-1 space-y-0.5">
                  {m.lessons.map((l, li) => {
                    const isActive = mi === activeModule && li === activeLesson;
                    const isComplete = progress[l.id]?.completed;
                    const TypeIcon = l.type === "quiz" ? ClipboardList : l.type === "assignment" ? FileText : BookOpen;
                    return (
                      <button key={l.id} onClick={() => navigateToLesson(mi, li)}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[11px] transition-colors ${isActive ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-100"}`}>
                        {isComplete ? (
                          <CheckCircle2 size={13} className={isActive ? "text-white" : "text-emerald-500"} />
                        ) : (
                          <TypeIcon size={13} className={isActive ? "text-white" : "text-slate-400"} />
                        )}
                        <span className="flex-1 truncate">{l.title}</span>
                        {l.type === "quiz" && progress[l.id]?.score !== undefined && (
                          <span className={`text-[9px] font-bold ${isActive ? "text-white/70" : "text-slate-400"}`}>{progress[l.id]?.score}%</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Certificate */}
          {overallProgress === 100 && (
            <div className="border-t border-slate-200 p-4">
              <Link to="/portal/certificates" className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-600">
                <GraduationCap size={16} /> View Your Certificate
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-lg p-2 hover:bg-slate-100 lg:hidden">
              <Menu size={18} />
            </button>
            <div>
              <p className="text-[10px] font-semibold text-slate-400">Module {mod.number} · {lesson.type === "quiz" ? "Quiz" : lesson.type === "assignment" ? "Assignment" : "Lesson"}</p>
              <p className="text-sm font-bold text-navy">{lesson.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!progress[lesson.id]?.completed && lesson.type === "lesson" && (
              <button onClick={() => handleLessonComplete()} className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-600">
                Mark Complete ✓
              </button>
            )}
            {progress[lesson.id]?.completed && (
              <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600">
                <CheckCircle2 size={13} /> Completed
              </span>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="mx-auto max-w-4xl px-6 py-8">
          {/* Lesson content */}
          {lesson.type === "lesson" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {lesson.videoUrl && (
                <div className="mb-6 aspect-video overflow-hidden rounded-2xl bg-black">
                  <iframe src={lesson.videoUrl} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              )}
              {lesson.content && (
                <div className="prose prose-slate max-w-none rounded-2xl border border-slate-200 bg-white p-8"
                  dangerouslySetInnerHTML={{ __html: lesson.content }} />
              )}
              {lesson.downloadUrl && (
                <a href={lesson.downloadUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 px-5 py-3 text-sm font-semibold text-navy hover:bg-slate-50">
                  <Download size={16} /> Download Materials (PDF)
                </a>
              )}
            </motion.div>
          )}

          {/* Quiz */}
          {lesson.type === "quiz" && lesson.quiz && (
            <QuizEngine
              title={lesson.title}
              questions={lesson.quiz}
              passingScore={70}
              onComplete={handleQuizComplete}
            />
          )}

          {/* Assignment */}
          {lesson.type === "assignment" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-200 bg-white p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                  <FileText size={20} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">{lesson.title}</h3>
                  <p className="text-xs text-slate-400">Practical Assignment</p>
                </div>
              </div>
              {lesson.assignmentBrief && (
                <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: lesson.assignmentBrief }} />
              )}
              <button onClick={() => handleLessonComplete()} className="mt-6 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600">
                Mark Assignment Submitted ✓
              </button>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button onClick={goPrev} disabled={isFirstLesson}
              className="flex items-center gap-2 rounded-xl border-2 border-slate-200 px-5 py-3 text-sm font-semibold text-navy hover:bg-slate-50 disabled:opacity-30">
              <ChevronLeft size={16} /> Previous
            </button>
            <button onClick={goNext} disabled={isLastLesson}
              className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand/90 disabled:opacity-30">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
