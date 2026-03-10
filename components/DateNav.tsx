'use client';
import { useAppStore } from '@/lib/store';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, subDays, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function DateNav({ theme }: { theme: string }) {
  const { selectedDate, setSelectedDate } = useAppStore();
  const isNeu = theme === 'neumorphic';

  const btnCls = isNeu
    ? 'p-1.5 rounded-lg bg-[#e0e5ec] shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_4px_#b8bec7,inset_-2px_-2px_4px_#ffffff]'
    : 'p-1.5 rounded border border-gray-300 hover:bg-gray-100 active:bg-gray-200';

  const d = parseISO(selectedDate);
  const isToday = selectedDate === new Date().toISOString().split('T')[0];

  return (
    <div className="flex items-center gap-3">
      <button className={btnCls} onClick={() => setSelectedDate(subDays(d, 1).toISOString().split('T')[0])}>
        <ChevronLeft className="w-4 h-4" />
      </button>
      <div className="text-center">
        <div className={`font-bold text-base ${isNeu ? 'text-gray-700' : 'text-gray-800'}`}>
          {format(d, 'M월 d일 (EEE)', { locale: ko })}
        </div>
        {isToday && <div className="text-xs text-[#4ECDC4] font-medium">오늘</div>}
      </div>
      <button className={btnCls} onClick={() => setSelectedDate(addDays(d, 1).toISOString().split('T')[0])}>
        <ChevronRight className="w-4 h-4" />
      </button>
      {!isToday && (
        <button
          onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
          className="text-xs text-[#4ECDC4] underline ml-1"
        >
          오늘로
        </button>
      )}
    </div>
  );
}
