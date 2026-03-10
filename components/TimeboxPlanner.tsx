'use client';
import { useAppStore } from '@/lib/store';
import ThemeToggle from './ThemeToggle';
import StreakBar from './StreakBar';
import DateNav from './DateNav';
import PrioritiesPanel from './PrioritiesPanel';
import TimeGrid from './TimeGrid';
import ProgressBar from './ProgressBar';
import ExportButton from './ExportButton';
import { Trash2 } from 'lucide-react';

export default function TimeboxPlanner() {
  const { theme, getCurrentPlan, clearDay } = useAppStore();
  const plan = getCurrentPlan();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-[#0F0F11] text-[#F4F4F5]' : 'bg-[#F5F4F0] text-[#1A1A1A]'
    }`}>
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className={`text-xl font-semibold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#111111]'}`}>
              Daily Planner
            </h1>
            <p className={`text-sm mt-0.5 ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}`}>
              Timebox your day, own your time
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Streak stats */}
        <div className="mb-5">
          <StreakBar theme={theme} />
        </div>

        {/* Date + Actions bar */}
        <div className={`flex flex-wrap items-center justify-between gap-3 mb-4 px-4 py-2.5 rounded-xl ${
          isDark
            ? 'bg-[#18181B] border border-white/[0.07]'
            : 'bg-white border border-black/[0.07] shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
        }`}>
          <DateNav theme={theme} />
          <div className="flex items-center gap-1.5">
            <ExportButton plan={plan} theme={theme} />
            <button
              onClick={() => { if (confirm('오늘 계획을 초기화할까요?')) clearDay(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors ${
                isDark
                  ? 'text-[#52525B] hover:text-red-400 hover:bg-red-400/10'
                  : 'text-[#A8A29E] hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              초기화
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <ProgressBar plan={plan} theme={theme} />
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 md:grid-cols-[256px_1fr] gap-4">
          <PrioritiesPanel plan={plan} theme={theme} />
          <TimeGrid plan={plan} theme={theme} />
        </div>

        {/* Footer */}
        <div className={`mt-8 text-center text-xs ${isDark ? 'text-[#3F3F46]' : 'text-[#D6D3D1]'}`}>
          모든 데이터는 브라우저에 저장됩니다
        </div>
      </div>
    </div>
  );
}
