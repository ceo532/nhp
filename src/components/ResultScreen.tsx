import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Award,
  Sparkles,
  HelpCircle,
  Filter
} from 'lucide-react';
import { Question, StudentOption } from '../types';

interface ResultScreenProps {
  studentName: StudentOption;
  questions: Question[];
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  studentName,
  questions,
  userAnswers,
  onRestart,
}) => {
  const [filter, setFilter] = useState<'all' | 'wrong' | 'correct'>('all');
  const hasSentWebhook = useRef(false);

  // Calculate score
  const correctCount = questions.reduce((acc, q) => {
    return acc + (userAnswers[q.cau] === q.dapAn ? 1 : 0);
  }, 0);

  const totalQuestions = questions.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // Send webhook immediately on mount
  useEffect(() => {
    if (hasSentWebhook.current) return;
    hasSentWebhook.current = true;

    const webhookUrl =
      'https://script.google.com/macros/s/AKfycbw00EtPyhylfx8ZUg3o7CFvc5g44RK17byvTJqy8kMY6grcfIVpTAT7Enu9NenGnBFR/exec';

    const payload = {
      ten: studentName,
      lop: 'ielts',
      diem: correctCount,
      tongCau: totalQuestions,
      url: window.location.href,
    };

    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        console.log('Webhook result sent successfully:', res.status);
      })
      .catch((err) => {
        console.error('Webhook error:', err);
      });
  }, [studentName, correctCount, totalQuestions]);

  const wrongCount = totalQuestions - correctCount;

  // Filter questions for display
  const filteredQuestions = questions.filter((q) => {
    const isCorrect = userAnswers[q.cau] === q.dapAn;
    if (filter === 'correct') return isCorrect;
    if (filter === 'wrong') return !isCorrect;
    return true;
  });

  // Encouragement text
  const getFeedbackMessage = () => {
    if (correctCount >= 36) {
      return {
        badge: 'Xuất sắc tuyệt đối! 🌟',
        msg: 'Em nắm kiến thức cấu trúc Writing Band 4.5 - 5.0 rất vững vàng!',
        bgColor: 'from-amber-400 to-orange-500',
        textColor: 'text-amber-700',
      };
    } else if (correctCount >= 28) {
      return {
        badge: 'Rất tốt! 🎉',
        msg: 'Em đã hiểu phần lớn các quy tắc câu mở đoạn, thân bài và kết bài.',
        bgColor: 'from-emerald-400 to-teal-500',
        textColor: 'text-emerald-700',
      };
    } else {
      return {
        badge: 'Cố gắng lên nhé! 💪',
        msg: 'Hãy xem lại các câu chưa đúng bên dưới để ghi nhớ thêm cấu trúc nhé!',
        bgColor: 'from-sky-400 to-indigo-500',
        textColor: 'text-sky-700',
      };
    }
  };

  const feedback = getFeedbackMessage();

  return (
    <div id="result-container" className="w-full max-w-2xl mx-auto space-y-6">
      {/* Score Summary Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-sky-100 border border-slate-200/80 p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-4">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Kết quả bài làm của {studentName}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
            Em đúng <span className="text-sky-600 underline decoration-sky-300 decoration-wavy">{correctCount}/{totalQuestions} câu</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mb-6">
            {feedback.msg}
          </p>

          {/* Metric Badges */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-6">
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-600">{correctCount}</div>
              <div className="text-xs font-semibold text-emerald-800">Câu đúng</div>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-rose-600">{wrongCount}</div>
              <div className="text-xs font-semibold text-rose-800">Câu sai</div>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-sky-600">{percentage}%</div>
              <div className="text-xs font-semibold text-sky-800">Tỉ lệ đúng</div>
            </div>
          </div>

          {/* Restart Button */}
          <div className="flex justify-center">
            <button
              id="restart-quiz-btn"
              type="button"
              onClick={onRestart}
              className="py-3 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại từ đầu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Chi tiết đáp án từng câu</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Xem lại các câu hỏi kèm đáp án đúng để rút kinh nghiệm
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả ({totalQuestions})
            </button>
            <button
              type="button"
              onClick={() => setFilter('wrong')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filter === 'wrong'
                  ? 'bg-rose-500 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sai ({wrongCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('correct')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filter === 'correct'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Đúng ({correctCount})
            </button>
          </div>
        </div>

        {/* List of Questions */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const chosen = userAnswers[q.cau];
            const isCorrect = chosen === q.dapAn;

            return (
              <div
                key={q.cau}
                id={`review-question-${q.cau}`}
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                  isCorrect
                    ? 'border-emerald-200/90 bg-emerald-50/30'
                    : 'border-rose-200/90 bg-rose-50/30'
                }`}
              >
                {/* Status indicator & question number */}
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="shrink-0 mt-0.5">
                    {isCorrect ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-rose-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Câu {q.cau}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isCorrect ? 'Đúng' : 'Chưa đúng'}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                      {q.hoi}
                    </p>
                  </div>
                </div>

                {/* Answers Breakdown */}
                <div className="ml-9 space-y-1.5 mt-3 pt-3 border-t border-slate-200/60 text-xs sm:text-sm">
                  {/* What the student chose */}
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-slate-500 shrink-0">Đáp án em chọn:</span>
                    <span
                      className={`font-bold ${
                        isCorrect ? 'text-emerald-700' : 'text-rose-600'
                      }`}
                    >
                      {chosen ? `${chosen}. ${q[chosen]}` : '(Chưa chọn)'}
                    </span>
                  </div>

                  {/* Correct answer if wrong */}
                  {!isCorrect && (
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-emerald-700 shrink-0">Đáp án đúng:</span>
                      <span className="font-bold text-emerald-700">
                        {q.dapAn}. {q[q.dapAn]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Restart Button */}
        <div className="pt-6 mt-6 border-t border-slate-100 flex justify-center">
          <button
            type="button"
            onClick={onRestart}
            className="py-3 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white transition-all shadow-md shadow-sky-200 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm lại từ đầu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
