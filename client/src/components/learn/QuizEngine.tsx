import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Award, ChevronRight } from "lucide-react";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Props {
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  onComplete: (score: number, passed: boolean) => void;
}

export function QuizEngine({ title, questions, passingScore, onComplete }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const q = questions[currentQ];
  if (!q) return null;

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = selected;
    setAnswers(newAnswers);
    setAnswered(true);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResults(true);
      // Recount with latest answer
      const finalAnswers = [...answers];
      finalAnswers[currentQ] = selected;
      const finalCorrect = finalAnswers.filter((a, i) => a === questions[i]?.correctIndex).length;
      const score = Math.round((finalCorrect / questions.length) * 100);
      onComplete(score, score >= passingScore);
    }
  };

  const handleRetake = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
  };

  // Calculate final score for results
  const finalAnswers = [...answers];
  if (showResults && selected !== null) finalAnswers[currentQ] = selected;
  const correctCount = finalAnswers.filter((a, i) => a === questions[i]?.correctIndex).length;
  const scorePercent = Math.round((correctCount / questions.length) * 100);
  const passed = scorePercent >= passingScore;

  if (showResults) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <div className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
            <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${passed ? "bg-emerald-100" : "bg-rose-100"}`}>
              {passed ? <Award size={40} className="text-emerald-500" /> : <XCircle size={40} className="text-rose-500" />}
            </div>
          </motion.div>
          <h3 className="mt-4 text-2xl font-extrabold text-navy">{passed ? "Congratulations!" : "Keep Practicing"}</h3>
          <p className="mt-2 text-sm text-slate-500">{title}</p>

          <div className="mt-6 flex items-center justify-center gap-8">
            <div className="text-center">
              <p className={`text-4xl font-extrabold ${passed ? "text-emerald-500" : "text-rose-500"}`}>{scorePercent}%</p>
              <p className="text-xs text-slate-400">Your Score</p>
            </div>
            <div className="h-12 w-px bg-slate-200" />
            <div className="text-center">
              <p className="text-4xl font-extrabold text-slate-300">{passingScore}%</p>
              <p className="text-xs text-slate-400">Passing Score</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            {correctCount} of {questions.length} correct
          </p>

          {/* Answer Review */}
          <div className="mt-6 space-y-2 text-left">
            {questions.map((question, i) => {
              const userAnswer = finalAnswers[i];
              const isCorrect = userAnswer === question.correctIndex;
              return (
                <div key={question.id} className={`rounded-xl p-3 ${isCorrect ? "bg-emerald-50" : "bg-rose-50"}`}>
                  <div className="flex items-start gap-2">
                    {isCorrect ? <CheckCircle2 size={16} className="mt-0.5 text-emerald-500 flex-shrink-0" /> : <XCircle size={16} className="mt-0.5 text-rose-500 flex-shrink-0" />}
                    <div>
                      <p className="text-xs font-semibold text-navy">{question.question}</p>
                      {!isCorrect && (
                        <p className="mt-1 text-[11px] text-rose-600">Your answer: {question.options[userAnswer ?? 0]} → Correct: {question.options[question.correctIndex]}</p>
                      )}
                      <p className="mt-1 text-[10px] text-slate-500">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center gap-3">
            {!passed && (
              <button onClick={handleRetake} className="flex items-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-navy hover:bg-slate-50">
                <RotateCcw size={14} /> Retake Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500">{title}</span>
          <span className="text-xs font-bold text-navy">Question {currentQ + 1} of {questions.length}</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-brand transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      {/* Question */}
      <h4 className="text-lg font-bold text-navy">{q.question}</h4>

      {/* Options */}
      <div className="mt-4 space-y-2">
        {q.options.map((opt, i) => {
          let style = "border-slate-200 bg-slate-50 hover:border-brand/40";
          if (answered) {
            if (i === q.correctIndex) style = "border-emerald-400 bg-emerald-50";
            else if (i === selected && i !== q.correctIndex) style = "border-rose-400 bg-rose-50";
            else style = "border-slate-100 bg-slate-50 opacity-50";
          } else if (i === selected) {
            style = "border-brand bg-brand/5";
          }
          return (
            <button key={i} onClick={() => handleSelect(i)}
              className={`flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${style}`}>
              <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${i === selected ? "bg-brand text-white" : "bg-slate-200 text-slate-500"}`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm text-navy">{opt}</span>
              {answered && i === q.correctIndex && <CheckCircle2 size={18} className="ml-auto text-emerald-500 flex-shrink-0" />}
              {answered && i === selected && i !== q.correctIndex && <XCircle size={18} className="ml-auto text-rose-500 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className={`mt-4 rounded-xl p-4 ${selected === q.correctIndex ? "bg-emerald-50 border border-emerald-200" : "bg-rose-50 border border-rose-200"}`}>
          <p className={`text-xs font-bold ${selected === q.correctIndex ? "text-emerald-700" : "text-rose-700"}`}>
            {selected === q.correctIndex ? "✓ Correct!" : "✗ Incorrect"}
          </p>
          <p className="mt-1 text-xs text-slate-600">{q.explanation}</p>
        </motion.div>
      )}

      {/* Action Button */}
      <div className="mt-6 flex justify-end">
        {!answered ? (
          <button onClick={handleConfirm} disabled={selected === null}
            className="flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 hover:bg-brand/90">
            Confirm Answer
          </button>
        ) : (
          <button onClick={handleNext}
            className="flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand/90">
            {currentQ < questions.length - 1 ? <>Next Question <ChevronRight size={14} /></> : <>View Results <Award size={14} /></>}
          </button>
        )}
      </div>
    </div>
  );
}
