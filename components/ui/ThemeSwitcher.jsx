import React from 'react';

export default function ThemeSwitcher({ mode, onToggle, theme, resolvedTheme, className = "" }) {
  const icons = {
    system: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8" />
        <path d="M12 16v4" />
      </svg>
    ),
    light: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    ),
    dark: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
      </svg>
    ),
  };

  const labels = {
    system: `System theme (${resolvedTheme})`,
    light: "Light theme",
    dark: "Dark theme",
  };

  return (
    <div className="group relative inline-flex">
      <button
        type="button"
        onClick={onToggle}
        aria-label={labels[mode]}
        className={`inline-flex items-center justify-center rounded-full border transition duration-200 hover:translate-y-[-1px] hover:scale-[1.04] focus-visible:translate-y-[-1px] focus-visible:scale-[1.04] ${className}`}
        style={{
          backgroundColor: theme.panel,
          borderColor: theme.border,
          color: theme.mutedText,
        }}
      >
        {icons[mode]}
      </button>
      <span
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 -translate-x-1/2 rounded-full px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] opacity-0 transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          backgroundColor: theme.panelStrong,
          border: `1px solid ${theme.border}`,
          color: theme.softText,
          boxShadow: `0 18px 40px ${theme.accentSoft}`,
        }}
      >
        {labels[mode]}
      </span>
    </div>
  );
}

