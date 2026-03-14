'use client';
import { useAppStore } from '@/lib/store';
import { DayPlan } from '@/lib/types';

export default function PrioritiesPanel({ plan, theme }: { plan: DayPlan; theme: string }) {
  const { updateBrainDump } = useAppStore();
  const isDark = theme === 'dark';

  const cardCls = isDark
    ? 'bg-[#18181B] border border-white/[0.07] rounded-2xl p-4 flex flex-col flex-1'
    : 'bg-white border border-black/[0.07] rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-4 flex flex-col flex-1';

  const labelCls = `text-[10px] font-semibold uppercase tracking-widest mb-3 block ${
    isDark ? 'text-[#3F3F46]' : 'text-[#C4BDB7]'
  }`;

  return (
    <div className={cardCls}>
      <label className={labelCls}>Brain Dump</label>
      <textarea
        value={plan.brainDump}
        onChange={(e) => updateBrainDump(e.target.value)}
        placeholder="모든 생각을 쏟아내세요..."
        className={`flex-1 w-full bg-transparent outline-none text-sm resize-none leading-relaxed min-h-[160px] ${
          isDark ? 'text-[#A1A1AA] placeholder-[#3F3F46]' : 'text-[#6B7280] placeholder-[#E5E7EB]'
        }`}
      />
    </div>
  );
}
