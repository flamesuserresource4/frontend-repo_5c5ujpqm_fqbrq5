import React from 'react';

export default function GlassCard({ children, className = '' }) {
  return (
    <div
      className={
        `rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 ` +
        `backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] ${className}`
      }
    >
      {children}
    </div>
  );
}
