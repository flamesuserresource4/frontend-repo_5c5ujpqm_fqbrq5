import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative w-full h-[360px] md:h-[440px] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qMOKV671Z1CM9yS7/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for readability without blocking interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />

      <div className="relative h-full flex items-center justify-center text-center">
        <div className="px-6">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white/90 drop-shadow-lg">
            Neon Pomodoro
          </h1>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
            Focus deeply with a sleek, glassy workspace. Manage tasks, run multiple sessions, and glide through time.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400/10 text-yellow-300 border border-yellow-400/30 px-3 py-1 text-xs backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
              Live 3D cover
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 text-gray-200 border border-white/20 px-3 py-1 text-xs backdrop-blur">
              Glass UI · Dark · Silver Neon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
