import React, { useState } from 'react';
import { PlusCircle, Play } from 'lucide-react';
import GlassCard from './GlassCard';

export default function TasksPanel({ onStartFromTask }) {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;
    setTasks((t) => [...t, { id: Date.now(), title, sessions: 0 }]);
    setText('');
  };

  const startTask = (id) => {
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, sessions: t.sessions + 1 } : t)));
    onStartFromTask?.();
  };

  return (
    <GlassCard className="p-6 md:p-8 text-slate-100/90">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Next Tasks</h2>
          <p className="text-xs text-slate-300/70">Queue what you want to focus on</p>
        </div>
      </div>

      <form onSubmit={addTask} className="mt-5 flex items-center gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task and press Enter"
          className="flex-1 rounded-xl bg-white/5 border border-white/15 px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400/30"
        />
        <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur hover:bg-white/15 transition">
          <PlusCircle size={18} /> Add
        </button>
      </form>

      <ul className="mt-5 space-y-2">
        {tasks.length === 0 && (
          <li className="text-sm text-slate-300/70">No tasks yet. Add one to begin.</li>
        )}
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-2">
            <div>
              <p className="font-medium">{t.title}</p>
              <p className="text-xs text-slate-400">Sessions started: {t.sessions}</p>
            </div>
            <button
              onClick={() => startTask(t.id)}
              className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 text-yellow-200 bg-yellow-400/10 px-3 py-1.5 backdrop-blur hover:bg-yellow-400/15 transition"
            >
              <Play size={16} /> Start
            </button>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
