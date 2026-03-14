'use client';
import { useMemo } from 'react';

const QUOTES = [
  { text: "You don't rise to the level of your goals, you fall to the level of your systems.", author: "James Clear" },
  { text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.", author: "Stephen Covey" },
  { text: "Either you run the day, or the day runs you.", author: "Jim Rohn" },
  { text: "What gets measured gets managed.", author: "Peter Drucker" },
  { text: "Focus is the art of knowing what to ignore.", author: "James Clear" },
  { text: "You have power over your mind, not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "It is not that we have a short time to live, but that we waste a great deal of it.", author: "Seneca" },
  { text: "The most dangerous distractions are the ones you love, but that don't love you back.", author: "Warren Buffett" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "Without great solitude, no serious work is possible.", author: "Pablo Picasso" },
  { text: "The successful warrior is the average man with laser-like focus.", author: "Bruce Lee" },
  { text: "Do one thing at a time, and while doing it put your whole soul into it.", author: "Swami Vivekananda" },
  { text: "Work expands to fill the time allotted for its completion.", author: "Cyril Parkinson" },
  { text: "Don't confuse activity with productivity.", author: "Tim Ferriss" },
  { text: "A year from now you may wish you had started today.", author: "Karen Lamb" },
  { text: "The art of being wise is knowing what to overlook.", author: "William James" },
  { text: "Time is what we want most but use worst.", author: "William Penn" },
  { text: "You need to think about what the one thing you want to do is.", author: "Elon Musk" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Amateurs sit and wait for inspiration. The rest of us just get up and go to work.", author: "Stephen King" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Lose an hour in the morning, and you will be all day hunting for it.", author: "Richard Whately" },
  { text: "Absorb what is useful. Reject what is useless. Add what is essentially your own.", author: "Bruce Lee" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "You don't need more time. You need more focus.", author: "Robin Sharma" },
  { text: "Think in the morning. Act in the noon. Read in the evening. Sleep in the night.", author: "William Blake" },
  { text: "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.", author: "Alexander Graham Bell" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
  { text: "Perfection is not attainable, but if we chase perfection we can catch excellence.", author: "Vince Lombardi" },
  { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
];

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export default function QuoteCard({ theme }: { theme: string }) {
  const isDark = theme === 'dark';
  const quote = useMemo(() => QUOTES[getDayOfYear() % QUOTES.length], []);

  return (
    <div className={`w-full px-6 py-5 rounded-2xl ${
      isDark
        ? 'bg-[#18181B] border border-white/[0.07]'
        : 'bg-white border border-black/[0.07] shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
    }`}>
      <p className={`text-sm leading-relaxed ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>
        &ldquo;{quote.text}&rdquo;
      </p>
      <p className={`text-xs mt-2 font-medium ${isDark ? 'text-[#52525B]' : 'text-[#A8A29E]'}`}>
        — {quote.author}
      </p>
    </div>
  );
}
