'use client';
import { DayPlan } from '@/lib/types';

export default function ProgressBar({ plan, theme }: { plan: DayPlan; theme: string }) {
  const filled = plan.timeSlots.filter((s) => s.task.trim()).length;
  const completed = plan.timeSlots.filter((s) => s.completed).length;
  const total = plan.timeSlots.length;
  const filledPct = Math.round((filled / total) * 100);
  const completedPct = filled > 0 ? Math.round((completed / filled) * 100) : 0;
  const isDark = theme === 'dark';

  const accent = isDark ? '#818CF8' : '#6366F1';
  const success = isDark ? '#4ADE80' : '#16A34A';

  return (
    <div className={`px-4 py-3 rounded-xl flex items-center gap-4 ${
      isDark
        ? 'bg-[#18181B] border border-white/[0.07]'
        : 'bg-white border border-black/[0.07] shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
    }`}>
      <div className="flex-1">
        <div className={`h-1 rounded-full overflow-hidden ${isDark ? 'bg-[#27272A]' : 'bg-[#F3F4F6]'}`}>
          <div
            className="h-full rounded-full transition-all duration-500 relative"
            style={{ width: `${filledPct}%`, backgroundColor: accent }}
          >
            <div
              className="h-full rounded-full absolute top-0 left-0 transition-all duration-500"
              style={{ width: `${completedPct}%`, backgroundColor: success }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs shrink-0">
        <span className={isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}>
          계획{' '}
          <span className="font-semibold tabular-nums" style={{ color: accent }}>{filledPct}%</span>
        </span>
        <span className={isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}>
          완료{' '}
          <span className="font-semibold tabular-nums" style={{ color: success }}>{completedPct}%</span>
          <span className={`ml-1 ${isDark ? 'text-[#3F3F46]' : 'text-[#D1D5DB]'}`}>({completed}/{filled})</span>
        </span>
      </div>
    </div>
  );
}
