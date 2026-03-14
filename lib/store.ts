import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DayPlan, StreakData, Theme, TimeSlot, Todo, generateTimeSlots, todayStr } from './types';

interface AppState {
  theme: Theme;
  plans: Record<string, DayPlan>;
  streak: StreakData;
  selectedDate: string;
  todos: Todo[];
  setTheme: (t: Theme) => void;
  setSelectedDate: (d: string) => void;
  getCurrentPlan: () => DayPlan;
  updatePriority: (index: number, value: string) => void;
  updateBrainDump: (value: string) => void;
  updateTimeSlot: (hour: number, half: 0 | 30, value: string) => void;
  toggleSlotComplete: (hour: number, half: 0 | 30) => void;
  setSlotColor: (hour: number, half: 0 | 30, color: string) => void;
  clearDay: () => void;
  updateStreak: () => void;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompletedTodos: () => void;
}

function makePlan(date: string, theme: Theme): DayPlan {
  return {
    date,
    priorities: ['', '', ''],
    brainDump: '',
    timeSlots: generateTimeSlots(),
    theme,
  };
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      plans: {},
      streak: {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: '',
        totalDays: 0,
      },
      selectedDate: todayStr(),
      todos: [],

      setTheme: (t) => {
        set({ theme: t });
        const { selectedDate, plans } = get();
        if (plans[selectedDate]) {
          set((s) => ({
            plans: {
              ...s.plans,
              [selectedDate]: { ...s.plans[selectedDate], theme: t },
            },
          }));
        }
      },

      setSelectedDate: (d) => set({ selectedDate: d }),

      getCurrentPlan: () => {
        const { plans, selectedDate, theme } = get();
        if (!plans[selectedDate]) {
          const newPlan = makePlan(selectedDate, theme);
          set((s) => ({ plans: { ...s.plans, [selectedDate]: newPlan } }));
          return newPlan;
        }
        return plans[selectedDate];
      },

      updatePriority: (index, value) => {
        const { selectedDate } = get();
        const plan = get().getCurrentPlan();
        const priorities = [...plan.priorities];
        priorities[index] = value;
        set((s) => ({
          plans: { ...s.plans, [selectedDate]: { ...plan, priorities } },
        }));
        get().updateStreak();
      },

      updateBrainDump: (value) => {
        const { selectedDate } = get();
        const plan = get().getCurrentPlan();
        set((s) => ({
          plans: { ...s.plans, [selectedDate]: { ...plan, brainDump: value } },
        }));
        get().updateStreak();
      },

      updateTimeSlot: (hour, half, value) => {
        const { selectedDate } = get();
        const plan = get().getCurrentPlan();
        const timeSlots = plan.timeSlots.map((s: TimeSlot) =>
          s.hour === hour && s.half === half ? { ...s, task: value } : s
        );
        set((s) => ({
          plans: { ...s.plans, [selectedDate]: { ...plan, timeSlots } },
        }));
        get().updateStreak();
      },

      toggleSlotComplete: (hour, half) => {
        const { selectedDate } = get();
        const plan = get().getCurrentPlan();
        const timeSlots = plan.timeSlots.map((s: TimeSlot) =>
          s.hour === hour && s.half === half
            ? { ...s, completed: !s.completed }
            : s
        );
        set((s) => ({
          plans: { ...s.plans, [selectedDate]: { ...plan, timeSlots } },
        }));
      },

      setSlotColor: (hour, half, color) => {
        const { selectedDate } = get();
        const plan = get().getCurrentPlan();
        const timeSlots = plan.timeSlots.map((s: TimeSlot) =>
          s.hour === hour && s.half === half ? { ...s, color } : s
        );
        set((s) => ({
          plans: { ...s.plans, [selectedDate]: { ...plan, timeSlots } },
        }));
      },

      clearDay: () => {
        const { selectedDate, theme } = get();
        set((s) => ({
          plans: { ...s.plans, [selectedDate]: makePlan(selectedDate, theme) },
        }));
      },

      updateStreak: () => {
        const today = todayStr();
        set((s) => {
          const streak = { ...s.streak };
          if (streak.lastActiveDate === today) return {};
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yStr = yesterday.toISOString().split('T')[0];
          if (streak.lastActiveDate === yStr) {
            streak.currentStreak += 1;
          } else {
            streak.currentStreak = 1;
          }
          streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
          streak.lastActiveDate = today;
          streak.totalDays += 1;
          return { streak };
        });
      },

      addTodo: (text) => {
        if (!text.trim()) return;
        set((s) => ({
          todos: [
            ...s.todos,
            { id: crypto.randomUUID(), text: text.trim(), completed: false },
          ],
        }));
      },

      toggleTodo: (id) => {
        set((s) => ({
          todos: s.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        }));
      },

      deleteTodo: (id) => {
        set((s) => ({ todos: s.todos.filter((t) => t.id !== id) }));
      },

      clearCompletedTodos: () => {
        set((s) => ({ todos: s.todos.filter((t) => !t.completed) }));
      },
    }),
    { name: 'timebox-store' }
  )
);
