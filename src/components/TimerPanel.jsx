import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import GlassCard from './GlassCard';

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function TimerPanel({ settings, onSessionEnd, onCreateSession }) {
  const [duration, setDuration] = useState(settings.focusMinutes * 60);
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [running, setRunning] = useState(false);
  const [muted, setMuted] = useState(false);
  const clickAudioRef = useRef(null);

  useEffect(() => {
    setDuration(settings.focusMinutes * 60);
    setSecondsLeft(settings.focusMinutes * 60);
  }, [settings.focusMinutes]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setRunning(false);
          onSessionEnd?.();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, onSessionEnd]);

  const percentage = useMemo(() => 1 - secondsLeft / duration, [secondsLeft, duration]);

  const handleSlider = (e) => {
    const value = Number(e.target.value);
    const newSeconds = Math.round((value / 100) * duration);
    setSecondsLeft(newSeconds);
    if (!muted && clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(() => {});
    }
  };

  const toggle = () => setRunning((r) => !r);
  const reset = () => {
    setRunning(false);
    setSecondsLeft(duration);
  };

  useEffect(() => {
    onCreateSession?.(secondsLeft, running);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlassCard className="p-6 md:p-8 text-slate-100/90">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Timer</h2>
          <p className="text-xs text-slate-300/70">Slide to set, tap to flow</p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs backdrop-blur hover:bg-white/15 transition"
          onClick={() => setMuted((m) => !m)}
          aria-label="Toggle click sound"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />} {muted ? 'Muted' : 'Clicks'}
        </button>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6 items-center">
        <div className="order-2 md:order-1">
          <input
            type="range"
            className="w-full accent-yellow-400 [--tw-shadow:0_0_40px_rgba(250,204,21,0.35)]"
            min={0}
            max={100}
            value={Math.round(percentage * 100)}
            onChange={handleSlider}
          />
          <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.6)]"
              style={{ width: `${Math.round(percentage * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-300/70">Slide to adjust remaining time</p>
        </div>
        <div className="flex flex-col items-center justify-center order-1 md:order-2">
          <div className="relative">
            <div className="text-6xl md:text-7xl font-bold tabular-nums tracking-tight">
              {formatTime(secondsLeft)}
            </div>
            <div className="absolute -inset-2 rounded-2xl blur-2xl bg-yellow-400/10" />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={toggle}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur hover:bg-white/15 transition"
            >
              {running ? <Pause size={18} /> : <Play size={18} />} {running ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur hover:bg-white/15 transition"
            >
              <RotateCcw size={18} /> Reset
            </button>
          </div>
        </div>
      </div>

      <audio ref={clickAudioRef} src="https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3" preload="auto" />
    </GlassCard>
  );
}
