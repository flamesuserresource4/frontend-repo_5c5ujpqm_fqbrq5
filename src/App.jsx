import React, { useState } from 'react';
import { Timer, ListTodo, Settings as SettingsIcon } from 'lucide-react';
import HeroCover from './components/HeroCover';
import TimerPanel from './components/TimerPanel';
import TasksPanel from './components/TasksPanel';
import SettingsPanel from './components/SettingsPanel';

export default function App() {
  const [tab, setTab] = useState('timer');
  const [settings, setSettings] = useState({ focusMinutes: 25, shortBreak: 5, longBreak: 15 });

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_20%_-10%,rgba(255,255,255,0.08),transparent),radial-gradient(800px_600px_at_100%_20%,rgba(150,200,255,0.08),transparent)] bg-black text-white">
      <HeroCover />

      <div className="max-w-6xl mx-auto px-6 md:px-8 -mt-20 md:-mt-24 space-y-6 pb-16">
        <nav className="flex items-center gap-2">
          <button
            onClick={() => setTab('timer')}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur transition ${
              tab === 'timer'
                ? 'border-yellow-400/40 bg-yellow-400/10 text-yellow-200'
                : 'border-white/15 bg-white/5 hover:bg-white/10'
            }`}
          >
            <Timer size={16} /> Timer
          </button>
          <button
            onClick={() => setTab('tasks')}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur transition ${
              tab === 'tasks'
                ? 'border-yellow-400/40 bg-yellow-400/10 text-yellow-200'
                : 'border-white/15 bg-white/5 hover:bg-white/10'
            }`}
          >
            <ListTodo size={16} /> Tasks
          </button>
          <button
            onClick={() => setTab('settings')}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur transition ${
              tab === 'settings'
                ? 'border-yellow-400/40 bg-yellow-400/10 text-yellow-200'
                : 'border-white/15 bg-white/5 hover:bg-white/10'
            }`}
          >
            <SettingsIcon size={16} /> Settings
          </button>
        </nav>

        {tab === 'timer' && (
          <TimerPanel
            settings={settings}
            onSessionEnd={() => {}}
            onCreateSession={() => {}}
          />
        )}

        {tab === 'tasks' && (
          <TasksPanel onStartFromTask={() => setTab('timer')} />
        )}

        {tab === 'settings' && (
          <SettingsPanel settings={settings} setSettings={setSettings} />
        )}
      </div>

      <footer className="py-10 text-center text-xs text-slate-400/80">
        Built for deep focus — Black, Silver, Neon.
      </footer>
    </div>
  );
}
