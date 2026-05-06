"use client";
import React from 'react';
import Image from 'next/image';
import RevealBlock from '../ui/RevealBlock';
import Logo from '../ui/Logo';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import ContactShortcut from '../ui/ContactShortcut';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function MobileSection({ theme, t, resolvedTheme, language, setLanguage, mode, cycleTheme, sectionShell, sectionTitleClass, sectionIntroClass, sectionEyebrowStyle, panelShellStyle, panelTopLineStyle, chipStyle, iconTileStyle, inputSurfaceStyle, brandLogoClass, contactLogoClass, footerLogoClass, isContactFormOpen, setIsContactFormOpen, contactFormRef, handleContactFieldChange, contactForm, messageTextareaRef, handleContactSubmit, isSubmittingContact, isCaptchaLoading, captchaChallenge, captchaLoadError, loadCaptchaChallenge, contactStatus, contactUi, matrixColumns, matrixColumnColors, matrixColumnDurations, matrixColumnFontSizes, matrixColumnBlurs, outcomeLongCopy }) {
  return (
    <RevealBlock
        variant="slide-up"
        className={`relative overflow-hidden ${sectionShell} border-t`}
        style={{ borderColor: theme.border }}
      >
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={resolvedTheme === "light" ? "/images/studio/mobile-apps-abstract-light-v1.png" : "/images/studio/mobile-apps-abstract-v1.png"}
            alt=""
            fill
            className={resolvedTheme === "light" ? "object-cover object-[70%_center] opacity-82" : "object-cover object-[72%_center] opacity-46"}
            sizes="100vw"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                resolvedTheme === "light"
                  ? "linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.78) 34%, rgba(255,255,255,0.28) 62%, rgba(255,255,255,0.56) 100%)"
                  : `linear-gradient(90deg, ${theme.page} 0%, rgba(5,5,8,0.84) 34%, rgba(5,5,8,0.44) 62%, ${theme.page} 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                resolvedTheme === "light"
                  ? "linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.06) 18%, rgba(255,255,255,0.12) 82%, rgba(255,255,255,0.76) 100%)"
                  : `linear-gradient(180deg, ${theme.page} 0%, transparent 18%, transparent 82%, ${theme.page} 100%)`,
            }}
          />
          <div
            className="absolute right-[18%] top-[10%] h-[24rem] w-[24rem] rounded-full blur-[130px]"
            style={{ backgroundColor: theme.accentSoft, opacity: resolvedTheme === "light" ? 0.18 : 0.44 }}
          />
        </div>

        <div className="relative z-10 grid gap-12 xl:grid-cols-[minmax(0,0.9fr)_minmax(28rem,0.72fr)] xl:items-start">
          <div className="max-w-4xl">
            <div
              className="inline-flex items-center rounded-full border px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.24em]"
              style={{
                borderColor: theme.border,
                backgroundColor: resolvedTheme === "light" ? "rgba(255,255,255,0.5)" : "rgba(10,12,18,0.46)",
                color: theme.softText,
                backdropFilter: "blur(14px)",
              }}
            >
              {t.mobileEyebrow}
            </div>

            <h2 className="font-display mt-4 max-w-[12ch] text-[1.95rem] font-bold leading-[1.03] sm:text-[2.25rem] lg:text-[2.85rem]">
              {t.mobileTitle}
            </h2>

            <p
              className="mt-5 max-w-3xl text-[0.98rem] leading-7 sm:text-[1.03rem] lg:text-[1.08rem] lg:leading-8"
              style={{ color: theme.mutedText }}
            >
              {t.mobileDescription}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl px-6 py-4 text-[0.95rem] font-semibold transition hover:translate-y-[-1px] lg:text-[1rem]"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.buttonText,
                  boxShadow: `0 18px 60px ${theme.accentSoft}`,
                }}
              >
                {t.bookCall}
              </a>
              <span className="text-[0.76rem] uppercase tracking-[0.2em]" style={{ color: theme.softText }}>
                iOS • Android • Cross-platform
              </span>
            </div>
          </div>

          <div
            className="rounded-[1.55rem] border px-5 py-5 xl:justify-self-end"
            style={{
              borderColor: resolvedTheme === "light" ? "rgba(31,28,44,0.1)" : "rgba(255,255,255,0.08)",
              backgroundColor: resolvedTheme === "light" ? "rgba(255,255,255,0.46)" : "rgba(6,9,18,0.34)",
              backdropFilter: "blur(14px)",
            }}
          >
            <div
              className="text-[0.68rem] font-medium uppercase tracking-[0.24em]"
              style={{ color: resolvedTheme === "light" ? "rgba(34,28,52,0.68)" : "rgba(236,229,255,0.72)" }}
            >
              {t.mobileEyebrow}
            </div>
            <p className="mt-3 text-[1rem] leading-7 sm:text-[1.04rem]" style={{ color: resolvedTheme === "light" ? "#211c2e" : "#f5f2ff" }}>
              {t.mobileVisualTitle}
            </p>
            <div
              className="mt-5 text-[0.78rem] uppercase tracking-[0.2em]"
              style={{ color: theme.softText }}
            >
              {t.mobileVisualCaption}
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-14">
          <div
            className="mb-8 h-px w-full"
            style={{
              background: `linear-gradient(90deg, ${theme.accent} 0%, ${theme.accentSoft} 30%, transparent 72%)`,
              opacity: 0.6,
            }}
          />

          <div className="grid gap-5 md:grid-cols-3">
            {t.mobileCapabilities.map((capability, index) => (
              <div
                key={capability.title}
                className="group relative overflow-hidden rounded-[1.65rem] p-5 transition-all duration-300 lg:p-6"
                style={{
                  backgroundColor: resolvedTheme === "light" ? "rgba(255,255,255,0.24)" : "rgba(14,16,22,0.38)",
                  boxShadow: resolvedTheme === "light" ? "inset 0 0 0 1px rgba(31,28,44,0.08)" : "inset 0 0 0 1px rgba(255,255,255,0.08)",
                  backdropFilter: resolvedTheme === "light" ? "blur(4px)" : "blur(7px)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      resolvedTheme === "light"
                        ? "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%)"
                        : "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)",
                  }}
                />
                <div
                  className="absolute left-0 top-0 h-full w-px"
                  style={{
                    background: `linear-gradient(180deg, ${theme.accent} 0%, ${theme.accentSoft} 100%)`,
                    opacity: 0.72,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full border text-[0.72rem] font-semibold uppercase tracking-[0.2em]"
                      style={{
                        borderColor: resolvedTheme === "light" ? "rgba(31,28,44,0.1)" : "rgba(255,255,255,0.1)",
                        backgroundColor: resolvedTheme === "light" ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.04)",
                        color: theme.accent,
                      }}
                    >
                      0{index + 1}
                    </div>

                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-2xl border"
                      style={iconTileStyle}
                    >
                      {index === 0 ? (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <rect x="7" y="3.5" width="10" height="17" rx="2.5" />
                          <path d="M10 7h4M10 16.5h4" />
                        </svg>
                      ) : index === 1 ? (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M6 8h12M6 16h12" />
                          <circle cx="8" cy="8" r="2.5" />
                          <circle cx="16" cy="16" r="2.5" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M4 13h4l2.2-6 3.6 10 2.2-4H20" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <h3 className="font-display mt-6 max-w-[15ch] text-[1.12rem] font-semibold leading-[1.15] sm:text-[1.18rem] lg:text-[1.26rem]">
                    {capability.title}
                  </h3>

                  <p className="mt-4 text-[0.93rem] leading-7 lg:text-[0.98rem]" style={{ color: theme.mutedText }}>
                    {capability.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealBlock>
  );
}
