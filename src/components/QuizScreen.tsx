import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  User,
  CheckCircle2,
  HelpCircle,
  ListFilter
} from 'lucide-react';
import { Question, StudentOption } from '../types';

interface QuizScreenProps {
  studentName: StudentOption;
  questions: Question[];
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  onSelectAnswer: (questionNum: number, answer: 'A' | 'B' | 'C' | 'D') => void;
  onSubmit: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  studentName,
  questions,
  userAnswers,
  onSelectAnswer,
  onSubmit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestionPalette, setShowQuestionPalette] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const currentAnswer = userAnswers[currentQuestion.cau];

  const answeredCount = Object.keys(userAnswers).length;
  const progressPercentage = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      onSubmit();
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentIndex(index);
    setShowQuestionPalette(false);
  };

  const options: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];

  return (
    <div id="quiz-container" className="w-full max-w-2xl mx-auto space-y-4">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">
              <User className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Học sinh</div>
              <div className="text-sm sm:text-base font-bold text-slate-800">{studentName}</div>
            </div>
          </div>

          {/* Quick toggle palette on mobile */}
          <button
            type="button"
            onClick={() => setShowQuestionPalette(!showQuestionPalette)}
            className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Danh sách</span>
          </button>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="text-xs sm:text-sm font-semibold text-slate-600">
            Đã làm: <span className="text-sky-600 font-bold">{answeredCount}</span>/{totalQuestions} câu
          </div>
          <button
            type="button"
            onClick={() => setShowQuestionPalette(!showQuestionPalette)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>{showQuestionPalette ? 'Ẩn bảng câu hỏi' : 'Bảng câu hỏi'}</span>
          </button>
        </div>
      </div>

      {/* Question Palette (Drawer / Grid) */}
      {showQuestionPalette && (
        <div className="bg-white rounded-2xl shadow-md border border-sky-100 p-4 sm:p-5 transition-all animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs sm:text-sm font-bold text-slate-700">Chọn nhanh câu hỏi:</span>
            <span className="text-xs text-slate-400">Xanh lá: đã chọn • Xám: chưa chọn</span>
          </div>
          <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5 max-h-48 overflow-y-auto p-1">
            {questions.map((q, idx) => {
              const isAnswered = !!userAnswers[q.cau];
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.cau}
                  type="button"
                  onClick={() => handleJumpToQuestion(idx)}
                  className={`h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                    isCurrent
                      ? 'ring-2 ring-sky-500 ring-offset-1 bg-sky-500 text-white font-extrabold shadow-sm'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {q.cau}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-200/80 p-5 sm:p-8 relative">
        {/* Progress Bar Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-600 mb-2">
            <span className="inline-flex items-center gap-1.5 text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100 font-bold">
              Câu {currentQuestion.cau} / {totalQuestions}
            </span>
            <span className="text-slate-400 font-medium">Tiến độ: {progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1.5">
            Question {currentQuestion.cau}
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug tracking-tight">
            {currentQuestion.hoi}
          </h2>
        </div>

        {/* Options List */}
        <div className="space-y-3 mb-8">
          {options.map((opt) => {
            const isSelected = currentAnswer === opt;
            const optionText = currentQuestion[opt];

            return (
              <button
                key={opt}
                id={`option-${currentQuestion.cau}-${opt}`}
                type="button"
                onClick={() => onSelectAnswer(currentQuestion.cau, opt)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer select-none active:scale-[0.99] ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/80 shadow-md shadow-sky-100 text-slate-900'
                    : 'border-slate-200/90 bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-bold text-sm transition-colors ${
                    isSelected
                      ? 'bg-sky-500 text-white shadow-sm shadow-sky-200'
                      : 'bg-white border border-slate-300 text-slate-600'
                  }`}
                >
                  {opt}
                </div>
                <div className="pt-0.5 text-sm sm:text-base font-medium leading-relaxed flex-1">
                  {optionText}
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Buttons: Prev & Next / Submit */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            id="prev-question-btn"
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`py-3 px-4 sm:px-5 rounded-2xl text-sm sm:text-base font-bold flex items-center gap-1.5 transition-all ${
              currentIndex === 0
                ? 'opacity-40 text-slate-400 cursor-not-allowed'
                : 'text-slate-600 hover:bg-slate-100 active:scale-95 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Câu trước</span>
            <span className="sm:hidden">Trước</span>
          </button>

          <button
            id="next-question-btn"
            type="button"
            onClick={handleNext}
            disabled={!currentAnswer}
            className={`py-3.5 px-6 sm:px-8 rounded-2xl text-sm sm:text-base font-bold flex items-center gap-2 transition-all shadow-md ${
              !currentAnswer
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : isLastQuestion
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300 active:scale-[0.98] cursor-pointer'
                : 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-700 shadow-sky-200 hover:shadow-lg hover:shadow-sky-300 active:scale-[0.98] cursor-pointer'
            }`}
          >
            {isLastQuestion ? (
              <>
                <span>Nộp bài</span>
                <Send className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Câu tiếp theo</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
