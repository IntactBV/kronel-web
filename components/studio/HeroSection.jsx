"use client";
import React from 'react';
import Image from 'next/image';
import RevealBlock from '../ui/RevealBlock';
import Logo from '../ui/Logo';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import ContactShortcut from '../ui/ContactShortcut';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function HeroSection({ theme, t, resolvedTheme, language, setLanguage, mode, cycleTheme, sectionShell, sectionTitleClass, sectionIntroClass, sectionEyebrowStyle, panelShellStyle, panelTopLineStyle, chipStyle, iconTileStyle, inputSurfaceStyle, brandLogoClass, contactLogoClass, footerLogoClass, isContactFormOpen, setIsContactFormOpen, contactFormRef, handleContactFieldChange, contactForm, messageTextareaRef, handleContactSubmit, isSubmittingContact, isCaptchaLoading, captchaChallenge, captchaLoadError, loadCaptchaChallenge, contactStatus, contactUi, matrixColumns, matrixColumnColors, matrixColumnDurations, matrixColumnFontSizes, matrixColumnBlurs, outcomeLongCopy }) {
  return (
    <RevealBlock appearOnMount mountDelayMs={1200} variant="hero" className={`relative ${sectionShell} lg:py-28 xl:py-32`}>
        <div
          className="absolute -top-12 left-[30%] h-[640px] w-[640px] -translate-x-1/2 blur-[120px] opacity-40"
          style={{ background: theme.heroGlow }}
        />

        <div className="relative z-10">
          <div className="hero-topbar relative z-[160] mb-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Logo className={brandLogoClass} themeName={theme.logoTheme} />
              <span className="text-[0.72rem] tracking-[0.28em] sm:text-[0.82rem] lg:text-[1rem] 2xl:text-[1.08rem]" style={{ color: theme.softText }}>
                {t.brand}
              </span>
            </div>

            <div className="flex items-center gap-3 sm:justify-end">
              <LanguageSwitcher
                language={language}
                onChange={setLanguage}
                theme={theme}
                className="h-10 sm:h-11 lg:h-14 2xl:h-[3.75rem]"
              />

              <ThemeSwitcher
                mode={mode}
                onToggle={cycleTheme}
                theme={theme}
                resolvedTheme={resolvedTheme}
                className="h-10 w-10 sm:h-11 sm:w-11 lg:h-14 lg:w-14 2xl:h-[3.75rem] 2xl:w-[3.75rem]"
              />

              <ContactShortcut
                theme={theme}
                className="h-10 w-10 sm:h-11 sm:w-11 lg:h-14 lg:w-14 2xl:h-[3.75rem] 2xl:w-[3.75rem]"
              />
            </div>
          </div>

          <div className="grid items-start gap-14 xl:grid-cols-[minmax(0,1.08fr)_minmax(560px,38vw)] xl:gap-12 2xl:grid-cols-[minmax(0,1.05fr)_minmax(640px,40vw)] 2xl:gap-16">
            <div className="hero-copy-block max-w-none xl:pr-8 2xl:pr-12">
              <div
                className="mb-7 inline-flex items-center rounded-full border px-4 py-2 text-[0.66rem] font-medium uppercase tracking-[0.24em] sm:text-[0.72rem] lg:text-[0.78rem]"
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.panelStrong,
                  color: theme.softText,
                }}
              >
                {t.enterpriseReady}
              </div>

              <h1 className="hero-headline font-display max-w-[11ch] text-[clamp(3.1rem,5.3vw,7rem)] font-thin leading-[0.93] tracking-[-0.045em]">
                <span className="mb-2 block text-[0.52em] leading-[1.02] opacity-50">
                  {t.heroTitle1}
                </span>
                <span
                  className="hero-gradient-text font-black"
                  style={{
                    backgroundImage: `linear-gradient(var(--hero-gradient-angle, 135deg), ${theme.accent2} 0%, ${theme.accent} 42%, ${resolvedTheme === "light" ? "#8a63ff" : "#efe8ff"} 100%)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    opacity: 1,
                  }}
                >
                  {t.heroTitle2}
                </span>
              </h1>

              <p className="hero-copy mt-6 max-w-3xl text-[0.98rem] leading-7 sm:text-[1.04rem] sm:leading-8 lg:text-[1.12rem] 2xl:text-[1.2rem]" style={{ color: theme.mutedText }}>
                {t.heroDescription}
              </p>

              <p className="mt-6 text-[0.82rem] sm:text-[0.88rem] lg:text-[0.96rem]" style={{ color: theme.softText }}>
                {t.heroExperience}
              </p>

              <div className="hero-cta-row mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="rounded-xl px-6 py-4 text-[0.95rem] font-semibold transition hover:translate-y-[-1px] lg:text-[1rem] 2xl:text-[1.05rem]"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.buttonText,
                    boxShadow: `0 18px 60px ${theme.accentSoft}`,
                  }}
                >
                  {t.bookCall}
                </a>
                <a
                  href="#services"
                  className="px-1 py-4 text-[0.88rem] font-medium transition hover:translate-y-[-1px] lg:text-[0.96rem]"
                  style={{
                    color: theme.secondaryButtonText,
                  }}
                >
                  {t.learnMore}
                </a>
              </div>

              <div
                className="hero-stats mt-14 grid max-w-4xl gap-6 border-t pt-8 sm:grid-cols-3 xl:max-w-none"
                style={{ borderColor: theme.border }}
              >
                {[
                  [t.efficiency, "+65%"],
                  [t.manualWork, "-50%"],
                  [t.scalability, t.high],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div
                      className="text-[0.68rem] uppercase tracking-[0.18em] sm:text-[0.72rem] lg:text-[0.78rem]"
                      style={{ color: theme.softText }}
                    >
                      {label}
                    </div>
                    <div className="mt-2 text-[1.6rem] font-semibold sm:text-[1.8rem] lg:text-[2rem]" style={{ color: theme.accent }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual relative z-0 mx-auto hidden min-h-[560px] w-full max-w-none xl:block xl:min-h-[620px] 2xl:min-h-[720px]">
              <div className="hero-matrix absolute inset-[6%_2%_10%_10%] overflow-hidden rounded-[40px]">
                <div
                  className="hero-matrix-feather hero-matrix-feather--top absolute inset-x-0 top-0 h-[20%]"
                  style={{
                    background: `linear-gradient(to bottom, ${theme.page}, transparent)`,
                  }}
                />
                <div
                  className="hero-matrix-feather hero-matrix-feather--bottom absolute inset-x-0 bottom-0 h-[28%]"
                  style={{
                    background: `linear-gradient(to top, ${theme.page}, transparent)`,
                  }}
                />
                {matrixColumns.map((column, index) => (
                  <div
                    key={column.join("-")}
                    className="hero-matrix-column absolute top-[-20%] flex flex-col gap-2"
                    style={{
                      left: `${2 + index * 5.25}%`,
                      color: matrixColumnColors[index % matrixColumnColors.length],
                      animationDelay: `${index * 0.7}s`,
                      animationDuration: `${matrixColumnDurations[index % matrixColumnDurations.length]}s`,
                      fontSize: `${matrixColumnFontSizes[index % matrixColumnFontSizes.length]}px`,
                      filter: `blur(${matrixColumnBlurs[index % matrixColumnBlurs.length]}px)`,
                      opacity: 0,
                    }}
                  >
                    {Array.from({ length: 7 }).flatMap((_, blockIndex) =>
                      column.map((chunk, chunkIndex) => (
                        <span key={`${blockIndex}-${chunkIndex}`}>{chunk}</span>
                      )),
                    )}
                  </div>
                ))}
              </div>

              <div
                className="absolute right-[4%] top-[4%] h-[74%] w-[74%] rounded-full"
                style={{
                  background: `radial-gradient(circle, ${theme.accentSoft} 0%, transparent 70%)`,
                  opacity: 0.9,
                }}
              />
              <div
                className="absolute right-[15%] top-[12%] h-[57%] w-[57%] rounded-full border"
                style={{ borderColor: theme.border, opacity: 0.2 }}
              />
              <div
                className="absolute right-[10%] top-[8%] h-[66%] w-[66%] rounded-full"
                style={{
                  background: `conic-gradient(from 90deg, transparent 0deg, ${theme.accentSoft} 84deg, transparent 150deg, ${theme.accentSoft} 220deg, transparent 300deg)`,
                  opacity: 0.4,
                  filter: "blur(14px)",
                }}
              />
              <div
                className="absolute right-[20%] top-[18%] h-[47%] w-[47%] rounded-full border"
                style={{ borderColor: theme.border, opacity: 0.16 }}
              />

              <div className="absolute right-[30%] top-[31%]">
                <div
                  className="hero-core-halo absolute inset-[-34px] rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${theme.accentSoft} 0%, transparent 70%)`,
                  }}
                />
                <div
                  className="hero-core relative flex h-[156px] w-[156px] items-center justify-center rounded-full border backdrop-blur-xl"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: theme.panelStrong,
                    boxShadow: `0 30px 120px ${theme.accentSoft}`,
                  }}
                >
                  <div
                    className="hero-core-ring absolute inset-[18px] rounded-full border"
                    style={{ borderColor: theme.border, opacity: 0.35 }}
                  />
                  <div
                    className="hero-core-ring hero-core-ring--reverse absolute inset-[34px] rounded-full border"
                    style={{ borderColor: theme.border, opacity: 0.2 }}
                  />
                  <div
                    className="hero-core-logo absolute inset-[28px] flex items-center justify-center rounded-full"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12) 0%, ${theme.accentSoft} 58%, transparent 100%)`,
                      boxShadow: `inset 0 0 40px ${theme.accentSoft}`,
                    }}
                  >
                    <Logo
                      className="h-14 w-14 2xl:h-16 2xl:w-16"
                      themeName={resolvedTheme === "dark" ? "light" : "dark"}
                    />
                  </div>
                </div>
              </div>

              <div
                className="hero-digit-orbit absolute right-[11%] top-[12%] h-[62%] w-[62%] rounded-full border"
                style={{ borderColor: theme.border, opacity: 0.22 }}
              >
                <div
                  className="hero-digit-badge absolute left-1/2 top-[-18px] flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border text-lg font-semibold"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: theme.panelStrong,
                    color: theme.accent,
                    boxShadow: `0 0 28px ${theme.accentSoft}`,
                  }}
                >
                  3
                </div>
              </div>

              <div
                className="hero-atom-orbit hero-atom-orbit--a absolute right-[18%] top-[17%] h-[54%] w-[54%] rounded-full border"
                style={{
                  borderColor: theme.border,
                  boxShadow: `0 0 40px ${theme.accentSoft}`,
                }}
              >
                <div
                  className="hero-electron absolute left-1/2 top-[-7px] h-3.5 w-3.5 -translate-x-1/2 rounded-full"
                  style={{
                    backgroundColor: theme.accent,
                    boxShadow: `0 0 16px ${theme.accent}`,
                  }}
                />
              </div>
              <div
                className="hero-atom-orbit hero-atom-orbit--b absolute right-[13%] top-[14%] h-[60%] w-[47%] rounded-full border"
                style={{
                  borderColor: theme.border,
                  opacity: 0.75,
                }}
              >
                <div
                  className="hero-electron hero-electron--alt absolute left-1/2 top-[-6px] h-3 w-3 -translate-x-1/2 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.92)",
                    boxShadow: `0 0 14px ${theme.accentSoft}`,
                  }}
                />
              </div>
              <div
                className="hero-atom-orbit hero-atom-orbit--c absolute right-[20%] top-[20%] h-[50%] w-[57%] rounded-full border"
                style={{
                  borderColor: theme.border,
                  opacity: 0.68,
                }}
              >
                <div
                  className="hero-electron absolute left-1/2 top-[-6px] h-2.5 w-2.5 -translate-x-1/2 rounded-full"
                  style={{
                    backgroundColor: theme.accent2,
                    boxShadow: `0 0 14px ${theme.accent2}`,
                  }}
                />
              </div>

              {[
                "right-[40%] top-[10%]",
                "right-[12%] top-[26%]",
                "right-[52%] top-[46%]",
                "right-[18%] top-[67%]",
                "right-[44%] top-[77%]",
              ].map((className, index) => (
                <div
                  key={className}
                  className={`hero-satellite absolute ${className} rounded-full border`}
                  style={{
                    height: index % 2 === 0 ? "12px" : "8px",
                    width: index % 2 === 0 ? "12px" : "8px",
                    borderColor: theme.border,
                    backgroundColor: index % 2 === 0 ? theme.accentSoft : "rgba(255,255,255,0.72)",
                    boxShadow: `0 0 20px ${theme.accentSoft}`,
                    animationDelay: `${index * 900}ms`,
                  }}
                />
              ))}

              <div
                className="hero-signal hero-signal--a absolute right-[36%] top-[22%] h-[22%] w-[22%] rounded-full border"
                style={{ borderColor: theme.border }}
              />
              <div
                className="hero-signal hero-signal--b absolute right-[25%] top-[48%] h-[30%] w-[30%] rounded-full border"
                style={{ borderColor: theme.border, animationDelay: "1.2s" }}
              />
              <div
                className="hero-signal hero-signal--c absolute right-[16%] top-[26%] h-[39%] w-[39%] rounded-full border"
                style={{ borderColor: theme.border, animationDelay: "2.1s" }}
              />
            </div>

          </div>
        </div>
      </RevealBlock>
  );
}
