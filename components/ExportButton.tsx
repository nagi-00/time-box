'use client';
import { Download } from 'lucide-react';
import { DayPlan, formatHour } from '@/lib/types';

export default function ExportButton({ plan, theme }: { plan: DayPlan; theme: string }) {
  const isNeu = theme === 'neumorphic';

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

  const btnCls = isNeu
    ? 'flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[#e0e5ec] rounded-lg shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_4px_#b8bec7,inset_-2px_-2px_4px_#ffffff] text-gray-600 hover:text-gray-800'
    : 'flex items-center gap-1.5 px-3 py-1.5 text-sm border-2 border-gray-800 bg-white hover:bg-gray-100 text-gray-800 font-medium';

  return (
    <button onClick={handleExport} className={btnCls}>
      <Download className="w-4 h-4" />
      내보내기
    </button>
  );
}
