'use client';
import { useState, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { DayPlan, TimeSlot, TASK_COLORS, formatHour } from '@/lib/types';

function ColorPicker({ onSelect, onClose }: { onSelect: (c: string) => void; onClose: () => void }) {
  return (
    <div className="absolute z-50 top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex gap-1.5 flex-wrap w-44">
      <button onClick={() => onSelect('')} className="w-5 h-5 rounded border border-gray-300 text-xs flex items-center justify-center text-gray-400">✕</button>
      {TASK_COLORS.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className="w-5 h-5 rounded-full border-2 border-white shadow"
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  );
}

export default function TimeGrid({ plan, theme }: { plan: DayPlan; theme: string }) {
  const { updateTimeSlot, toggleSlotComplete, setSlotColor } = useAppStore();
  const isNeu = theme === 'neumorphic';
  const [colorPickerSlot, setColorPickerSlot] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const slotMap = new Map<string, TimeSlot>();
  plan.timeSlots.forEach((s) => slotMap.set(`${s.hour}-${s.half}`, s));

  const rows: { hour: number; half: 0 | 30 }[] = [];
  for (let h = 5; h <= 23; h++) {
    rows.push({ hour: h, half: 0 });
    rows.push({ hour: h, half: 30 });
  }

  const inputCls = isNeu
    ? 'flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-300 min-w-0'
    : 'flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-300 min-w-0';

  const rowBaseCls = isNeu
    ? 'flex items-center gap-2 px-3 py-1 rounded-lg transition-all group'
    : 'flex items-center gap-2 px-2 py-1 border-b border-gray-300 group';

  const getRowCls = (slot: TimeSlot | undefined, half: 0 | 30) => {
    if (isNeu) {
      if (slot?.completed) return `${rowBaseCls} bg-[#e0e5ec] shadow-[inset_2px_2px_4px_#b8bec7,inset_-2px_-2px_4px_#ffffff] opacity-60`;
      return `${rowBaseCls} bg-[#e0e5ec] shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff] hover:shadow-[4px_4px_8px_#b8bec7,-4px_-4px_8px_#ffffff]`;
    } else {
      const bg = half === 0 ? 'bg-[#4ECDC4]/5' : 'bg-[#4ECDC4]/10';
      if (slot?.completed) return `${rowBaseCls} ${bg} opacity-50 line-through`;
      return `${rowBaseCls} ${bg} hover:bg-[#4ECDC4]/20`;
    }
  };

  const hourLabelCls = isNeu
    ? 'w-8 text-xs text-gray-400 font-medium text-right shrink-0'
    : 'w-8 text-xs text-gray-600 font-bold text-right shrink-0';

  return (
    <div
      ref={gridRef}
      className={isNeu
        ? 'bg-[#e0e5ec] rounded-2xl shadow-[6px_6px_12px_#b8bec7,-6px_-6px_12px_#ffffff] p-4'
        : 'border-2 border-gray-800 bg-white p-3'
      }
      onClick={() => setColorPickerSlot(null)}
    >
      {/* Header */}
      <div className={`flex items-center gap-2 px-2 pb-2 mb-1 border-b ${isNeu ? 'border-gray-300' : 'border-gray-800 border-b-2'}`}>
        <div className="w-8" />
        <div className={`flex-1 text-xs font-bold text-center ${isNeu ? 'text-gray-400' : 'text-gray-700'}`}>:00</div>
        <div className={`w-4`} />
        <div className={`flex-1 text-xs font-bold text-center ${isNeu ? 'text-gray-400' : 'text-gray-700'}`}>:30</div>
        <div className="w-6" />
      </div>

      <div className="flex flex-col gap-0.5">
        {/* Render hour pairs */}
        {Array.from({ length: 19 }, (_, i) => i + 5).map((h) => {
          const s0 = slotMap.get(`${h}-0`);
          const s30 = slotMap.get(`${h}-30`);
          const key0 = `${h}-0`;
          const key30 = `${h}-30`;

          return (
            <div key={h} className="flex items-stretch gap-1">
              {/* Hour label */}
              <div className={`${hourLabelCls} flex items-center justify-end`}>
                {formatHour(h)}
              </div>

              {/* :00 slot */}
              <div className={`flex-1 relative ${getRowCls(s0, 0)}`}
                style={s0?.color ? { borderLeft: `3px solid ${s0.color}` } : {}}>
                <input
                  type="text"
                  value={s0?.task || ''}
                  onChange={(e) => updateTimeSlot(h, 0, e.target.value)}
                  placeholder=""
                  className={`${inputCls} ${s0?.completed ? 'line-through' : ''}`}
                  style={s0?.color ? { color: s0.color } : {}}
                />
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleSlotComplete(h, 0); }}
                    className="text-xs w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-100 hover:border-green-400"
                  >
                    {s0?.completed ? '↩' : '✓'}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setColorPickerSlot(colorPickerSlot === key0 ? null : key0); }}
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: s0?.color || '#ccc' }}
                  />
                  {colorPickerSlot === key0 && (
                    <ColorPicker
                      onSelect={(c) => { setSlotColor(h, 0, c); setColorPickerSlot(null); }}
                      onClose={() => setColorPickerSlot(null)}
                    />
                  )}
                </div>
              </div>

              {/* :30 slot */}
              <div className={`flex-1 relative ${getRowCls(s30, 30)}`}
                style={s30?.color ? { borderLeft: `3px solid ${s30.color}` } : {}}>
                <input
                  type="text"
                  value={s30?.task || ''}
                  onChange={(e) => updateTimeSlot(h, 30, e.target.value)}
                  placeholder=""
                  className={`${inputCls} ${s30?.completed ? 'line-through' : ''}`}
                  style={s30?.color ? { color: s30.color } : {}}
                />
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleSlotComplete(h, 30); }}
                    className="text-xs w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-100 hover:border-green-400"
                  >
                    {s30?.completed ? '↩' : '✓'}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setColorPickerSlot(colorPickerSlot === key30 ? null : key30); }}
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: s30?.color || '#ccc' }}
                  />
                  {colorPickerSlot === key30 && (
                    <ColorPicker
                      onSelect={(c) => { setSlotColor(h, 30, c); setColorPickerSlot(null); }}
                      onClose={() => setColorPickerSlot(null)}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
