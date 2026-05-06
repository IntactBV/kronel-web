"use client";
import React from 'react';
import Image from 'next/image';
import RevealBlock from '../ui/RevealBlock';
import Logo from '../ui/Logo';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import ContactShortcut from '../ui/ContactShortcut';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function OutcomesSection({ theme, t, resolvedTheme, language, setLanguage, mode, cycleTheme, sectionShell, sectionTitleClass, sectionIntroClass, sectionEyebrowStyle, panelShellStyle, panelTopLineStyle, chipStyle, iconTileStyle, inputSurfaceStyle, brandLogoClass, contactLogoClass, footerLogoClass, isContactFormOpen, setIsContactFormOpen, contactFormRef, handleContactFieldChange, contactForm, messageTextareaRef, handleContactSubmit, isSubmittingContact, isCaptchaLoading, captchaChallenge, captchaLoadError, loadCaptchaChallenge, contactStatus, contactUi, matrixColumns, matrixColumnColors, matrixColumnDurations, matrixColumnFontSizes, matrixColumnBlurs, outcomeLongCopy }) {
  return (
    <RevealBlock
        variant="expand"
        className={`${sectionShell} border-t`}
        style={{ borderColor: theme.border }}
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <div
              className="inline-flex items-center rounded-full border px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.24em]"
              style={sectionEyebrowStyle}
            >
              {t.businessOutcomes}
            </div>
            <h2 className={sectionTitleClass}>
              {t.businessOutcomes}
            </h2>
          </div>

          <p
            className={`${sectionIntroClass} lg:ml-auto`}
            style={{ color: theme.mutedText }}
          >
            Clearer operations, less manual drag, and systems that support better decisions as the business scales.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 2xl:grid-cols-4">
          {t.outcomes.map((outcome, index) => (
            <div
              key={outcome}
              className="group relative overflow-hidden rounded-[2rem] border p-5 transition-all duration-300 lg:p-6"
              style={panelShellStyle(theme.accentSoft)}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={panelTopLineStyle}
              />
              <div
                className="absolute -right-8 top-0 h-28 w-28 rounded-full blur-3xl"
                style={{
                  backgroundColor: theme.accentSoft,
                  opacity: 0.75,
                }}
              />

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                    style={iconTileStyle}
                  >
                    {index === 0 ? (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M4 13h4l2.2-6 3.6 10 2.2-4H20" />
                      </svg>
                    ) : index === 1 ? (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M7 7v10M12 10v7M17 5v12" />
                      </svg>
                    ) : index === 2 ? (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="4" y="5" width="16" height="14" rx="2.5" />
                        <path d="M8 9h8M8 13h5" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M6 16 10 12l3 3 5-7" />
                        <path d="M6 6h12" />
                      </svg>
                    )}
                  </div>
                </div>

                <h3 className="font-display mt-8 text-[1.08rem] font-semibold leading-7 lg:text-[1.18rem]" style={{ color: theme.text }}>
                  {outcome}
                </h3>

                <p className="mt-5 text-[0.92rem] leading-7 lg:text-[0.98rem]" style={{ color: theme.mutedText }}>
                  {outcomeLongCopy[index] ?? outcomeLongCopy[0]}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: theme.accent,
                      boxShadow: `0 0 0 6px ${theme.accentSoft}`,
                    }}
                  />
                  <span className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: theme.softText }}>
                    {index === 0 ? t.systemImpact : index === 1 ? t.efficiency : index === 2 ? t.scalability : t.enterpriseReady}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RevealBlock>
  );
}
