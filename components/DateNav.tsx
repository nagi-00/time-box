'use client';
import { useAppStore } from '@/lib/store';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, subDays, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function DateNav({ theme }: { theme: string }) {
  const { selectedDate, setSelectedDate } = useAppStore();
  const isDark = theme === 'dark';

  const d = parseISO(selectedDate);
  const isToday = selectedDate === new Date().toISOString().split('T')[0];

  const btnCls = `p-1.5 rounded-lg transition-colors ${
    isDark
      ? 'text-[#52525B] hover:text-[#FAFAFA] hover:bg-white/[0.07]'
      : 'text-[#A8A29E] hover:text-[#111111] hover:bg-black/[0.05]'
  }`;

  return (
    <div className="flex items-center gap-2">
      <button className={btnCls} onClick={() => setSelectedDate(subDays(d, 1).toISOString().split('T')[0])}>
        <ChevronLeft className="w-4 h-4" />
      </button>
      <div className="text-center min-w-[130px]">
        <div className={`font-medium text-sm ${isDark ? 'text-[#FAFAFA]' : 'text-[#111111]'}`}>
          {format(d, 'M월 d일 (EEE)', { locale: ko })}
        </div>
        {isToday && (
          <div className={`text-xs font-medium ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`}>오늘</div>
        )}
      </div>
      <button className={btnCls} onClick={() => setSelectedDate(addDays(d, 1).toISOString().split('T')[0])}>
        <ChevronRight className="w-4 h-4" />
      </button>
      {!isToday && (
        <button
          onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
          className={`text-xs px-2 py-1 rounded-md transition-colors ${
            isDark
              ? 'text-indigo-400 hover:bg-indigo-400/10'
              : 'text-indigo-500 hover:bg-indigo-50'
          }`}
        >
          오늘로
        </button>
      )}
    </div>
  );
}
