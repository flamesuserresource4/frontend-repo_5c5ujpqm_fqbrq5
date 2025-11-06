import React from 'react';
import { Settings } from 'lucide-react';
import GlassCard from './GlassCard';

export default function SettingsPanel({ settings, setSettings }) {
  const update = (key, value) => setSettings((s) => ({ ...s, [key]: Number(value) }));

  return (
    <GlassCard className="p-6 md:p-8 text-slate-100/90">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings size={20} />
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Settings</h2>
        </div>
        <span className="text-xs text-slate-300/70">Adjust focus and breaks</span>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="space-y-2">
          <label className="text-sm text-slate-300/80">Focus (min)</label>
          <input
            type="number"
            min={1}
            max={180}
            value={settings.focusMinutes}
            onChange={(e) => update('focusMinutes', e.target.value)}
            className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400/30"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300/80">Short Break (min)</label>
          <input
            type="number"
            min={1}
            max={60}
            value={settings.shortBreak}
            onChange={(e) => update('shortBreak', e.target.value)}
            className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400/30"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300/80">Long Break (min)</label>
          <input
            type="number"
            min={1}
            max={120}
            value={settings.longBreak}
            onChange={(e) => update('longBreak', e.target.value)}
            className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400/30"
          />
        </div>
      </div>

      <div className="mt-6 text-xs text-slate-400">
        Changes apply to new sessions. Current timer won't be interrupted.
      </div>
    </GlassCard>
  );
}
