"use client";
import React, { useState, useEffect, useRef } from 'react';
import { LANGUAGES, LANGUAGE_LABELS } from '../../data/studio-data';

export default function LanguageSwitcher({ language, onChange, theme, className = "" }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={rootRef} className="group relative z-[120]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${LANGUAGE_LABELS[language] ?? language.toUpperCase()}`}
        className={`inline-flex items-center gap-2 rounded-full border pl-3 pr-3 transition duration-200 hover:translate-y-[-1px] hover:scale-[1.04] focus-visible:translate-y-[-1px] focus-visible:scale-[1.04] sm:pl-4 sm:pr-4 lg:gap-3 lg:pl-5 lg:pr-5 ${className}`}
        style={{
          backgroundColor: theme.panelStrong,
          borderColor: theme.border,
          color: theme.softText,
        }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 lg:h-[1.05rem] lg:w-[1.05rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8.25" />
          <path d="M3.75 12h16.5M12 3.75a13.2 13.2 0 0 1 0 16.5M12 3.75a13.2 13.2 0 0 0 0 16.5" />
        </svg>
        <span className="text-[0.72rem] font-medium uppercase sm:text-[0.82rem] lg:text-[0.95rem] 2xl:text-[1rem]">
          {language}
        </span>
        <svg
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="m5 7.5 5 5 5-5" />
        </svg>
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
        Language
      </span>

      {open ? (
        <div
          role="listbox"
          className="absolute right-0 top-full z-[140] mt-3 min-w-[12rem] rounded-2xl border p-2 shadow-2xl backdrop-blur-xl"
          style={{
            backgroundColor: theme.panelStrong,
            borderColor: theme.border,
            boxShadow: `0 24px 80px ${theme.accentSoft}`,
          }}
        >
          {LANGUAGES.map((lang) => {
            const active = lang === language;
            return (
              <button
                key={lang}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(lang);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition"
                style={{
                  backgroundColor: active ? theme.panel : "transparent",
                  color: active ? theme.text : theme.mutedText,
                }}
              >
                <span className="text-[0.78rem] font-medium lg:text-[0.9rem]">{LANGUAGE_LABELS[lang] ?? lang.toUpperCase()}</span>
                <span className="text-[0.68rem] uppercase tracking-[0.22em]">{lang}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

