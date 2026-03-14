'use client';
import { useState } from 'react';
import { Download, ImageDown, Loader2 } from 'lucide-react';
import { DayPlan, formatHour } from '@/lib/types';

export default function ExportButton({ plan, theme }: { plan: DayPlan; theme: string }) {
  const isDark = theme === 'dark';
  const [capturing, setCapturing] = useState(false);

  /* ── 텍스트 내보내기 ── */
  const handleTextExport = () => {
    const lines: string[] = [
      `Daily Timeboxing Planner — ${plan.date}`,
      '='.repeat(40),
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
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timebox-${plan.date}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ── PNG 내보내기 ── */
  const handleImageExport = async () => {
    const el = document.getElementById('timebox-capture');
    if (!el) return;
    setCapturing(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(el, {
        backgroundColor: isDark ? '#0F0F11' : '#F5F4F0',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `timebox-${plan.date}.png`;
      a.click();
    } finally {
      setCapturing(false);
    }
  };

  const btnCls = `flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors font-medium ${
    isDark
      ? 'text-[#71717A] hover:text-[#FAFAFA] hover:bg-white/[0.07] border border-white/[0.07]'
      : 'text-[#6B7280] hover:text-[#111111] hover:bg-black/[0.05] border border-black/[0.07]'
  }`;

  return (
    <div className="flex items-center gap-1.5">
      <button onClick={handleTextExport} className={btnCls} title="텍스트로 내보내기">
        <Download className="w-3.5 h-3.5" />
      </button>
      <button onClick={handleImageExport} disabled={capturing} className={btnCls} title="이미지로 내보내기">
        {capturing
          ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
          : <ImageDown className="w-3.5 h-3.5" />
        }
      </button>
    </div>
  );
}
