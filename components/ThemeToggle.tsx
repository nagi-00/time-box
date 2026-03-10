'use client';
import { useAppStore } from '@/lib/store';
import { Theme } from '@/lib/types';

export default function ThemeToggle() {
  const { theme, setTheme } = useAppStore();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTheme('flat')}
        className={`px-3 py-1.5 text-sm font-medium rounded transition-all ${
          theme === 'flat'
            ? 'bg-[#4ECDC4] text-white'
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
      >
        Flat
      </button>
      <button
        onClick={() => setTheme('neumorphic')}
        className={`px-3 py-1.5 text-sm font-medium rounded transition-all ${
          theme === 'neumorphic'
            ? 'bg-[#e0e5ec] text-gray-700 shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff]'
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
      >
        Neumorphic
      </button>
    </div>
  );
}
