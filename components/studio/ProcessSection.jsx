"use client";
import React from 'react';
import Image from 'next/image';
import RevealBlock from '../ui/RevealBlock';
import Logo from '../ui/Logo';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import ContactShortcut from '../ui/ContactShortcut';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function ProcessSection({ theme, t, resolvedTheme, language, setLanguage, mode, cycleTheme, sectionShell, sectionTitleClass, sectionIntroClass, sectionEyebrowStyle, panelShellStyle, panelTopLineStyle, chipStyle, iconTileStyle, inputSurfaceStyle, brandLogoClass, contactLogoClass, footerLogoClass, isContactFormOpen, setIsContactFormOpen, contactFormRef, handleContactFieldChange, contactForm, messageTextareaRef, handleContactSubmit, isSubmittingContact, isCaptchaLoading, captchaChallenge, captchaLoadError, loadCaptchaChallenge, contactStatus, contactUi, matrixColumns, matrixColumnColors, matrixColumnDurations, matrixColumnFontSizes, matrixColumnBlurs, outcomeLongCopy }) {
  return (
    <RevealBlock
        variant="tilt-in"
        className={`${sectionShell} border-t`}
        style={{ borderColor: theme.border }}
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <div
              className="inline-flex items-center rounded-full border px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.24em]"
              style={sectionEyebrowStyle}
            >
              {t.enterpriseReady}
            </div>
            <h2 className={sectionTitleClass}>
              {t.executionModel}
            </h2>
          </div>

          <p
            className={`${sectionIntroClass} lg:ml-auto`}
            style={{ color: theme.mutedText }}
          >
            {t.process.map((item) => item.title).join(" • ")}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {t.process.map((item, index) => (
            <div
              key={item.step}
              className="group relative overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 lg:p-8"
              style={panelShellStyle(theme.accentSoft)}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={panelTopLineStyle}
              />
              <div
                className="absolute -right-10 -top-6 h-36 w-36 rounded-full blur-3xl"
                style={{
                  backgroundColor: theme.accentSoft,
                  opacity: 0.8,
                }}
              />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-6">
                    <div
                      className="relative inline-flex items-center justify-center"
                      style={{
                        filter: `drop-shadow(0 0 24px ${theme.accentSoft})`,
                      }}
                    >
                      <div
                        className="font-display relative text-[2.8rem] leading-none sm:text-[3.2rem]"
                        style={{
                          color: theme.text,
                          textShadow: `0 0 24px ${theme.accentSoft}`,
                        }}
                      >
                        {item.step}
                      </div>
                    </div>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border"
                    style={iconTileStyle}
                  >
                    {index === 0 ? (
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
                        <path d="M5 12h14M12 5v14" />
                      </svg>
                    ) : index === 1 ? (
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
                        <path d="M4 7h16M7 4v16" />
                        <path d="M17 8 8 17" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
                        <path d="M5 12.5 9.5 17 19 7.5" />
                      </svg>
                    )}
                  </div>
                </div>

                <h3 className="font-display mt-8 text-[1.22rem] font-semibold sm:text-[1.34rem] lg:text-[1.5rem]">
                  {item.title}
                </h3>
                <div
                  className="mt-3 inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em]"
                  style={chipStyle}
                >
                  {index === 0 ? t.coreCapabilities : index === 1 ? t.systemImpact : t.businessOutcomes}
                </div>
                <p className="mt-6 text-[0.95rem] leading-7 lg:text-[1.02rem]" style={{ color: theme.mutedText }}>
                  {item.text}
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: theme.accent,
                      boxShadow: `0 0 0 6px ${theme.accentSoft}`,
                    }}
                  />
                  <span className="text-[0.72rem] uppercase tracking-[0.2em]" style={{ color: theme.softText }}>
                    {index === 0 ? t.efficiency : index === 1 ? t.scalability : t.enterpriseReady}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RevealBlock>
  );
}
