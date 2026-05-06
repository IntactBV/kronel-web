import React from 'react';

export default function ContactShortcut({ theme, className = "" }) {
  return (
    <div className="group relative inline-flex">
      <a
        href="#contact"
        aria-label="Jump to contact section"
        className={`inline-flex items-center justify-center rounded-full border transition duration-200 hover:translate-y-[-1px] hover:scale-[1.04] focus-visible:translate-y-[-1px] focus-visible:scale-[1.04] ${className}`}
        style={{
          backgroundColor: theme.panel,
          borderColor: theme.border,
          color: theme.mutedText,
        }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 3 10 14" />
          <path d="m21 3-7 18-4-7-7-4 18-7Z" />
        </svg>
      </a>
      <span
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 -translate-x-1/2 rounded-full px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] opacity-0 transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          backgroundColor: theme.panelStrong,
          border: `1px solid ${theme.border}`,
          color: theme.softText,
          boxShadow: `0 18px 40px ${theme.accentSoft}`,
        }}
      >
        Contact
      </span>
    </div>
  );
}

