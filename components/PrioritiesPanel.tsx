'use client';
import { useAppStore } from '@/lib/store';
import { DayPlan } from '@/lib/types';

export default function PrioritiesPanel({ plan, theme }: { plan: DayPlan; theme: string }) {
  const { updatePriority, updateBrainDump } = useAppStore();
  const isNeu = theme === 'neumorphic';

  const inputCls = isNeu
    ? 'w-full px-3 py-2 rounded-lg bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff] outline-none text-sm text-gray-700 placeholder-gray-400 focus:shadow-[inset_4px_4px_8px_#b8bec7,inset_-4px_-4px_8px_#ffffff]'
    : 'w-full px-2 py-1.5 border-2 border-gray-800 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4ECDC4]';

  const labelCls = isNeu
    ? 'text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block'
    : 'text-xs font-bold text-gray-800 uppercase mb-1 block';

  const sectionCls = isNeu
    ? 'bg-[#e0e5ec] rounded-2xl shadow-[6px_6px_12px_#b8bec7,-6px_-6px_12px_#ffffff] p-4'
    : 'border-2 border-gray-800 bg-[#4ECDC4]/10 p-3';

  return (
    <div className="flex flex-col gap-4">
      {/* Top Priorities */}
      <div className={sectionCls}>
        <label className={labelCls}>Top Priorities</label>
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <input
              key={i}
              type="text"
              value={plan.priorities[i] || ''}
              onChange={(e) => updatePriority(i, e.target.value)}
              placeholder={`Priority ${i + 1}`}
              className={inputCls}
            />
          ))}
        </div>
      </div>

      {/* Brain Dump */}
      <div className={sectionCls}>
        <label className={labelCls}>Brain Dump</label>
        <textarea
          value={plan.brainDump}
          onChange={(e) => updateBrainDump(e.target.value)}
          placeholder="모든 생각을 쏟아내세요..."
          rows={8}
          className={`${inputCls} resize-none`}
        />
      </div>
    </div>
  );
}
