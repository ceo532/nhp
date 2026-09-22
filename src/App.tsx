/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NameSelection } from './components/NameSelection';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { QUESTIONS } from './data/questions';
import { StudentOption } from './types';
import { GraduationCap, BookOpenCheck } from 'lucide-react';

type Step = 'name' | 'quiz' | 'result';

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('name');
  const [selectedName, setSelectedName] = useState<StudentOption | ''>('');
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});

  const handleStart = () => {
    if (selectedName) {
      setCurrentStep('quiz');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectAnswer = (questionNum: number, answer: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionNum]: answer,
    }));
  };

  const handleSubmit = () => {
    setCurrentStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setUserAnswers({});
    setSelectedName('');
    setCurrentStep('name');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased selection:bg-sky-200 selection:text-sky-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 sm:py-3.5 transition-all">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-sky-200">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-slate-800 tracking-tight text-sm sm:text-base">
                IELTS Writing Band 4.5 – 5.0
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-sky-600 font-bold bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                Luyện tập trắc nghiệm
              </span>
            </div>
          </div>

          {selectedName && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-slate-500 hidden sm:inline">Học sinh:</span>
              <span className="text-slate-800 font-bold">{selectedName}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col justify-center">
        {currentStep === 'name' && (
          <NameSelection
            selectedName={selectedName}
            onSelectName={(name) => setSelectedName(name)}
            onStart={handleStart}
          />
        )}

        {currentStep === 'quiz' && selectedName && (
          <QuizScreen
            studentName={selectedName}
            questions={QUESTIONS}
            userAnswers={userAnswers}
            onSelectAnswer={handleSelectAnswer}
            onSubmit={handleSubmit}
          />
        )}

        {currentStep === 'result' && selectedName && (
          <ResultScreen
            studentName={selectedName}
            questions={QUESTIONS}
            userAnswers={userAnswers}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-200/60 bg-white/50">
        <p>IELTS Writing Practice • Band 4.5 – 5.0 • Chúc các em học tập thật tốt!</p>
      </footer>
    </div>
  );
}
