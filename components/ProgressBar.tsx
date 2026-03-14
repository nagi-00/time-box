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
    <div className="flex items-center gap-3">
      <div className={`flex-1 h-0.5 rounded-full overflow-hidden ${isDark ? 'bg-[#27272A]' : 'bg-[#F3F4F6]'}`}>
        <div
          className="h-full rounded-full transition-all duration-700 relative"
          style={{ width: `${filledPct}%`, backgroundColor: accent }}
        >
          <div
            className="h-full rounded-full absolute top-0 left-0 transition-all duration-700"
            style={{ width: `${completedPct}%`, backgroundColor: success }}
          />
        </div>
      </div>
      <div className={`flex items-center gap-3 text-[10px] shrink-0 ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}`}>
        <span>
          계획 <span className="font-semibold tabular-nums" style={{ color: accent }}>{filledPct}%</span>
        </span>
        <span>
          완료 <span className="font-semibold tabular-nums" style={{ color: success }}>{completedPct}%</span>
          <span className={`ml-1 ${isDark ? 'text-[#3F3F46]' : 'text-[#D6D3D1]'}`}>({completed}/{filled})</span>
        </span>
      </div>
    </div>
  );
}
