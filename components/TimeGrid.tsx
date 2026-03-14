'use client';
import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { DayPlan, TimeSlot, TASK_COLORS } from '@/lib/types';
import { Check, RotateCcw } from 'lucide-react';

function ColorPicker({
  onSelect,
  isDark,
}: {
  onSelect: (c: string) => void;
  onClose: () => void;
  isDark: boolean;
}) {
  return (
    <div
      className={`absolute z-50 top-full left-0 mt-1.5 rounded-xl shadow-2xl p-2.5 flex gap-1.5 flex-wrap w-44 ${
        isDark
          ? 'bg-[#27272A] border border-white/[0.08]'
          : 'bg-white border border-black/[0.08]'
      }`}
    >
      <button
        onClick={() => onSelect('')}
        className={`w-5 h-5 rounded-md text-xs flex items-center justify-center transition-colors ${
          isDark
            ? 'border border-white/10 text-[#52525B] hover:text-[#A1A1AA] hover:bg-white/[0.07]'
            : 'border border-black/10 text-gray-300 hover:text-gray-500 hover:bg-gray-50'
        }`}
      >
        ✕
      </button>
      {TASK_COLORS.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className="w-5 h-5 rounded-full hover:scale-110 transition-transform shadow-sm"
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  );
}

function formatTimeLabel(hour: number): string {
  if (hour < 12) return `${hour}AM`;
  if (hour === 12) return '12PM';
  return `${hour - 12}PM`;
}

export default function TimeGrid({ plan, theme }: { plan: DayPlan; theme: string }) {
  const { updateTimeSlot, toggleSlotComplete, setSlotColor } = useAppStore();
  const isDark = theme === 'dark';
  const [colorPickerSlot, setColorPickerSlot] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());
  const gridRef = useRef<HTMLDivElement>(null);
  const currentRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to current time on first render
  useEffect(() => {
    currentRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const currentHour = now.getHours();
  const currentMin = now.getMinutes();

  const slotMap = new Map<string, TimeSlot>();
  plan.timeSlots.forEach((s) => slotMap.set(`${s.hour}-${s.half}`, s));

  const cardCls = isDark
    ? 'bg-[#18181B] border border-white/[0.07] rounded-2xl p-4'
    : 'bg-white border border-black/[0.07] rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-4';

  const getSlotCls = (slot: TimeSlot | undefined) => {
    const base =
      'flex-1 flex items-center gap-2 px-2.5 py-1.5 rounded-lg group transition-colors relative min-w-0';
    if (slot?.completed) {
      return `${base} ${isDark ? 'opacity-35' : 'opacity-40'}`;
    }
    return `${base} ${isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-black/[0.025]'}`;
  };

  const inputCls = `flex-1 bg-transparent outline-none text-sm min-w-0 ${
    isDark ? 'text-[#E4E4E7] placeholder-[#3F3F46]' : 'text-[#374151] placeholder-[#E5E7EB]'
  }`;

  const actionBtnCls = `w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shrink-0 ${
    isDark
      ? 'border border-white/[0.1] text-[#3F3F46] hover:text-[#4ADE80] hover:border-[#4ADE80]/50 hover:bg-[#4ADE80]/10'
      : 'border border-black/[0.1] text-[#D6D3D1] hover:text-green-500 hover:border-green-300 hover:bg-green-50'
  }`;

  const colorDotCls = `w-2.5 h-2.5 rounded-full border opacity-0 group-hover:opacity-100 transition-all shrink-0 ${
    isDark ? 'border-white/[0.15]' : 'border-black/[0.12]'
  }`;

  const dividerCls = `w-px h-3.5 shrink-0 ${isDark ? 'bg-white/[0.05]' : 'bg-black/[0.05]'}`;

  return (
    <div ref={gridRef} className={cardCls} onClick={() => setColorPickerSlot(null)}>
      {/* Column header */}
      <div className={`flex items-center gap-1 pb-2 mb-1 border-b ${isDark ? 'border-white/[0.05]' : 'border-black/[0.05]'}`}>
        <div className="w-12" />
        <div className={`flex-1 text-center text-[10px] font-medium ${isDark ? 'text-[#3F3F46]' : 'text-[#D6D3D1]'}`}>
          :00
        </div>
        <div className="w-px" />
        <div className={`flex-1 text-center text-[10px] font-medium ${isDark ? 'text-[#3F3F46]' : 'text-[#D6D3D1]'}`}>
          :30
        </div>
      </div>

      <div className="flex flex-col gap-px">
        {Array.from({ length: 19 }, (_, i) => i + 5).map((h) => {
          const s0 = slotMap.get(`${h}-0`);
          const s30 = slotMap.get(`${h}-30`);
          const key0 = `${h}-0`;
          const key30 = `${h}-30`;
          const isCurrentHour = h === currentHour;
          const isInRange = h >= 5 && h <= 23;

          // Current time indicator: show red line above this row
          const showTimeLine = isCurrentHour && isInRange && currentMin < 30;
          const showTimeLineMid = isCurrentHour && isInRange && currentMin >= 30;

          return (
            <div key={h}>
              {/* Current time line (before :00) */}
              {showTimeLine && (
                <div className="relative flex items-center gap-1 -mx-1 mb-px">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 ml-1" />
                  <div className="flex-1 h-px bg-red-500 opacity-60" />
                </div>
              )}

              <div
                ref={isCurrentHour ? currentRowRef : undefined}
                className="flex items-center gap-1"
              >
                {/* Time label */}
                <div
                  className={`w-12 text-right shrink-0 font-mono text-[10px] font-medium ${
                    isCurrentHour
                      ? isDark ? 'text-red-400' : 'text-red-400'
                      : isDark ? 'text-[#3F3F46]' : 'text-[#D6D3D1]'
                  }`}
                >
                  {formatTimeLabel(h)}
                </div>

                {/* :00 slot */}
                <div
                  className={getSlotCls(s0)}
                  style={
                    s0?.color
                      ? { borderLeft: `2px solid ${s0.color}`, paddingLeft: '8px' }
                      : { borderLeft: '2px solid transparent', paddingLeft: '8px' }
                  }
                >
                  <input
                    type="text"
                    value={s0?.task || ''}
                    onChange={(e) => updateTimeSlot(h, 0, e.target.value)}
                    placeholder=""
                    className={`${inputCls} ${s0?.completed ? 'line-through' : ''}`}
                    style={s0?.color ? { color: s0.color } : {}}
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSlotComplete(h, 0); }}
                      className={actionBtnCls}
                    >
                      {s0?.completed ? <RotateCcw className="w-2 h-2" /> : <Check className="w-2 h-2" />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setColorPickerSlot(colorPickerSlot === key0 ? null : key0); }}
                      className={colorDotCls}
                      style={{ backgroundColor: s0?.color || (isDark ? '#27272A' : '#F3F4F6') }}
                    />
                    {colorPickerSlot === key0 && (
                      <ColorPicker
                        isDark={isDark}
                        onSelect={(c) => { setSlotColor(h, 0, c); setColorPickerSlot(null); }}
                        onClose={() => setColorPickerSlot(null)}
                      />
                    )}
                  </div>
                </div>

                {/* Mid-hour time line (between :00 and :30) */}
                {showTimeLineMid && (
                  <div className="flex items-center gap-0.5">
                    <div className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
                  </div>
                )}
                {!showTimeLineMid && <div className={dividerCls} />}

                {/* :30 slot */}
                <div
                  className={getSlotCls(s30)}
                  style={
                    s30?.color
                      ? { borderLeft: `2px solid ${s30.color}`, paddingLeft: '8px' }
                      : { borderLeft: '2px solid transparent', paddingLeft: '8px' }
                  }
                >
                  <input
                    type="text"
                    value={s30?.task || ''}
                    onChange={(e) => updateTimeSlot(h, 30, e.target.value)}
                    placeholder=""
                    className={`${inputCls} ${s30?.completed ? 'line-through' : ''}`}
                    style={s30?.color ? { color: s30.color } : {}}
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSlotComplete(h, 30); }}
                      className={actionBtnCls}
                    >
                      {s30?.completed ? <RotateCcw className="w-2 h-2" /> : <Check className="w-2 h-2" />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setColorPickerSlot(colorPickerSlot === key30 ? null : key30); }}
                      className={colorDotCls}
                      style={{ backgroundColor: s30?.color || (isDark ? '#27272A' : '#F3F4F6') }}
                    />
                    {colorPickerSlot === key30 && (
                      <ColorPicker
                        isDark={isDark}
                        onSelect={(c) => { setSlotColor(h, 30, c); setColorPickerSlot(null); }}
                        onClose={() => setColorPickerSlot(null)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
