'use client';
import { useAppStore } from '@/lib/store';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useAppStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        isDark
          ? 'bg-[#27272A] border border-white/[0.07] text-[#A1A1AA] hover:text-[#FAFAFA]'
          : 'bg-white border border-black/[0.07] text-[#6B7280] hover:text-[#111111] shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
      }`}
    >
      {isDark
        ? <Sun className="w-3.5 h-3.5" />
        : <Moon className="w-3.5 h-3.5" />
      }
      {isDark ? 'Light' : 'Dark'}
    </button>
  );
}
