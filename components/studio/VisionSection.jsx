"use client";
import React from 'react';
import Image from 'next/image';
import RevealBlock from '../ui/RevealBlock';
import Logo from '../ui/Logo';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import ContactShortcut from '../ui/ContactShortcut';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function VisionSection({ theme, t, resolvedTheme, language, setLanguage, mode, cycleTheme, sectionShell, sectionTitleClass, sectionIntroClass, sectionEyebrowStyle, panelShellStyle, panelTopLineStyle, chipStyle, iconTileStyle, inputSurfaceStyle, brandLogoClass, contactLogoClass, footerLogoClass, isContactFormOpen, setIsContactFormOpen, contactFormRef, handleContactFieldChange, contactForm, messageTextareaRef, handleContactSubmit, isSubmittingContact, isCaptchaLoading, captchaChallenge, captchaLoadError, loadCaptchaChallenge, contactStatus, contactUi, matrixColumns, matrixColumnColors, matrixColumnDurations, matrixColumnFontSizes, matrixColumnBlurs, outcomeLongCopy }) {
  return (
    <RevealBlock
        variant="slide-up"
        className={`relative overflow-hidden ${sectionShell} border-t`}
        style={{ borderColor: theme.border }}
      >
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={resolvedTheme === "light" ? "/images/studio/vision-abstract-light-v1.png" : "/images/studio/vision-abstract-v1.png"}
            alt=""
            fill
            className={resolvedTheme === "light" ? "object-cover object-[70%_center] opacity-84" : "object-cover object-[76%_center] opacity-28"}
            sizes="100vw"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                resolvedTheme === "light"
                  ? "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.66) 28%, rgba(255,255,255,0.28) 54%, rgba(255,255,255,0.56) 76%, rgba(255,255,255,0.86) 100%)"
                  : `linear-gradient(90deg, ${theme.page} 0%, rgba(6,8,14,0.58) 26%, rgba(6,8,14,0.28) 54%, rgba(6,8,14,0.66) 76%, ${theme.page} 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                resolvedTheme === "light"
                  ? "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.16) 18%, rgba(255,255,255,0.08) 82%, rgba(255,255,255,0.68) 100%)"
                  : `linear-gradient(180deg, ${theme.page} 0%, transparent 18%, transparent 82%, ${theme.page} 100%)`,
            }}
          />
          <div
            className="absolute right-[12%] top-[16%] h-[22rem] w-[22rem] rounded-full blur-[120px]"
            style={{ backgroundColor: theme.accentSoft, opacity: resolvedTheme === "light" ? 0.16 : 0.32 }}
          />
          <div
            className="absolute left-[18%] bottom-[12%] h-[16rem] w-[16rem] rounded-full blur-[100px]"
            style={{
              backgroundColor: resolvedTheme === "light" ? "rgba(138,99,255,0.12)" : "rgba(133,212,255,0.08)",
              opacity: resolvedTheme === "light" ? 0.18 : 0.28,
            }}
          />
        </div>

        <div className="relative z-10 grid gap-10 xl:grid-cols-[minmax(0,1.08fr)_auto] xl:items-start">
          <div className="max-w-4xl">
            <div
              className="inline-flex items-center rounded-full border px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.24em]"
              style={{
                borderColor: theme.border,
                backgroundColor: resolvedTheme === "light" ? "rgba(255,255,255,0.44)" : "rgba(10,12,18,0.42)",
                color: theme.softText,
                backdropFilter: "blur(14px)",
              }}
            >
              {t.visionEyebrow}
            </div>

            <h2 className="font-display mt-4 max-w-[12ch] text-[1.95rem] font-bold leading-[1.03] sm:text-[2.2rem] lg:text-[2.8rem]">
              {t.visionTitle}
            </h2>

            <p
              className="mt-5 max-w-3xl text-[0.98rem] leading-7 sm:text-[1.03rem] lg:text-[1.08rem] lg:leading-8"
              style={{ color: theme.mutedText }}
            >
              {t.visionDescription}
            </p>
          </div>

          <div
            className="hidden xl:block max-w-[18rem] justify-self-end rounded-[1.55rem] border px-5 py-5"
            style={{
              borderColor: resolvedTheme === "light" ? "rgba(31,28,44,0.1)" : "rgba(255,255,255,0.08)",
              backgroundColor: resolvedTheme === "light" ? "rgba(255,255,255,0.4)" : "rgba(6,9,18,0.28)",
              backdropFilter: "blur(14px)",
            }}
          >
            <div
              className="text-[0.68rem] font-medium uppercase tracking-[0.24em]"
              style={{ color: resolvedTheme === "light" ? "rgba(34,28,52,0.68)" : "rgba(236,229,255,0.72)" }}
            >
              {t.visionEyebrow}
            </div>
            <p className="mt-3 text-[1rem] leading-7 sm:text-[1.04rem]" style={{ color: resolvedTheme === "light" ? "#211c2e" : "#f5f2ff" }}>
              {t.visionVisualTitle}
            </p>
            <div
              className="mt-5 text-[0.78rem] uppercase tracking-[0.2em]"
              style={{ color: theme.softText }}
            >
              {t.visionVisualCaption}
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

          <div className="grid max-w-5xl gap-5 sm:grid-cols-2 xl:max-w-[62rem]">
            {t.visionPoints.map((point, index) => (
              <div
                key={point.title}
                className="group relative overflow-hidden rounded-[1.65rem] p-5 transition-all duration-300 lg:p-6"
                style={{
                  backgroundColor: resolvedTheme === "light" ? "rgba(255,255,255,0.18)" : "rgba(14,16,22,0.34)",
                  boxShadow: resolvedTheme === "light" ? "inset 0 0 0 1px rgba(31,28,44,0.08)" : `inset 0 0 0 1px rgba(255,255,255,0.08)`,
                  transform: index % 2 === 1 ? "translateY(1.1rem)" : "none",
                  backdropFilter: resolvedTheme === "light" ? "blur(3px)" : "blur(6px)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      resolvedTheme === "light"
                        ? "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 100%)"
                        : `linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)`,
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
                        backgroundColor: resolvedTheme === "light" ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.03)",
                        color: theme.accent,
                      }}
                    >
                      0{index + 1}
                    </div>

                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: theme.accent,
                        boxShadow: `0 0 0 6px ${theme.accentSoft}`,
                      }}
                    />
                  </div>

                  <h3 className="font-display mt-6 max-w-[14ch] text-[1.12rem] font-semibold leading-[1.15] sm:text-[1.18rem] lg:text-[1.26rem]">
                    {point.title}
                  </h3>

                  <p className="mt-4 max-w-[30ch] text-[0.93rem] leading-7 lg:text-[0.98rem]" style={{ color: theme.mutedText }}>
                    {point.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealBlock>
  );
}
