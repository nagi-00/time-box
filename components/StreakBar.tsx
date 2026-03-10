'use client';
import { useAppStore } from '@/lib/store';
import { Flame, Trophy, Calendar } from 'lucide-react';

export default function StreakBar({ theme }: { theme: string }) {
  const streak = useAppStore((s) => s.streak);
  const isDark = theme === 'dark';

  const cardCls = isDark
    ? 'flex items-center gap-3 px-4 py-3 bg-[#18181B] border border-white/[0.07] rounded-xl'
    : 'flex items-center gap-3 px-4 py-3 bg-white border border-black/[0.07] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04)]';

  const stats = [
    { icon: Flame, label: '연속일', value: streak.currentStreak, iconCls: 'text-orange-400' },
    { icon: Trophy, label: '최장 기록', value: streak.longestStreak, iconCls: 'text-yellow-400' },
    { icon: Calendar, label: '총 계획일', value: streak.totalDays, iconCls: isDark ? 'text-indigo-400' : 'text-indigo-500' },
  ];

  return (
    <div className="flex gap-3 flex-wrap">
      {stats.map(({ icon: Icon, label, value, iconCls }) => (
        <div key={label} className={cardCls}>
          <Icon className={`w-4 h-4 shrink-0 ${iconCls}`} />
          <div>
            <div className={`text-xl font-semibold tabular-nums leading-none ${isDark ? 'text-[#FAFAFA]' : 'text-[#111111]'}`}>
              {value}
            </div>
            <div className={`text-xs mt-0.5 ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}`}>{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
