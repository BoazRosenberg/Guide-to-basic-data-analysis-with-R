import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizCardProps {
  quiz: QuizQuestion;
  onComplete?: (id: string, isCorrect: boolean) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, onComplete }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelectedIdx(idx);
    setSubmitted(true);
    const correct = idx === quiz.correctIndex;
    onComplete?.(quiz.id, correct);
  };

  const handleReset = () => {
    setSelectedIdx(null);
    setSubmitted(false);
  };

  const isCorrect = selectedIdx === quiz.correctIndex;

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/80 p-5 shadow-xs">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#20639B]">
        <HelpCircle className="w-4 h-4" />
        <span>Quick Check: Test Your Understanding</span>
      </div>

      <h4 className="mt-2 text-sm font-semibold text-slate-900 leading-snug">
        {quiz.question}
      </h4>

      <div className="mt-3 space-y-2">
        {quiz.options.map((option, idx) => {
          let stateStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300';

          if (submitted) {
            if (idx === quiz.correctIndex) {
              stateStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500/20';
            } else if (idx === selectedIdx) {
              stateStyle = 'bg-rose-50 border-rose-400 text-rose-950';
            } else {
              stateStyle = 'bg-white/60 border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={submitted}
              className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer ${stateStyle}`}
            >
              <span className="font-mono font-bold text-xs shrink-0 mt-0.5 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{option}</span>
              {submitted && idx === quiz.correctIndex && (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              )}
              {submitted && idx === selectedIdx && idx !== quiz.correctIndex && (
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div
          className={`mt-4 p-3.5 rounded-lg text-xs leading-relaxed flex items-start gap-2.5 ${
            isCorrect
              ? 'bg-emerald-100/70 text-emerald-900 border border-emerald-200'
              : 'bg-rose-100/70 text-rose-900 border border-rose-200'
          }`}
        >
          {isCorrect ? (
            <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="font-bold mb-0.5">
              {isCorrect ? 'Correct!' : 'Not quite right.'}
            </div>
            <div>{quiz.explanation}</div>
            {!isCorrect && (
              <button
                onClick={handleReset}
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 underline hover:text-rose-900 cursor-pointer"
              >
                Try again <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
