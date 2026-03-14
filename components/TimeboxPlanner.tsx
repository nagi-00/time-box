'use client';
import { useAppStore } from '@/lib/store';
import ThemeToggle from './ThemeToggle';
import StreakBar from './StreakBar';
import DateNav from './DateNav';
import PrioritiesPanel from './PrioritiesPanel';
import TodoList from './TodoList';
import TimeGrid from './TimeGrid';
import ProgressBar from './ProgressBar';
import ExportButton from './ExportButton';
import QuoteCard from './QuoteCard';
import { Trash2 } from 'lucide-react';

export default function TimeboxPlanner() {
  const { theme, getCurrentPlan, clearDay } = useAppStore();
  const plan = getCurrentPlan();
  const isDark = theme === 'dark';

  const bg = isDark ? 'bg-[#0F0F11] text-[#F4F4F5]' : 'bg-[#F5F4F0] text-[#1A1A1A]';
  const dividerCls = isDark ? 'border-white/[0.06]' : 'border-black/[0.06]';

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      <div id="timebox-capture" className="max-w-6xl mx-auto px-4 py-5">

        {/* ── Header ── */}
        <header className="flex items-center justify-between mb-5">
          {/* Left: brand + streak */}
          <div className="flex items-center gap-4">
            <h1 className={`text-base font-semibold tracking-tight ${isDark ? 'text-[#FAFAFA]' : 'text-[#111111]'}`}>
              time box
            </h1>
            <div className={`w-px h-3.5 ${isDark ? 'bg-white/[0.1]' : 'bg-black/[0.1]'}`} />
            <StreakBar theme={theme} />
          </div>

          {/* Right: date nav + actions + theme */}
          <div className="flex items-center gap-2">
            <DateNav theme={theme} />
            <div className={`w-px h-4 mx-1 ${isDark ? 'bg-white/[0.08]' : 'bg-black/[0.08]'}`} />
            <ExportButton plan={plan} theme={theme} />
            <button
              onClick={() => { if (confirm('오늘 계획을 초기화할까요?')) clearDay(); }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg transition-colors ${
                isDark
                  ? 'text-[#52525B] hover:text-red-400 hover:bg-red-400/10'
                  : 'text-[#A8A29E] hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <div className={`w-px h-4 mx-1 ${isDark ? 'bg-white/[0.08]' : 'bg-black/[0.08]'}`} />
            <ThemeToggle />
          </div>
        </header>

        {/* ── Quote ── */}
        <QuoteCard theme={theme} />

        {/* ── Progress ── */}
        <div className="mt-3 mb-4">
          <ProgressBar plan={plan} theme={theme} />
        </div>

        {/* ── Divider ── */}
        <div className={`border-t mb-5 ${dividerCls}`} />

        {/* ── Main 2-col grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 items-start">

          {/* Left column */}
          <div className="flex flex-col gap-4">
            {/* Brain Dump */}
            <PrioritiesPanel plan={plan} theme={theme} />

            {/* Todo List */}
            <TodoList theme={theme} />
          </div>

          {/* Right column: Time Grid */}
          <TimeGrid plan={plan} theme={theme} />
        </div>

        {/* ── Footer ── */}
        <div className={`mt-8 text-center text-[11px] ${isDark ? 'text-[#27272A]' : 'text-[#E7E5E4]'}`}>
          모든 데이터는 브라우저에 저장됩니다
        </div>
      </div>
    </div>
  );
}
