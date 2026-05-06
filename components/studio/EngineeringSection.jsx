"use client";
import React from 'react';
import Image from 'next/image';
import RevealBlock from '../ui/RevealBlock';
import Logo from '../ui/Logo';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import ContactShortcut from '../ui/ContactShortcut';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function EngineeringSection({ theme, t, resolvedTheme, language, setLanguage, mode, cycleTheme, sectionShell, sectionTitleClass, sectionIntroClass, sectionEyebrowStyle, panelShellStyle, panelTopLineStyle, chipStyle, iconTileStyle, inputSurfaceStyle, brandLogoClass, contactLogoClass, footerLogoClass, isContactFormOpen, setIsContactFormOpen, contactFormRef, handleContactFieldChange, contactForm, messageTextareaRef, handleContactSubmit, isSubmittingContact, isCaptchaLoading, captchaChallenge, captchaLoadError, loadCaptchaChallenge, contactStatus, contactUi, matrixColumns, matrixColumnColors, matrixColumnDurations, matrixColumnFontSizes, matrixColumnBlurs, outcomeLongCopy }) {
  return (
    <RevealBlock
        id="services"
        variant="slide-up"
        className={`${sectionShell} border-t`}
        style={{ borderColor: theme.border }}
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <div
              className="inline-flex items-center rounded-full border px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.24em]"
              style={sectionEyebrowStyle}
            >
              {t.systemImpact}
            </div>
            <h2 className={sectionTitleClass}>
              {t.coreCapabilities}
            </h2>
          </div>

          <p
            className={`${sectionIntroClass} lg:ml-auto`}
            style={{ color: theme.mutedText }}
          >
            {t.heroDescription}
          </p>
        </div>

        <div className="mt-14 grid gap-6 xl:grid-cols-2 2xl:grid-cols-[repeat(2,minmax(0,1fr))]">
          {t.services.map((service, index) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 lg:p-8"
              style={panelShellStyle(index === 0 ? theme.accentSoft : "rgba(0,0,0,0.12)")}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={panelTopLineStyle}
              />
              <div
                className="absolute -right-10 top-0 h-36 w-36 rounded-full blur-3xl"
                style={{
                  backgroundColor: index === 0 ? theme.accentSoft : theme.panelStrong,
                  opacity: index === 0 ? 0.9 : 0.65,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-6">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border"
                    style={iconTileStyle}
                  >
                    {index === 0 ? (
                      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
                        <rect x="4" y="5" width="16" height="14" rx="2.5" />
                        <path d="M8 9h8M8 13h5" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
                        <path d="M6 12h12M12 6v12" />
                        <circle cx="12" cy="12" r="8" />
                      </svg>
                    )}
                  </div>
                  <div
                    className="text-[0.72rem] font-medium uppercase tracking-[0.28em]"
                    style={{ color: theme.softText }}
                  >
                    0{index + 1}
                  </div>
                </div>

                <h3 className="font-display mt-8 text-[1.35rem] font-semibold sm:text-[1.45rem] lg:text-[1.65rem]">
                  {service.title}
                </h3>
                <div
                  className="mt-3 inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em]"
                  style={chipStyle}
                >
                  {index === 0 ? t.executionModel : t.enterpriseReady}
                </div>

                <ul className="mt-8 space-y-3 text-[0.95rem] leading-7 lg:text-[1.02rem]" style={{ color: theme.mutedText }}>
                {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-300"
                      style={{
                        borderColor: theme.border,
                        backgroundColor: theme.panel,
                      }}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor: theme.accent,
                          boxShadow: `0 0 0 6px ${theme.accentSoft}`,
                        }}
                      />
                      <span>{item}</span>
                    </li>
                ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </RevealBlock>
  );
}
