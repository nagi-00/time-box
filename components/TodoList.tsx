'use client';
import { useState, useRef, KeyboardEvent } from 'react';
import { useAppStore } from '@/lib/store';
import { X } from 'lucide-react';
import { TodoState } from '@/lib/types';

const STATE_ICON: Record<TodoState, string> = {
  pending: '☐',
  done:    '☑',
  dropped: '☒',
};

const STATE_LABEL: Record<TodoState, string> = {
  pending: '미완료',
  done:    '완료',
  dropped: '취소',
};

export default function TodoList({ theme }: { theme: string }) {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompletedTodos } = useAppStore();
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isDark = theme === 'dark';

  const handleAdd = () => {
    if (!input.trim()) return;
    addTodo(input);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd();
  };

  const doneOrDropped = todos.filter((t) => t.state !== 'pending').length;

  /* ── styles ── */
  const cardCls = isDark
    ? 'bg-[#18181B] border border-white/[0.07] rounded-2xl p-4'
    : 'bg-white border border-black/[0.07] rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-4';

  const labelCls = `text-[10px] font-semibold uppercase tracking-widest mb-3 flex items-center justify-between ${
    isDark ? 'text-[#3F3F46]' : 'text-[#C4BDB7]'
  }`;

  const stateIconCls = (state: TodoState) => {
    if (state === 'done')    return isDark ? 'text-indigo-400' : 'text-indigo-500';
    if (state === 'dropped') return isDark ? 'text-[#52525B]'  : 'text-[#C4BDB7]';
    return isDark ? 'text-[#52525B]' : 'text-[#D6D3D1]';
  };

  const textCls = (state: TodoState) => {
    if (state === 'done')    return `line-through ${isDark ? 'text-[#52525B]' : 'text-[#C4BDB7]'}`;
    if (state === 'dropped') return `line-through ${isDark ? 'text-[#3F3F46]' : 'text-[#D6D3D1]'}`;
    return isDark ? 'text-[#E4E4E7]' : 'text-[#374151]';
  };

  return (
    <div className={cardCls}>
      {/* Header */}
      <div className={labelCls}>
        <span>Todo</span>
        {doneOrDropped > 0 && (
          <button
            onClick={clearCompletedTodos}
            className={`text-[10px] normal-case tracking-normal transition-colors ${
              isDark ? 'text-[#52525B] hover:text-red-400' : 'text-[#C4BDB7] hover:text-red-400'
            }`}
          >
            완료·취소 삭제 ({doneOrDropped})
          </button>
        )}
      </div>

      {/* Input */}
      <div className={`flex gap-2 mb-3 pb-3 border-b ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="새 항목 추가..."
          className={`flex-1 bg-transparent outline-none text-sm ${
            isDark ? 'text-[#E4E4E7] placeholder-[#3F3F46]' : 'text-[#374151] placeholder-[#D6D3D1]'
          }`}
        />
        <button
          onClick={handleAdd}
          disabled={!input.trim()}
          className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all disabled:opacity-30 ${
            isDark
              ? 'bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25'
              : 'bg-indigo-50 text-indigo-500 hover:bg-indigo-100'
          }`}
        >
          추가
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-0.5">
        {todos.length === 0 && (
          <p className={`text-xs py-2 ${isDark ? 'text-[#3F3F46]' : 'text-[#D6D3D1]'}`}>
            아직 항목이 없습니다
          </p>
        )}
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center gap-2 group px-1 py-1.5 rounded-lg transition-colors ${
              isDark ? 'hover:bg-white/[0.03]' : 'hover:bg-black/[0.02]'
            }`}
          >
            {/* State icon — click cycles pending → done → dropped → pending */}
            <button
              onClick={() => toggleTodo(todo.id)}
              title={STATE_LABEL[todo.state]}
              className={`font-mono text-sm shrink-0 w-5 text-center transition-colors ${stateIconCls(todo.state)} hover:opacity-70`}
            >
              {STATE_ICON[todo.state]}
            </button>

            {/* Text */}
            <span className={`flex-1 text-sm leading-snug transition-colors ${textCls(todo.state)}`}>
              {todo.text}
            </span>

            {/* Delete */}
            <button
              onClick={() => deleteTodo(todo.id)}
              className={`opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ${
                isDark ? 'text-[#3F3F46] hover:text-red-400' : 'text-[#D6D3D1] hover:text-red-400'
              }`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
