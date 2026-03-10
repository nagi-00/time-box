'use client';
import { useAppStore } from '@/lib/store';
import { Flame, Trophy, Calendar } from 'lucide-react';

export default function StreakBar({ theme }: { theme: string }) {
  const streak = useAppStore((s) => s.streak);
  const isNeu = theme === 'neumorphic';

  const cardCls = isNeu
    ? 'bg-[#e0e5ec] rounded-xl shadow-[4px_4px_8px_#b8bec7,-4px_-4px_8px_#ffffff] p-3 flex items-center gap-2'
    : 'bg-[#4ECDC4]/20 border border-[#4ECDC4] rounded p-2 flex items-center gap-2';

  return (
    <div className="flex gap-3 flex-wrap">
      <div className={cardCls}>
        <Flame className="w-4 h-4 text-orange-500" />
        <div>
          <div className={`text-lg font-bold ${isNeu ? 'text-gray-700' : 'text-gray-800'}`}>
            {streak.currentStreak}
          </div>
          <div className="text-xs text-gray-500">연속 일수</div>
        </div>
      </div>
      <div className={cardCls}>
        <Trophy className="w-4 h-4 text-yellow-500" />
        <div>
          <div className={`text-lg font-bold ${isNeu ? 'text-gray-700' : 'text-gray-800'}`}>
            {streak.longestStreak}
          </div>
          <div className="text-xs text-gray-500">최장 기록</div>
        </div>
      </div>
      <div className={cardCls}>
        <Calendar className="w-4 h-4 text-blue-500" />
        <div>
          <div className={`text-lg font-bold ${isNeu ? 'text-gray-700' : 'text-gray-800'}`}>
            {streak.totalDays}
          </div>
          <div className="text-xs text-gray-500">총 계획일</div>
        </div>
      </div>
    </div>
  );
}
