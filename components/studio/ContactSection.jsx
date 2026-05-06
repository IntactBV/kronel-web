"use client";
import React from 'react';
import Image from 'next/image';
import RevealBlock from '../ui/RevealBlock';
import Logo from '../ui/Logo';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import ContactShortcut from '../ui/ContactShortcut';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function ContactSection({ theme, t, resolvedTheme, language, setLanguage, mode, cycleTheme, sectionShell, sectionTitleClass, sectionIntroClass, sectionEyebrowStyle, panelShellStyle, panelTopLineStyle, chipStyle, iconTileStyle, inputSurfaceStyle, brandLogoClass, contactLogoClass, footerLogoClass, isContactFormOpen, setIsContactFormOpen, contactFormRef, handleContactFieldChange, contactForm, messageTextareaRef, handleContactSubmit, isSubmittingContact, isCaptchaLoading, captchaChallenge, captchaLoadError, loadCaptchaChallenge, contactStatus, contactUi, matrixColumns, matrixColumnColors, matrixColumnDurations, matrixColumnFontSizes, matrixColumnBlurs, outcomeLongCopy }) {
  return (
    <RevealBlock
        id="contact"
        variant="blur-in"
        className={`${sectionShell} border-t`}
        style={{ borderColor: theme.border }}
      >
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(24rem,0.9fr)] xl:items-start">
          <div className="max-w-4xl">
            <div className="mb-5 flex items-center gap-3">
              <Logo className={contactLogoClass} themeName={theme.logoTheme} />
              <div className="text-[0.72rem] tracking-[0.24em] sm:text-[0.78rem] lg:text-[0.88rem]" style={{ color: theme.softText }}>
                {t.contactEyebrow}
              </div>
            </div>

            <h2 className="font-display mt-1 text-[1.95rem] font-bold sm:text-[2.2rem] lg:text-[2.7rem]">{t.contactTitle}</h2>

            <p className="mt-5 max-w-2xl text-[0.98rem] leading-7 sm:text-[1.03rem] lg:text-[1.08rem] lg:leading-8" style={{ color: theme.mutedText }}>
              {t.contactDescription}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setContactStatus({ type: "idle", message: "" });
                  setIsContactFormOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-4 text-[0.95rem] font-semibold transition hover:translate-y-[-1px] lg:text-[1rem]"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.buttonText,
                  boxShadow: `0 18px 60px ${theme.accentSoft}`,
                }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 3 10 14" />
                  <path d="m21 3-7 18-4-7-7-4 18-7Z" />
                </svg>
                {contactUi.open}
              </button>
              <a
                href="mailto:sales@kronel.io"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-4 text-[0.95rem] font-semibold transition hover:translate-y-[-1px] lg:text-[1rem]"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.buttonText,
                  boxShadow: `0 18px 60px ${theme.accentSoft}`,
                }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
                  <path d="m5.5 7 6.5 5 6.5-5" />
                </svg>
                sales@kronel.io
              </a>
            </div>

            {!isContactFormOpen && contactStatus.message ? (
              <div
                className="mt-5 max-w-2xl rounded-[1.4rem] border px-5 py-4 text-[0.92rem] leading-7"
                style={{
                  borderColor: contactStatus.type === "error" ? "rgba(255,139,139,0.35)" : theme.border,
                  backgroundColor: contactStatus.type === "error" ? "rgba(255,139,139,0.08)" : theme.panelStrong,
                  color: contactStatus.type === "error" ? "#ff8b8b" : theme.text,
                }}
              >
                {contactStatus.message}
              </div>
            ) : null}
          </div>

          {isContactFormOpen ? (
            <form
              ref={contactFormRef}
              onSubmit={handleContactSubmit}
              className="rounded-[2rem] border p-6 lg:p-7"
              style={panelShellStyle(theme.accentSoft)}
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className="inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em]"
                  style={chipStyle}
                >
                  {contactUi.title}
                </div>

                <button
                  type="button"
                  aria-label="Close form"
                  onClick={() => {
                    if (contactCollapseTimeoutRef.current) {
                      window.clearTimeout(contactCollapseTimeoutRef.current);
                    }
                    setCaptchaLoadError("");
                    setIsContactFormOpen(false);
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition hover:translate-y-[-1px]"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: theme.panel,
                    color: theme.secondaryButtonText,
                  }}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 6 18 18" />
                    <path d="M18 6 6 18" />
                  </svg>
                </button>
              </div>

              <p className="mt-4 text-[0.94rem] leading-7 lg:text-[0.98rem]" style={{ color: theme.mutedText }}>
                {contactUi.description}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-[0.78rem] uppercase tracking-[0.16em]" style={{ color: theme.softText }}>
                  <span>{contactUi.name}</span>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={handleContactFieldChange("name")}
                    required
                    className="rounded-2xl border px-4 py-3 text-[0.96rem] outline-none transition"
                    style={inputSurfaceStyle}
                  />
                </label>

                <label className="flex flex-col gap-2 text-[0.78rem] uppercase tracking-[0.16em]" style={{ color: theme.softText }}>
                  <span>{contactUi.email}</span>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={handleContactFieldChange("email")}
                    required
                    className="rounded-2xl border px-4 py-3 text-[0.96rem] outline-none transition"
                    style={inputSurfaceStyle}
                  />
                </label>
              </div>

              <label className="mt-4 flex flex-col gap-2 text-[0.78rem] uppercase tracking-[0.16em]" style={{ color: theme.softText }}>
                <span>{contactUi.company}</span>
                <input
                  type="text"
                  value={contactForm.company}
                  onChange={handleContactFieldChange("company")}
                  className="rounded-2xl border px-4 py-3 text-[0.96rem] outline-none transition"
                  style={inputSurfaceStyle}
                />
              </label>

              <label className="mt-4 flex flex-col gap-2 text-[0.78rem] uppercase tracking-[0.16em]" style={{ color: theme.softText }}>
                <span>{contactUi.message}</span>
                <textarea
                  ref={messageTextareaRef}
                  value={contactForm.message}
                  onChange={handleContactFieldChange("message")}
                  required
                  rows={1}
                  className="resize-none overflow-hidden rounded-2xl border px-4 py-3 text-[0.96rem] outline-none transition"
                  style={{
                    minHeight: "10rem",
                    overflowY: "hidden",
                    scrollbarWidth: "none",
                    ...inputSurfaceStyle,
                  }}
                />
              </label>

              <div
                aria-hidden="true"
                className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="studio-website-field">Website</label>
                <input
                  id="studio-website-field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={contactForm.website}
                  onChange={handleContactFieldChange("website")}
                />
              </div>

              <div
                className="mt-4 rounded-[1.5rem] border p-4"
                style={panelShellStyle("rgba(0,0,0,0.08)")}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="text-[0.78rem] uppercase tracking-[0.16em]" style={{ color: theme.softText }}>
                      {contactUi.captcha}
                    </div>
                    <p className="mt-2 text-[0.82rem] leading-6" style={{ color: theme.mutedText }}>
                      {contactUi.captchaHint}
                    </p>
                    <p className="mt-2 text-[0.96rem] leading-7" style={{ color: theme.text }}>
                      {isCaptchaLoading ? contactUi.captchaLoading : captchaChallenge.prompt || contactUi.captchaError}
                    </p>
                    {captchaLoadError ? (
                      <p className="mt-2 text-[0.84rem] leading-6" style={{ color: "#ff8b8b" }}>
                        {captchaLoadError}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={loadCaptchaChallenge}
                    disabled={isCaptchaLoading}
                    className="inline-flex items-center justify-center rounded-xl border px-4 py-3 text-[0.82rem] font-medium transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.panel,
                      color: theme.secondaryButtonText,
                    }}
                  >
                    {contactUi.captchaRefresh}
                  </button>
                </div>

                <label className="mt-4 flex flex-col gap-2 text-[0.78rem] uppercase tracking-[0.16em]" style={{ color: theme.softText }}>
                  <span>{contactUi.captcha}</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={contactForm.captchaAnswer}
                    onChange={handleContactFieldChange("captchaAnswer")}
                    required
                    placeholder={contactUi.captchaPlaceholder}
                    className="rounded-2xl border px-4 py-3 text-[0.96rem] outline-none transition"
                    style={inputSurfaceStyle}
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={isSubmittingContact || isCaptchaLoading || !captchaChallenge.token}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-[0.95rem] font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.buttonText,
                    }}
                  >
                    {isSubmittingContact ? (
                      <>
                        <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none">
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2.4" />
                          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                        </svg>
                        {contactUi.sending}
                      </>
                    ) : (
                      contactUi.submit
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (contactCollapseTimeoutRef.current) {
                        window.clearTimeout(contactCollapseTimeoutRef.current);
                      }
                      setCaptchaLoadError("");
                      setIsContactFormOpen(false);
                    }}
                    className="inline-flex items-center justify-center rounded-xl border px-5 py-4 text-[0.9rem] font-medium transition hover:translate-y-[-1px]"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.panelStrong,
                      color: theme.secondaryButtonText,
                    }}
                  >
                    {contactUi.cancel}
                  </button>
                </div>

                {contactStatus.message ? (
                  <div
                    className="max-w-[24rem] rounded-[1.2rem] border px-4 py-3 text-[0.84rem] leading-6"
                    style={{
                      borderColor: contactStatus.type === "error" ? "rgba(255,139,139,0.35)" : theme.border,
                      backgroundColor: contactStatus.type === "error" ? "rgba(255,139,139,0.08)" : theme.panelStrong,
                      color: contactStatus.type === "error" ? "#ff8b8b" : theme.text,
                    }}
                  >
                    {contactStatus.message}
                  </div>
                ) : null}
              </div>
            </form>
          ) : (
            <div
              className="xl:ml-auto xl:max-w-[30rem] xl:text-right"
            >
              <div
                className="inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em]"
                style={chipStyle}
              >
                {contactUi.title}
              </div>

              <h3 className="font-display mt-5 text-[1.5rem] font-semibold sm:text-[1.7rem] lg:text-[1.95rem]" style={{ color: theme.text }}>
                {contactUi.teaserTitle}
              </h3>

              <p className="mt-4 text-[0.96rem] leading-7 lg:text-[1rem]" style={{ color: theme.mutedText }}>
                {contactUi.teaserText}
              </p>

              <div className="mt-8 xl:flex xl:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setContactStatus({ type: "idle", message: "" });
                    setIsContactFormOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-[0.95rem] font-semibold transition hover:translate-y-[-1px]"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.buttonText,
                    boxShadow: `0 18px 60px ${theme.accentSoft}`,
                  }}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 3 10 14" />
                    <path d="m21 3-7 18-4-7-7-4 18-7Z" />
                  </svg>
                  {contactUi.open}
                </button>
              </div>

              {contactStatus.message ? (
                <div
                  className="mt-4 text-[0.88rem] leading-7 xl:ml-auto xl:max-w-[26rem]"
                  style={{ color: contactStatus.type === "error" ? "#ff8b8b" : theme.mutedText }}
                >
                  {contactStatus.message}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </RevealBlock>
  );
}
