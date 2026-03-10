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
  const isNeu = theme === 'neumorphic';

  const bgCls = isNeu
    ? 'min-h-screen bg-[#e0e5ec]'
    : 'min-h-screen bg-[#4ECDC4]';

  const containerCls = isNeu
    ? 'max-w-5xl mx-auto p-4 md:p-6'
    : 'max-w-5xl mx-auto p-4 md:p-6';

  const cardCls = isNeu
    ? 'bg-[#e0e5ec] rounded-2xl shadow-[8px_8px_16px_#b8bec7,-8px_-8px_16px_#ffffff] p-5'
    : 'bg-[#f5f5f0] border-4 border-gray-800 shadow-[6px_6px_0px_#1a1a1a] p-4';

  const titleCls = isNeu
    ? 'text-2xl font-black text-gray-700'
    : 'text-2xl font-black text-gray-900';

  const clearBtnCls = isNeu
    ? 'flex items-center gap-1 px-2 py-1.5 text-xs text-gray-400 hover:text-red-400 rounded-lg bg-[#e0e5ec] shadow-[2px_2px_4px_#b8bec7,-2px_-2px_4px_#ffffff]'
    : 'flex items-center gap-1 px-2 py-1.5 text-xs text-gray-500 hover:text-red-500 border border-gray-400';

  return (
    <div className={bgCls}>
      <div className={containerCls}>
        {/* Header */}
        <div className={`${cardCls} mb-4`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className={titleCls}>Daily Timeboxing</h1>
              <p className={`text-sm ${isNeu ? 'text-gray-400' : 'text-gray-600'}`}>
                Elon Musk 방식 타임박스 플래너
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Streak */}
        <div className="mb-4">
          <StreakBar theme={theme} />
        </div>

        {/* Date Nav + Progress */}
        <div className={`${cardCls} mb-4 flex flex-wrap items-center justify-between gap-3`}>
          <DateNav theme={theme} />
          <div className="flex items-center gap-2">
            <ExportButton plan={plan} theme={theme} />
            <button
              onClick={() => { if (confirm('오늘 계획을 초기화할까요?')) clearDay(); }}
              className={clearBtnCls}
            >
              <Trash2 className="w-3 h-3" />
              초기화
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <ProgressBar plan={plan} theme={theme} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4">
          <PrioritiesPanel plan={plan} theme={theme} />
          <TimeGrid plan={plan} theme={theme} />
        </div>

        {/* Footer */}
        <div className={`mt-6 text-center text-xs ${isNeu ? 'text-gray-400' : 'text-gray-700'}`}>
          모든 데이터는 브라우저에 저장됩니다 · Daily Timeboxing Planner
        </div>
      </div>
    </div>
  );
}
