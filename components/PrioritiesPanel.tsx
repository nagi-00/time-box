'use client';
import { useAppStore } from '@/lib/store';
import { DayPlan } from '@/lib/types';

export default function PrioritiesPanel({ plan, theme }: { plan: DayPlan; theme: string }) {
  const { updatePriority, updateBrainDump } = useAppStore();
  const isDark = theme === 'dark';

  const cardCls = isDark
    ? 'bg-[#18181B] border border-white/[0.07] rounded-2xl p-4'
    : 'bg-white border border-black/[0.07] rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-4';

  const labelCls = `text-[10px] font-semibold uppercase tracking-widest mb-3 block ${
    isDark ? 'text-[#3F3F46]' : 'text-[#C4BDB7]'
  }`;

  const inputCls = `w-full bg-transparent outline-none text-sm pb-2 transition-colors border-b ${
    isDark
      ? 'text-[#E4E4E7] placeholder-[#3F3F46] border-white/[0.07] focus:border-indigo-500'
      : 'text-[#374151] placeholder-[#E5E7EB] border-black/[0.07] focus:border-indigo-400'
  }`;

  const badgeCls = `w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
    isDark ? 'bg-indigo-500/15 text-indigo-400' : 'bg-indigo-50 text-indigo-500'
  }`;

  return (
    <div className="flex flex-col gap-4">
      {/* Top Priorities */}
      <div className={cardCls}>
        <label className={labelCls}>Priorities</label>
        <div className="flex flex-col gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className={badgeCls}>{i + 1}</span>
              <input
                type="text"
                value={plan.priorities[i] || ''}
                onChange={(e) => updatePriority(i, e.target.value)}
                placeholder={`우선순위 ${i + 1}`}
                className={inputCls}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Brain Dump */}
      <div className={cardCls}>
        <label className={labelCls}>Brain Dump</label>
        <textarea
          value={plan.brainDump}
          onChange={(e) => updateBrainDump(e.target.value)}
          placeholder="모든 생각을 쏟아내세요..."
          rows={10}
          className={`w-full bg-transparent outline-none text-sm resize-none leading-relaxed ${
            isDark ? 'text-[#A1A1AA] placeholder-[#3F3F46]' : 'text-[#6B7280] placeholder-[#E5E7EB]'
          }`}
        />
      </div>
    </div>
  );
}
