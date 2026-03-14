'use client';
import { useAppStore } from '@/lib/store';
import { Flame, Trophy, Calendar } from 'lucide-react';

export default function StreakBar({ theme }: { theme: string }) {
  const streak = useAppStore((s) => s.streak);
  const isDark = theme === 'dark';

  const sep = <span className={`text-xs ${isDark ? 'text-[#27272A]' : 'text-[#E7E5E4]'}`}>·</span>;

  const statCls = `flex items-center gap-1 text-xs ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}`;
  const numCls = `font-semibold tabular-nums ${isDark ? 'text-[#71717A]' : 'text-[#78716C]'}`;

  return (
    <div className="flex items-center gap-2.5">
      <div className={statCls}>
        <Flame className="w-3 h-3 text-orange-400" />
        <span className={numCls}>{streak.currentStreak}</span>
        <span>연속</span>
      </div>
      {sep}
      <div className={statCls}>
        <Trophy className="w-3 h-3 text-yellow-400" />
        <span className={numCls}>{streak.longestStreak}</span>
        <span>최장</span>
      </div>
      {sep}
      <div className={statCls}>
        <Calendar className="w-3 h-3 text-indigo-400" />
        <span className={numCls}>{streak.totalDays}</span>
        <span>일</span>
      </div>
    </div>
  );
}
