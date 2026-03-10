'use client';
import { DayPlan } from '@/lib/types';

export default function ProgressBar({ plan, theme }: { plan: DayPlan; theme: string }) {
  const filled = plan.timeSlots.filter((s) => s.task.trim()).length;
  const completed = plan.timeSlots.filter((s) => s.completed).length;
  const total = plan.timeSlots.length;
  const filledPct = Math.round((filled / total) * 100);
  const completedPct = filled > 0 ? Math.round((completed / filled) * 100) : 0;
  const isNeu = theme === 'neumorphic';

  return (
    <div className={isNeu
      ? 'bg-[#e0e5ec] rounded-xl shadow-[4px_4px_8px_#b8bec7,-4px_-4px_8px_#ffffff] p-3'
      : 'border-2 border-gray-800 bg-white p-2'
    }>
      <div className="flex justify-between text-xs mb-1">
        <span className={isNeu ? 'text-gray-500' : 'text-gray-600'}>
          계획률 <span className="font-bold text-[#4ECDC4]">{filledPct}%</span>
        </span>
        <span className={isNeu ? 'text-gray-500' : 'text-gray-600'}>
          완료 <span className="font-bold text-green-500">{completedPct}%</span>
          {' '}({completed}/{filled})
        </span>
      </div>
      <div className={isNeu
        ? 'h-3 rounded-full bg-[#d1d9e6] shadow-[inset_2px_2px_4px_#b8bec7,inset_-2px_-2px_4px_#ffffff] overflow-hidden'
        : 'h-3 border border-gray-800 bg-gray-100 overflow-hidden'
      }>
        <div
          className="h-full bg-[#4ECDC4] transition-all duration-500 relative"
          style={{ width: `${filledPct}%` }}
        >
          <div
            className="h-full bg-green-400 absolute top-0 left-0 transition-all duration-500"
            style={{ width: `${completedPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
