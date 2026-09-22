import React from 'react';
import { GraduationCap, ArrowRight, UserCheck, BookOpen, Sparkles } from 'lucide-react';
import { StudentOption } from '../types';

interface NameSelectionProps {
  selectedName: StudentOption | '';
  onSelectName: (name: StudentOption) => void;
  onStart: () => void;
}

export const NameSelection: React.FC<NameSelectionProps> = ({
  selectedName,
  onSelectName,
  onStart,
}) => {
  const students: StudentOption[] = ['Hải Phương', 'Khánh Ngọc'];

  return (
    <div id="name-selection-container" className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-sky-100/70 border border-sky-100 p-6 sm:p-8 transition-all">
        {/* Header illustration badge */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-200">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mb-3 border border-sky-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>IELTS Writing • Band 4.5 – 5.0</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Luyện tập Trắc nghiệm Writing
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Chào mừng em đến với bài luyện tập 40 câu trắc nghiệm cấu trúc và từ vựng IELTS Writing!
          </p>
        </div>

        {/* Name Selection Form */}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="student-select"
              className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-sky-600" />
              Chọn tên của em
            </label>
            <div className="relative">
              <select
                id="student-select"
                value={selectedName}
                onChange={(e) => onSelectName(e.target.value as StudentOption)}
                className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 border-2 border-slate-200 focus:border-sky-500 focus:bg-white text-slate-800 text-base rounded-2xl py-3.5 px-4 pr-10 outline-none transition-all cursor-pointer font-medium"
              >
                <option value="" disabled>
                  -- Nhấn vào đây để chọn tên --
                </option>
                {students.map((student) => (
                  <option key={student} value={student} className="text-slate-800 font-medium py-2">
                    {student}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            {!selectedName && (
              <p className="text-xs text-amber-600 mt-2 font-medium">
                * Em cần chọn tên trước khi bắt đầu làm bài nhé!
              </p>
            )}
          </div>

          {/* Info cards */}
          <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-4 text-xs sm:text-sm text-sky-900 space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <BookOpen className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Thông tin bài kiểm tra:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Tổng số câu hỏi: <strong className="text-slate-800">40 câu</strong> trắc nghiệm</li>
              <li>Chủ đề: <strong className="text-slate-800">Introduction, Body Paragraphs, Conclusion & Opinion</strong></li>
              <li>Kết quả sẽ được tự động chấm điểm và lưu lại ngay sau khi hoàn thành.</li>
            </ul>
          </div>

          {/* Start button */}
          <button
            id="start-quiz-btn"
            type="button"
            disabled={!selectedName}
            onClick={onStart}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md ${
              selectedName
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-700 shadow-sky-200 hover:shadow-lg hover:shadow-sky-300 active:scale-[0.99] cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>Bắt đầu làm bài</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
