export type Theme = 'flat' | 'neumorphic';

export interface TimeSlot {
  hour: number;
  half: 0 | 30;
  task: string;
  completed: boolean;
  color?: string;
}

export interface DayPlan {
  date: string; // YYYY-MM-DD
  priorities: string[];
  brainDump: string;
  timeSlots: TimeSlot[];
  theme: Theme;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalDays: number;
}

export const HOURS = [5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11] as const;
export const HOURS_24 = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23] as const;

export const TASK_COLORS = [
  '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF',
  '#C77DFF', '#FF9A3C', '#00B4D8', '#F72585',
];

export function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (const h of HOURS_24) {
    slots.push({ hour: h, half: 0, task: '', completed: false });
    slots.push({ hour: h, half: 30, task: '', completed: false });
  }
  return slots;
}

export function formatHour(hour: number): string {
  if (hour === 0) return '12';
  if (hour > 12) return String(hour - 12);
  return String(hour);
}

export function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}
