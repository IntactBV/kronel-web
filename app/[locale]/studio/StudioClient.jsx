import HeroSection from "../../../components/studio/HeroSection";\nimport VisionSection from "../../../components/studio/VisionSection";\nimport EngineeringSection from "../../../components/studio/EngineeringSection";\nimport MobileSection from "../../../components/studio/MobileSection";\nimport WebsiteSection from "../../../components/studio/WebsiteSection";\nimport InternalToolsSection from "../../../components/studio/InternalToolsSection";\nimport ProcessSection from "../../../components/studio/ProcessSection";\nimport OutcomesSection from "../../../components/studio/OutcomesSection";\nimport ContactSection from "../../../components/studio/ContactSection";\nimport FooterSection from "../../../components/studio/FooterSection";\n\n"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import languageSettings from "./languages.json";

/* Ultra high-conversion enterprise landing for studio.kronel.io */

import { 
  PRIMARY, SECONDARY, THEME_ORDER, LANGUAGES, DEFAULT_LANGUAGE, 
  STORAGE_KEYS, LANGUAGE_LABELS, ROMANIAN_LANGUAGE_CODE, 
  ROMANIA_COUNTRY_CODE, ROMANIA_TIME_ZONE, getCookieValue, 
  getDetectedDefaultLanguage, OUTCOME_LONG_COPY, CONTACT_FORM_COPY, 
  translations, themeMap 
} from "../../../data/studio-data";
import Logo from "../../../components/ui/Logo";
import ThemeSwitcher from "../../../components/ui/ThemeSwitcher";
import ContactShortcut from "../../../components/ui/ContactShortcut";
import LanguageSwitcher from "../../../components/ui/LanguageSwitcher";
import RevealBlock from "../../../components/ui/RevealBlock";

export default function StudioClient({ initialLocale }) {
  const [mode, setMode] = useState("system");
  const [systemTheme, setSystemTheme] = useState("dark");
  const [language, setLanguage] = useState(initialLocale || DEFAULT_LANGUAGE);
  const [hasLoadedPreferences, setHasLoadedPreferences] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    captchaAnswer: "",
    website: "",
  });
  const [contactStatus, setContactStatus] = useState({ type: "idle", message: "" });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [captchaChallenge, setCaptchaChallenge] = useState({ prompt: "", token: "" });
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const [captchaLoadError, setCaptchaLoadError] = useState("");
  const messageTextareaRef = useRef(null);
  const contactFormRef = useRef(null);
  const contactCollapseTimeoutRef = useRef(null);
  const [matrixColumns, setMatrixColumns] = useState(() => [
    ["01001011", "KRONEL", "001101", "SYS_03", "11001010", "FLOW", "VECTOR", "ATOM", "RING_3", "010111"],
    ["BUILD", "101001", "CORE", "011011", "ATOM", "001110", "MESH", "TRACE", "110010", "FIELD"],
    ["NODE_3", "010101", "VECTOR", "111000", "PULSE", "010011", "SIGNAL", "001101", "STACK", "FLUX"],
    ["SIGNAL", "110101", "KRNL", "001111", "MESH", "101100", "GRID", "FLOW", "001010", "ORBIT"],
    ["DATA", "001101", "ORBIT", "010110", "FIELD", "111001", "KRONEL", "101011", "CORE", "SYNC"],
    ["STACK", "101010", "SYNC", "000111", "TRACE", "110010", "PULSE", "011100", "BUILD", "ATOM"],
    ["GRID", "011100", "LOGIC", "101011", "FLUX", "001010", "SYS_03", "110001", "RING", "VECTOR"],
    ["ATOM", "111000", "RING_3", "010101", "CODE", "100110", "SIGNAL", "001111", "KRNL", "FLOW"],
    ["VECTOR", "011101", "KRONEL", "100011", "PULSE", "001100", "STACK", "111010", "NODE", "CORE"],
    ["SYNC", "101110", "FIELD", "010011", "GRID", "111001", "TRACE", "001101", "ATOM", "FLOW"],
    ["MATRIX", "010111", "RING", "110100", "SYS_03", "001010", "BUILD", "101101", "FLUX", "SIGNAL"],
    ["CODE", "111010", "ORBIT", "010101", "LOGIC", "100111", "MESH", "001110", "DATA", "KRNL"],
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const storedMode = window.localStorage.getItem(STORAGE_KEYS.mode);
    const storedLanguage = window.localStorage.getItem(STORAGE_KEYS.language);

    if (storedMode && THEME_ORDER.includes(storedMode)) {
      setMode(storedMode);
    }

    if (storedLanguage && LANGUAGES.includes(storedLanguage)) {
      setLanguage(storedLanguage);
    } else {
      /* detection moved to middleware */
    }

    setHasLoadedPreferences(true);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => setSystemTheme(media.matches ? "dark" : "light");

    syncTheme();
    media.addEventListener("change", syncTheme);
    return () => media.removeEventListener("change", syncTheme);
  }, []);

  useEffect(() => {
    if (!hasLoadedPreferences) return;
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.mode, mode);
  }, [hasLoadedPreferences, mode]);

  useEffect(() => {
    if (!hasLoadedPreferences) return;
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.language, language);
  }, [hasLoadedPreferences, language]);

  const resolvedTheme = mode === "system" ? systemTheme : mode;
  const theme = useMemo(() => themeMap[resolvedTheme], [resolvedTheme]);
  const t = translations[language] ?? translations.en;
  const contactUi = CONTACT_FORM_COPY[language] ?? CONTACT_FORM_COPY.en;
  const outcomeLongCopy = OUTCOME_LONG_COPY[language] ?? OUTCOME_LONG_COPY.en;
  const matrixColumnColors = useMemo(
    () => [
      "rgba(122,60,255,0.52)",
      "rgba(95,36,230,0.34)",
      "rgba(163,120,255,0.42)",
      "rgba(138,86,255,0.3)",
      "rgba(109,54,238,0.48)",
      "rgba(186,154,255,0.28)",
      "rgba(122,60,255,0.38)",
      "rgba(149,102,255,0.33)",
      "rgba(111,70,238,0.4)",
      "rgba(172,132,255,0.26)",
      "rgba(126,74,255,0.36)",
      "rgba(152,110,255,0.31)",
    ],
    [],
  );
  const matrixColumnDurations = useMemo(() => [24.8, 29.4, 26.6, 32.8, 28.2, 31.4, 27.1, 33.6, 25.9, 30.2, 32.1, 28.8], []);
  const matrixColumnFontSizes = useMemo(() => [7, 9, 11, 8, 14, 10, 12, 13, 8, 10, 12, 9], []);
  const matrixColumnBlurs = useMemo(() => [0, 0.35, 0.8, 0.2, 1.1, 0.55, 0.15, 0.9, 0.45, 1.2, 0.25, 0.7], []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setMatrixColumns((current) => {
        const index = Math.floor(Math.random() * current.length);
        return current.map((column, columnIndex) => {
          if (columnIndex !== index || column.length < 2) return column;
          const [first, ...rest] = column;
          return [...rest, first];
        });
      });
    }, 1900);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isContactFormOpen || !messageTextareaRef.current) return;
    messageTextareaRef.current.style.height = "0px";
    messageTextareaRef.current.style.height = `${messageTextareaRef.current.scrollHeight}px`;
  }, [isContactFormOpen, contactForm.message]);

  useEffect(() => {
    if (!isContactFormOpen || typeof window === "undefined" || window.innerWidth >= 1280 || !contactFormRef.current) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      contactFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [isContactFormOpen]);

  useEffect(() => {
    return () => {
      if (contactCollapseTimeoutRef.current) {
        window.clearTimeout(contactCollapseTimeoutRef.current);
      }
    };
  }, []);

  const cycleTheme = () => {
    const currentIndex = THEME_ORDER.indexOf(mode);
    const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
    setMode(THEME_ORDER[nextIndex]);
  };

  const handleContactFieldChange = (field) => (event) => {
    const value = event.target.value;

    if (field === "message") {
      event.target.style.height = "0px";
      event.target.style.height = `${event.target.scrollHeight}px`;
    }

    setContactForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const loadCaptchaChallenge = async () => {
    setIsCaptchaLoading(true);
    setCaptchaLoadError("");
    setContactForm((current) => ({
      ...current,
      captchaAnswer: "",
    }));

    try {
      const response = await fetch("/api/contact-messages", {
        method: "GET",
        cache: "no-store",
      });
      const payload = await response.json();

      if (!response.ok || !payload?.prompt || !payload?.token) {
        throw new Error(contactUi.captchaError);
      }

      setCaptchaChallenge({
        prompt: payload.prompt,
        token: payload.token,
      });
    } catch (error) {
      setCaptchaChallenge({ prompt: "", token: "" });
      setCaptchaLoadError(error instanceof Error ? error.message : contactUi.captchaError);
    } finally {
      setIsCaptchaLoading(false);
    }
  };

  useEffect(() => {
    if (!isContactFormOpen) return;
    loadCaptchaChallenge();
  }, [isContactFormOpen]);

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    if (contactCollapseTimeoutRef.current) {
      window.clearTimeout(contactCollapseTimeoutRef.current);
    }
    setIsSubmittingContact(true);
    setContactStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...contactForm,
          captchaToken: captchaChallenge.token,
          language,
          page: "studio",
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || contactUi.error);
      }

      setContactForm({
        name: "",
        email: "",
        company: "",
        message: "",
        captchaAnswer: "",
        website: "",
      });
      setContactStatus({ type: "success", message: contactUi.success });
      setCaptchaChallenge({ prompt: "", token: "" });
      contactCollapseTimeoutRef.current = window.setTimeout(() => {
        setIsContactFormOpen(false);
      }, 2600);
    } catch (error) {
      setContactStatus({
        type: "error",
        message: error instanceof Error ? error.message : contactUi.error,
      });
      setContactForm((current) => ({
        ...current,
        captchaAnswer: "",
      }));
      setCaptchaChallenge({ prompt: "", token: "" });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const sectionShell = "w-full px-[clamp(1.25rem,4vw,6rem)] py-22 sm:py-24 lg:py-26 xl:px-[clamp(3rem,5vw,7.5rem)] xl:py-30 2xl:px-[clamp(4rem,6vw,10rem)]";
  const brandLogoClass = "h-9 w-9 sm:h-10 sm:w-10 lg:h-[4.75rem] lg:w-[4.75rem] 2xl:h-[5.5rem] 2xl:w-[5.5rem]";
  const contactLogoClass = "h-10 w-10 sm:h-11 sm:w-11 lg:h-[5.25rem] lg:w-[5.25rem]";
  const footerLogoClass = "h-5 w-5 sm:h-6 sm:w-6 lg:h-[2.625rem] lg:w-[2.625rem]";
  const sectionTitleClass = "font-display mt-4 max-w-[11ch] text-[1.95rem] font-bold leading-[1.03] sm:text-[2.2rem] lg:text-[2.7rem]";
  const sectionIntroClass = "max-w-3xl text-[0.98rem] leading-7 sm:text-[1.03rem] lg:text-[1.08rem] lg:leading-8";
  const sectionEyebrowStyle = {
    borderColor: theme.border,
    backgroundColor: theme.panelStrong,
    color: theme.softText,
  };
  const panelShellStyle = (glow = "rgba(0,0,0,0.12)") => ({
    borderColor: theme.border,
    background: `linear-gradient(180deg, ${theme.panelStrong} 0%, ${theme.panel} 100%)`,
    boxShadow: `0 24px 80px ${glow}`,
  });
  const panelTopLineStyle = {
    background: `linear-gradient(90deg, transparent 0%, ${theme.accent} 50%, transparent 100%)`,
    opacity: 0.86,
  };
  const chipStyle = {
    backgroundColor: theme.panelStrong,
    color: theme.softText,
  };
  const iconTileStyle = {
    borderColor: theme.border,
    backgroundColor: theme.panelStrong,
    color: theme.accent,
  };
  const inputSurfaceStyle = {
    borderColor: theme.border,
    backgroundColor: theme.panel,
    color: theme.text,
  };

  return (
    <div
      className="studio-page min-h-screen overflow-x-hidden transition-colors duration-300"
      style={{
        backgroundColor: theme.page,
        color: theme.text,
      }}
    >
      <HeroSection theme={theme} t={t} resolvedTheme={resolvedTheme} language={language} setLanguage={setLanguage} mode={mode} cycleTheme={cycleTheme} sectionShell={sectionShell} sectionTitleClass={sectionTitleClass} sectionIntroClass={sectionIntroClass} sectionEyebrowStyle={sectionEyebrowStyle} panelShellStyle={panelShellStyle} panelTopLineStyle={panelTopLineStyle} chipStyle={chipStyle} iconTileStyle={iconTileStyle} inputSurfaceStyle={inputSurfaceStyle} brandLogoClass={brandLogoClass} contactLogoClass={contactLogoClass} footerLogoClass={footerLogoClass} isContactFormOpen={isContactFormOpen} setIsContactFormOpen={setIsContactFormOpen} contactFormRef={contactFormRef} handleContactFieldChange={handleContactFieldChange} contactForm={contactForm} messageTextareaRef={messageTextareaRef} handleContactSubmit={handleContactSubmit} isSubmittingContact={isSubmittingContact} isCaptchaLoading={isCaptchaLoading} captchaChallenge={captchaChallenge} captchaLoadError={captchaLoadError} loadCaptchaChallenge={loadCaptchaChallenge} contactStatus={contactStatus} contactUi={contactUi} matrixColumns={matrixColumns} matrixColumnColors={matrixColumnColors} matrixColumnDurations={matrixColumnDurations} matrixColumnFontSizes={matrixColumnFontSizes} matrixColumnBlurs={matrixColumnBlurs} outcomeLongCopy={outcomeLongCopy} />

      <VisionSection theme={theme} t={t} resolvedTheme={resolvedTheme} language={language} setLanguage={setLanguage} mode={mode} cycleTheme={cycleTheme} sectionShell={sectionShell} sectionTitleClass={sectionTitleClass} sectionIntroClass={sectionIntroClass} sectionEyebrowStyle={sectionEyebrowStyle} panelShellStyle={panelShellStyle} panelTopLineStyle={panelTopLineStyle} chipStyle={chipStyle} iconTileStyle={iconTileStyle} inputSurfaceStyle={inputSurfaceStyle} brandLogoClass={brandLogoClass} contactLogoClass={contactLogoClass} footerLogoClass={footerLogoClass} isContactFormOpen={isContactFormOpen} setIsContactFormOpen={setIsContactFormOpen} contactFormRef={contactFormRef} handleContactFieldChange={handleContactFieldChange} contactForm={contactForm} messageTextareaRef={messageTextareaRef} handleContactSubmit={handleContactSubmit} isSubmittingContact={isSubmittingContact} isCaptchaLoading={isCaptchaLoading} captchaChallenge={captchaChallenge} captchaLoadError={captchaLoadError} loadCaptchaChallenge={loadCaptchaChallenge} contactStatus={contactStatus} contactUi={contactUi} matrixColumns={matrixColumns} matrixColumnColors={matrixColumnColors} matrixColumnDurations={matrixColumnDurations} matrixColumnFontSizes={matrixColumnFontSizes} matrixColumnBlurs={matrixColumnBlurs} outcomeLongCopy={outcomeLongCopy} />

      <EngineeringSection theme={theme} t={t} resolvedTheme={resolvedTheme} language={language} setLanguage={setLanguage} mode={mode} cycleTheme={cycleTheme} sectionShell={sectionShell} sectionTitleClass={sectionTitleClass} sectionIntroClass={sectionIntroClass} sectionEyebrowStyle={sectionEyebrowStyle} panelShellStyle={panelShellStyle} panelTopLineStyle={panelTopLineStyle} chipStyle={chipStyle} iconTileStyle={iconTileStyle} inputSurfaceStyle={inputSurfaceStyle} brandLogoClass={brandLogoClass} contactLogoClass={contactLogoClass} footerLogoClass={footerLogoClass} isContactFormOpen={isContactFormOpen} setIsContactFormOpen={setIsContactFormOpen} contactFormRef={contactFormRef} handleContactFieldChange={handleContactFieldChange} contactForm={contactForm} messageTextareaRef={messageTextareaRef} handleContactSubmit={handleContactSubmit} isSubmittingContact={isSubmittingContact} isCaptchaLoading={isCaptchaLoading} captchaChallenge={captchaChallenge} captchaLoadError={captchaLoadError} loadCaptchaChallenge={loadCaptchaChallenge} contactStatus={contactStatus} contactUi={contactUi} matrixColumns={matrixColumns} matrixColumnColors={matrixColumnColors} matrixColumnDurations={matrixColumnDurations} matrixColumnFontSizes={matrixColumnFontSizes} matrixColumnBlurs={matrixColumnBlurs} outcomeLongCopy={outcomeLongCopy} />

      <MobileSection theme={theme} t={t} resolvedTheme={resolvedTheme} language={language} setLanguage={setLanguage} mode={mode} cycleTheme={cycleTheme} sectionShell={sectionShell} sectionTitleClass={sectionTitleClass} sectionIntroClass={sectionIntroClass} sectionEyebrowStyle={sectionEyebrowStyle} panelShellStyle={panelShellStyle} panelTopLineStyle={panelTopLineStyle} chipStyle={chipStyle} iconTileStyle={iconTileStyle} inputSurfaceStyle={inputSurfaceStyle} brandLogoClass={brandLogoClass} contactLogoClass={contactLogoClass} footerLogoClass={footerLogoClass} isContactFormOpen={isContactFormOpen} setIsContactFormOpen={setIsContactFormOpen} contactFormRef={contactFormRef} handleContactFieldChange={handleContactFieldChange} contactForm={contactForm} messageTextareaRef={messageTextareaRef} handleContactSubmit={handleContactSubmit} isSubmittingContact={isSubmittingContact} isCaptchaLoading={isCaptchaLoading} captchaChallenge={captchaChallenge} captchaLoadError={captchaLoadError} loadCaptchaChallenge={loadCaptchaChallenge} contactStatus={contactStatus} contactUi={contactUi} matrixColumns={matrixColumns} matrixColumnColors={matrixColumnColors} matrixColumnDurations={matrixColumnDurations} matrixColumnFontSizes={matrixColumnFontSizes} matrixColumnBlurs={matrixColumnBlurs} outcomeLongCopy={outcomeLongCopy} />

      <WebsiteSection theme={theme} t={t} resolvedTheme={resolvedTheme} language={language} setLanguage={setLanguage} mode={mode} cycleTheme={cycleTheme} sectionShell={sectionShell} sectionTitleClass={sectionTitleClass} sectionIntroClass={sectionIntroClass} sectionEyebrowStyle={sectionEyebrowStyle} panelShellStyle={panelShellStyle} panelTopLineStyle={panelTopLineStyle} chipStyle={chipStyle} iconTileStyle={iconTileStyle} inputSurfaceStyle={inputSurfaceStyle} brandLogoClass={brandLogoClass} contactLogoClass={contactLogoClass} footerLogoClass={footerLogoClass} isContactFormOpen={isContactFormOpen} setIsContactFormOpen={setIsContactFormOpen} contactFormRef={contactFormRef} handleContactFieldChange={handleContactFieldChange} contactForm={contactForm} messageTextareaRef={messageTextareaRef} handleContactSubmit={handleContactSubmit} isSubmittingContact={isSubmittingContact} isCaptchaLoading={isCaptchaLoading} captchaChallenge={captchaChallenge} captchaLoadError={captchaLoadError} loadCaptchaChallenge={loadCaptchaChallenge} contactStatus={contactStatus} contactUi={contactUi} matrixColumns={matrixColumns} matrixColumnColors={matrixColumnColors} matrixColumnDurations={matrixColumnDurations} matrixColumnFontSizes={matrixColumnFontSizes} matrixColumnBlurs={matrixColumnBlurs} outcomeLongCopy={outcomeLongCopy} />

      <InternalToolsSection theme={theme} t={t} resolvedTheme={resolvedTheme} language={language} setLanguage={setLanguage} mode={mode} cycleTheme={cycleTheme} sectionShell={sectionShell} sectionTitleClass={sectionTitleClass} sectionIntroClass={sectionIntroClass} sectionEyebrowStyle={sectionEyebrowStyle} panelShellStyle={panelShellStyle} panelTopLineStyle={panelTopLineStyle} chipStyle={chipStyle} iconTileStyle={iconTileStyle} inputSurfaceStyle={inputSurfaceStyle} brandLogoClass={brandLogoClass} contactLogoClass={contactLogoClass} footerLogoClass={footerLogoClass} isContactFormOpen={isContactFormOpen} setIsContactFormOpen={setIsContactFormOpen} contactFormRef={contactFormRef} handleContactFieldChange={handleContactFieldChange} contactForm={contactForm} messageTextareaRef={messageTextareaRef} handleContactSubmit={handleContactSubmit} isSubmittingContact={isSubmittingContact} isCaptchaLoading={isCaptchaLoading} captchaChallenge={captchaChallenge} captchaLoadError={captchaLoadError} loadCaptchaChallenge={loadCaptchaChallenge} contactStatus={contactStatus} contactUi={contactUi} matrixColumns={matrixColumns} matrixColumnColors={matrixColumnColors} matrixColumnDurations={matrixColumnDurations} matrixColumnFontSizes={matrixColumnFontSizes} matrixColumnBlurs={matrixColumnBlurs} outcomeLongCopy={outcomeLongCopy} />

      <ProcessSection theme={theme} t={t} resolvedTheme={resolvedTheme} language={language} setLanguage={setLanguage} mode={mode} cycleTheme={cycleTheme} sectionShell={sectionShell} sectionTitleClass={sectionTitleClass} sectionIntroClass={sectionIntroClass} sectionEyebrowStyle={sectionEyebrowStyle} panelShellStyle={panelShellStyle} panelTopLineStyle={panelTopLineStyle} chipStyle={chipStyle} iconTileStyle={iconTileStyle} inputSurfaceStyle={inputSurfaceStyle} brandLogoClass={brandLogoClass} contactLogoClass={contactLogoClass} footerLogoClass={footerLogoClass} isContactFormOpen={isContactFormOpen} setIsContactFormOpen={setIsContactFormOpen} contactFormRef={contactFormRef} handleContactFieldChange={handleContactFieldChange} contactForm={contactForm} messageTextareaRef={messageTextareaRef} handleContactSubmit={handleContactSubmit} isSubmittingContact={isSubmittingContact} isCaptchaLoading={isCaptchaLoading} captchaChallenge={captchaChallenge} captchaLoadError={captchaLoadError} loadCaptchaChallenge={loadCaptchaChallenge} contactStatus={contactStatus} contactUi={contactUi} matrixColumns={matrixColumns} matrixColumnColors={matrixColumnColors} matrixColumnDurations={matrixColumnDurations} matrixColumnFontSizes={matrixColumnFontSizes} matrixColumnBlurs={matrixColumnBlurs} outcomeLongCopy={outcomeLongCopy} />

      <OutcomesSection theme={theme} t={t} resolvedTheme={resolvedTheme} language={language} setLanguage={setLanguage} mode={mode} cycleTheme={cycleTheme} sectionShell={sectionShell} sectionTitleClass={sectionTitleClass} sectionIntroClass={sectionIntroClass} sectionEyebrowStyle={sectionEyebrowStyle} panelShellStyle={panelShellStyle} panelTopLineStyle={panelTopLineStyle} chipStyle={chipStyle} iconTileStyle={iconTileStyle} inputSurfaceStyle={inputSurfaceStyle} brandLogoClass={brandLogoClass} contactLogoClass={contactLogoClass} footerLogoClass={footerLogoClass} isContactFormOpen={isContactFormOpen} setIsContactFormOpen={setIsContactFormOpen} contactFormRef={contactFormRef} handleContactFieldChange={handleContactFieldChange} contactForm={contactForm} messageTextareaRef={messageTextareaRef} handleContactSubmit={handleContactSubmit} isSubmittingContact={isSubmittingContact} isCaptchaLoading={isCaptchaLoading} captchaChallenge={captchaChallenge} captchaLoadError={captchaLoadError} loadCaptchaChallenge={loadCaptchaChallenge} contactStatus={contactStatus} contactUi={contactUi} matrixColumns={matrixColumns} matrixColumnColors={matrixColumnColors} matrixColumnDurations={matrixColumnDurations} matrixColumnFontSizes={matrixColumnFontSizes} matrixColumnBlurs={matrixColumnBlurs} outcomeLongCopy={outcomeLongCopy} />

      <ContactSection theme={theme} t={t} resolvedTheme={resolvedTheme} language={language} setLanguage={setLanguage} mode={mode} cycleTheme={cycleTheme} sectionShell={sectionShell} sectionTitleClass={sectionTitleClass} sectionIntroClass={sectionIntroClass} sectionEyebrowStyle={sectionEyebrowStyle} panelShellStyle={panelShellStyle} panelTopLineStyle={panelTopLineStyle} chipStyle={chipStyle} iconTileStyle={iconTileStyle} inputSurfaceStyle={inputSurfaceStyle} brandLogoClass={brandLogoClass} contactLogoClass={contactLogoClass} footerLogoClass={footerLogoClass} isContactFormOpen={isContactFormOpen} setIsContactFormOpen={setIsContactFormOpen} contactFormRef={contactFormRef} handleContactFieldChange={handleContactFieldChange} contactForm={contactForm} messageTextareaRef={messageTextareaRef} handleContactSubmit={handleContactSubmit} isSubmittingContact={isSubmittingContact} isCaptchaLoading={isCaptchaLoading} captchaChallenge={captchaChallenge} captchaLoadError={captchaLoadError} loadCaptchaChallenge={loadCaptchaChallenge} contactStatus={contactStatus} contactUi={contactUi} matrixColumns={matrixColumns} matrixColumnColors={matrixColumnColors} matrixColumnDurations={matrixColumnDurations} matrixColumnFontSizes={matrixColumnFontSizes} matrixColumnBlurs={matrixColumnBlurs} outcomeLongCopy={outcomeLongCopy} />

      <FooterSection theme={theme} t={t} resolvedTheme={resolvedTheme} language={language} setLanguage={setLanguage} mode={mode} cycleTheme={cycleTheme} sectionShell={sectionShell} sectionTitleClass={sectionTitleClass} sectionIntroClass={sectionIntroClass} sectionEyebrowStyle={sectionEyebrowStyle} panelShellStyle={panelShellStyle} panelTopLineStyle={panelTopLineStyle} chipStyle={chipStyle} iconTileStyle={iconTileStyle} inputSurfaceStyle={inputSurfaceStyle} brandLogoClass={brandLogoClass} contactLogoClass={contactLogoClass} footerLogoClass={footerLogoClass} isContactFormOpen={isContactFormOpen} setIsContactFormOpen={setIsContactFormOpen} contactFormRef={contactFormRef} handleContactFieldChange={handleContactFieldChange} contactForm={contactForm} messageTextareaRef={messageTextareaRef} handleContactSubmit={handleContactSubmit} isSubmittingContact={isSubmittingContact} isCaptchaLoading={isCaptchaLoading} captchaChallenge={captchaChallenge} captchaLoadError={captchaLoadError} loadCaptchaChallenge={loadCaptchaChallenge} contactStatus={contactStatus} contactUi={contactUi} matrixColumns={matrixColumns} matrixColumnColors={matrixColumnColors} matrixColumnDurations={matrixColumnDurations} matrixColumnFontSizes={matrixColumnFontSizes} matrixColumnBlurs={matrixColumnBlurs} outcomeLongCopy={outcomeLongCopy} />

      <style jsx global>{`
        @property --hero-gradient-angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 135deg;
        }

        .reveal-block {
          opacity: 0;
          transition-property: opacity, transform, filter;
          transition-duration: 1s;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform, filter;
        }

        .reveal-block.is-visible {
          opacity: 1;
          filter: blur(0px);
          transform: none;
        }

        .reveal-hero {
          transform: translate3d(0, 36px, 0) scale(0.985);
          transition-duration: 1.15s;
        }

        .reveal-hero .hero-topbar,
        .reveal-hero .hero-copy-block,
        .reveal-hero .hero-visual,
        .reveal-hero .hero-headline,
        .reveal-hero .hero-copy,
        .reveal-hero .hero-cta-row,
        .reveal-hero .hero-stats {
          opacity: 0;
          transform: translate3d(0, 26px, 0);
          filter: blur(10px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), filter 0.9s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform, filter;
        }

        .reveal-hero .hero-visual {
          transform: translate3d(72px, 22px, 0) scale(0.94);
          filter: blur(14px);
          transition-duration: 1.3s;
        }

        .reveal-hero.is-visible .hero-topbar,
        .reveal-hero.is-visible .hero-copy-block,
        .reveal-hero.is-visible .hero-visual,
        .reveal-hero.is-visible .hero-headline,
        .reveal-hero.is-visible .hero-copy,
        .reveal-hero.is-visible .hero-cta-row,
        .reveal-hero.is-visible .hero-stats {
          opacity: 1;
          transform: none;
          filter: blur(0);
        }

        .reveal-hero.is-visible .hero-topbar {
          transition-delay: 0.08s;
        }

        .reveal-hero.is-visible .hero-copy-block {
          transition-delay: 0.16s;
        }

        .reveal-hero.is-visible .hero-headline {
          transition-delay: 0.24s;
        }

        .reveal-hero.is-visible .hero-copy {
          transition-delay: 0.34s;
        }

        .reveal-hero.is-visible .hero-cta-row {
          transition-delay: 0.46s;
        }

        .reveal-hero.is-visible .hero-stats {
          transition-delay: 0.58s;
        }

        .reveal-hero.is-visible .hero-visual {
          transition-delay: 0.78s;
        }

        .reveal-slide-up {
          transform: translate3d(0, 64px, 0);
        }

        .reveal-tilt-in {
          transform: perspective(1400px) rotateX(7deg) translate3d(0, 56px, 0) scale(0.985);
          transform-origin: center top;
          transition-duration: 1.08s;
        }

        .reveal-expand {
          transform: scale(0.965);
          filter: blur(8px);
          transition-duration: 1.12s;
        }

        .reveal-blur-in {
          transform: translate3d(0, 42px, 0);
          filter: blur(14px);
          transition-duration: 1.18s;
        }

        .reveal-footer {
          transform: translate3d(0, 28px, 0);
          transition-duration: 0.9s;
        }

        textarea::-webkit-scrollbar {
          display: none;
        }

        .hero-core {
          animation: hero-core-float 12s ease-in-out infinite;
          position: relative;
          z-index: 1;
        }

        .hero-gradient-text {
          animation: hero-gradient-spin 24s linear infinite;
          background-size: 140% 140%;
        }

        .hero-matrix {
          mask-image: radial-gradient(circle at 58% 52%, rgba(0, 0, 0, 0.18) 0%, rgba(0, 0, 0, 0.94) 58%);
          pointer-events: none;
        }

        .hero-matrix-feather {
          pointer-events: none;
          z-index: 2;
        }

        .hero-matrix-column {
          font-size: 0.76rem;
          letter-spacing: 0.14em;
          line-height: 1;
          font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
          text-shadow: 0 0 14px currentColor;
          animation: hero-matrix-fall 24s linear infinite;
          white-space: nowrap;
          opacity: 0;
          will-change: transform, opacity;
        }

        .hero-matrix-column span {
          display: block;
          max-width: max-content;
        }

        .hero-core-ring {
          animation: hero-core-ring 20s linear infinite;
        }

        .hero-core-ring--reverse {
          animation-direction: reverse;
          animation-duration: 15s;
        }

        .hero-core-logo {
          animation: hero-core-logo-pulse 7.2s ease-in-out infinite;
        }

        .hero-digit-orbit {
          animation: hero-atom-spin 30s linear infinite;
          --orbit-start: 8deg;
          transform-origin: center;
        }

        .hero-digit-badge {
          animation: hero-digit-pulse 5.4s ease-in-out infinite;
        }

        .hero-core-halo {
          animation: hero-core-halo 8.4s ease-in-out infinite;
          opacity: 0.42;
        }

        .hero-atom-orbit {
          animation: hero-atom-spin 26s linear infinite;
          transform-origin: center;
        }

        .hero-atom-orbit--a {
          animation-duration: 30s;
        }

        .hero-atom-orbit--b {
          animation-duration: 24s;
          animation-direction: reverse;
        }

        .hero-atom-orbit--c {
          animation-duration: 36s;
        }

        .hero-electron {
          animation: hero-electron-pulse 4.6s ease-in-out infinite;
        }

        .hero-electron--alt {
          animation-delay: 1.4s;
        }

        .hero-satellite {
          animation: hero-satellite-drift 10.8s ease-in-out infinite;
        }

        .hero-signal {
          animation: hero-signal-ripple 7.8s ease-out infinite;
          opacity: 0;
        }

        @keyframes hero-atom-spin {
          from {
            transform: rotate(var(--orbit-start, 0deg));
          }
          to {
            transform: rotate(calc(var(--orbit-start, 0deg) + 360deg));
          }
        }

        .hero-atom-orbit--a {
          --orbit-start: 18deg;
        }

        .hero-atom-orbit--b {
          --orbit-start: 72deg;
        }

        .hero-atom-orbit--c {
          --orbit-start: -38deg;
        }

        @keyframes hero-electron-pulse {
          0%,
          100% {
            transform: translateX(-50%) scale(0.92);
            opacity: 0.82;
          }
          50% {
            transform: translateX(-50%) scale(1.12);
            opacity: 1;
          }
        }

        @keyframes hero-satellite-drift {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(0.9);
            opacity: 0.55;
          }
          50% {
            transform: translate3d(0, -10px, 0) scale(1.08);
            opacity: 1;
          }
        }

        @keyframes hero-matrix-fall {
          0% {
            transform: translate3d(0, -10%, 0);
            opacity: 0;
          }
          18% {
            opacity: 0;
          }
          30% {
            opacity: 0.32;
          }
          42% {
            opacity: 1;
          }
          68% {
            opacity: 1;
          }
          88% {
            transform: translate3d(0, 72%, 0);
            opacity: 0.38;
          }
          96% {
            transform: translate3d(0, 82%, 0);
            opacity: 0;
          }
          97% {
            transform: translate3d(0, -12%, 0);
            opacity: 0;
          }
          100% {
            transform: translate3d(0, -6%, 0);
            opacity: 0;
          }
        }

        @keyframes hero-core-float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes hero-core-ring {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes hero-core-halo {
          0%,
          100% {
            transform: scale(0.94);
            opacity: 0.28;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.52;
          }
        }

        @keyframes hero-core-logo-pulse {
          0%,
          100% {
            transform: scale(0.96);
            opacity: 0.94;
          }
          50% {
            transform: scale(1.04);
            opacity: 1;
          }
        }

        @keyframes hero-digit-pulse {
          0%,
          100% {
            transform: translateX(-50%) scale(0.96);
          }
          50% {
            transform: translateX(-50%) scale(1.08);
          }
        }

        @keyframes hero-signal-ripple {
          0% {
            transform: scale(0.72);
            opacity: 0;
          }
          18% {
            opacity: 0.36;
          }
          70% {
            opacity: 0.12;
          }
          to {
            transform: scale(1.22);
            opacity: 0;
          }
        }

        @keyframes hero-gradient-spin {
          0% {
            --hero-gradient-angle: 0deg;
          }
          100% {
            --hero-gradient-angle: 360deg;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-block,
          .reveal-block.is-visible {
            animation: none !important;
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            transition: none !important;
          }

          .reveal-hero .hero-topbar,
          .reveal-hero .hero-copy-block,
          .reveal-hero .hero-visual,
          .reveal-hero .hero-headline,
          .reveal-hero .hero-copy,
          .reveal-hero .hero-cta-row,
          .reveal-hero .hero-stats {
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            transition: none !important;
          }

          .hero-core,
          .hero-gradient-text,
          .hero-matrix-column,
          .hero-core-ring,
          .hero-core-logo,
          .hero-core-halo,
          .hero-digit-orbit,
          .hero-digit-badge,
          .hero-atom-orbit,
          .hero-electron,
          .hero-satellite,
          .hero-signal {
            animation: none !important;
          }
        }

      `}</style>
    </div>
  );
}
