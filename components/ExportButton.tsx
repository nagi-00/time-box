'use client';
import { Download } from 'lucide-react';
import { DayPlan, formatHour } from '@/lib/types';

export default function ExportButton({ plan, theme }: { plan: DayPlan; theme: string }) {
  const isDark = theme === 'dark';

  const handleExport = () => {
    const lines: string[] = [
      `Daily Timeboxing Planner - ${plan.date}`,
      '='.repeat(40),
      '',
      'TOP PRIORITIES',
      ...plan.priorities.filter(Boolean).map((p, i) => `  ${i + 1}. ${p}`),
      '',
      'BRAIN DUMP',
      plan.brainDump ? `  ${plan.brainDump}` : '  (없음)',
      '',
      'SCHEDULE',
      '-'.repeat(40),
    ];

    plan.timeSlots.forEach((s) => {
      if (s.task) {
        const mark = s.completed ? '[✓]' : '[ ]';
        const time = `${formatHour(s.hour)}:${s.half === 0 ? '00' : '30'}`;
        lines.push(`  ${mark} ${time.padEnd(6)} ${s.task}`);
      }
    });

    const text = lines.join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timebox-${plan.date}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors font-medium ${
        isDark
          ? 'text-[#71717A] hover:text-[#FAFAFA] hover:bg-white/[0.07] border border-white/[0.07]'
          : 'text-[#6B7280] hover:text-[#111111] hover:bg-black/[0.05] border border-black/[0.07]'
      }`}
    >
      <Download className="w-3.5 h-3.5" />
      내보내기
    </button>
  );
}
