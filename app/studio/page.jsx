"use client";

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
} from "../../data/studio-data";
import Logo from "../../components/ui/Logo";
import ThemeSwitcher from "../../components/ui/ThemeSwitcher";
import ContactShortcut from "../../components/ui/ContactShortcut";
import LanguageSwitcher from "../../components/ui/LanguageSwitcher";
import RevealBlock from "../../components/ui/RevealBlock";

export default function StudioPage() {
  const [mode, setMode] = useState("system");
  const [systemTheme, setSystemTheme] = useState("dark");
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
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
      setLanguage(getDetectedDefaultLanguage());
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

      <RevealBlock
        variant="expand"
        className={`relative overflow-hidden ${sectionShell} border-t`}
        style={{ borderColor: theme.border }}
      >
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={resolvedTheme === "light" ? "/images/studio/websites-abstract-light-v1.png" : "/images/studio/websites-abstract-v1.png"}
            alt=""
            fill
            className={resolvedTheme === "light" ? "object-cover object-[72%_center] opacity-84" : "object-cover object-[72%_center] opacity-48"}
            sizes="100vw"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                resolvedTheme === "light"
                  ? "linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.8) 34%, rgba(255,255,255,0.3) 62%, rgba(255,255,255,0.58) 100%)"
                  : `linear-gradient(90deg, ${theme.page} 0%, rgba(5,5,8,0.86) 34%, rgba(5,5,8,0.46) 62%, ${theme.page} 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                resolvedTheme === "light"
                  ? "linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.05) 18%, rgba(255,255,255,0.12) 82%, rgba(255,255,255,0.76) 100%)"
                  : `linear-gradient(180deg, ${theme.page} 0%, transparent 18%, transparent 82%, ${theme.page} 100%)`,
            }}
          />
          <div
            className="absolute right-[14%] top-[14%] h-[24rem] w-[24rem] rounded-full blur-[130px]"
            style={{ backgroundColor: theme.accentSoft, opacity: resolvedTheme === "light" ? 0.18 : 0.42 }}
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
              {t.websiteEyebrow}
            </div>

            <h2 className="font-display mt-4 max-w-[12ch] text-[1.95rem] font-bold leading-[1.03] sm:text-[2.25rem] lg:text-[2.85rem]">
              {t.websiteTitle}
            </h2>

            <p
              className="mt-5 max-w-3xl text-[0.98rem] leading-7 sm:text-[1.03rem] lg:text-[1.08rem] lg:leading-8"
              style={{ color: theme.mutedText }}
            >
              {t.websiteDescription}
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
                {t.websiteFormats}
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
              {t.websiteEyebrow}
            </div>
            <p className="mt-3 text-[1rem] leading-7 sm:text-[1.04rem]" style={{ color: resolvedTheme === "light" ? "#211c2e" : "#f5f2ff" }}>
              {t.websiteVisualTitle}
            </p>
            <div
              className="mt-5 text-[0.78rem] uppercase tracking-[0.2em]"
              style={{ color: theme.softText }}
            >
              {t.websiteVisualCaption}
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
            {t.websiteCapabilities.map((capability, index) => (
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
                          <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
                          <path d="M3.5 9h17M8 14h4M15 14h1.5" />
                        </svg>
                      ) : index === 1 ? (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M6 16 10 12l3 3 5-7" />
                          <path d="M6 6h12" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M4 7h16M7 4v16" />
                          <path d="M17 8 8 17" />
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

      <RevealBlock
        variant="expand"
        className={`relative overflow-hidden ${sectionShell} border-t`}
        style={{ borderColor: theme.border }}
      >
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={resolvedTheme === "light" ? "/images/studio/engineering-abstract-light-v1.png" : "/images/studio/engineering-abstract-v1.png"}
            alt=""
            fill
            className={resolvedTheme === "light" ? "object-cover object-[28%_center] opacity-42" : "object-cover object-[22%_center] opacity-30"}
            sizes="100vw"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                resolvedTheme === "light"
                  ? "linear-gradient(90deg, rgba(255,255,255,0.76) 0%, rgba(255,255,255,0.34) 20%, rgba(255,255,255,0.08) 48%, rgba(255,255,255,0.22) 72%, rgba(255,255,255,0.7) 100%)"
                  : `linear-gradient(90deg, ${theme.page} 0%, rgba(6,8,14,0.76) 34%, rgba(6,8,14,0.9) 58%, ${theme.page} 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                resolvedTheme === "light"
                  ? "linear-gradient(180deg, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.08) 18%, rgba(255,255,255,0.04) 82%, rgba(255,255,255,0.54) 100%)"
                  : `linear-gradient(180deg, ${theme.page} 0%, transparent 18%, transparent 82%, ${theme.page} 100%)`,
            }}
          />
          <div
            className="absolute left-[10%] top-[18%] h-[22rem] w-[22rem] rounded-full blur-[120px]"
            style={{ backgroundColor: theme.accentSoft, opacity: resolvedTheme === "light" ? 0.14 : 0.36 }}
          />
          <div
            className="absolute right-[16%] bottom-[18%] h-[18rem] w-[18rem] rounded-full blur-[110px]"
            style={{
              backgroundColor: resolvedTheme === "light" ? "rgba(138,99,255,0.14)" : "rgba(133,212,255,0.12)",
              opacity: resolvedTheme === "light" ? 0.18 : 0.4,
            }}
          />
        </div>

        <div className="relative z-10">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1.1fr)_auto] xl:items-start">
            <div className="max-w-4xl">
              <div
                className="inline-flex items-center rounded-full border px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.24em]"
                style={{
                  borderColor: theme.border,
                  backgroundColor: resolvedTheme === "light" ? "rgba(255,255,255,0.46)" : "rgba(10,12,18,0.46)",
                  color: theme.softText,
                  backdropFilter: "blur(14px)",
                }}
              >
                {t.engineeringEyebrow}
              </div>

              <h2 className="font-display mt-4 max-w-[11ch] text-[1.95rem] font-bold leading-[1.03] sm:text-[2.25rem] lg:text-[2.85rem]">
                {t.engineeringTitle}
              </h2>

              <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                <p
                  className={sectionIntroClass}
                  style={{ color: theme.mutedText }}
                >
                  {t.engineeringDescription}
                </p>

                <div
                  className="inline-flex items-center gap-3 rounded-full border px-4 py-3 text-[0.72rem] uppercase tracking-[0.2em]"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: resolvedTheme === "light" ? "rgba(255,255,255,0.44)" : "rgba(10,12,18,0.42)",
                    color: theme.softText,
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: theme.accent,
                      boxShadow: `0 0 0 6px ${theme.accentSoft}`,
                    }}
                  />
                  Operational-grade systems
                </div>
              </div>
            </div>

            <div
              className="hidden xl:block max-w-[18rem] justify-self-end rounded-[1.55rem] border px-5 py-5"
              style={{
                borderColor: resolvedTheme === "light" ? "rgba(31,28,44,0.1)" : "rgba(255,255,255,0.08)",
                backgroundColor: resolvedTheme === "light" ? "rgba(255,255,255,0.42)" : "rgba(6,9,18,0.28)",
                backdropFilter: "blur(14px)",
              }}
            >
              <div
                className="text-[0.68rem] font-medium uppercase tracking-[0.24em]"
                style={{ color: resolvedTheme === "light" ? "rgba(34,28,52,0.68)" : "rgba(236,229,255,0.72)" }}
              >
                {t.engineeringEyebrow}
              </div>
              <p className="mt-3 text-[1rem] leading-7 sm:text-[1.04rem]" style={{ color: resolvedTheme === "light" ? "#211c2e" : "#f5f2ff" }}>
                {t.engineeringVisualTitle}
              </p>
              <div
                className="mt-5 text-[0.78rem] uppercase tracking-[0.2em]"
                style={{ color: theme.softText }}
              >
                {t.engineeringVisualCaption}
              </div>
            </div>
          </div>

          <div className="mt-14">
            <div
              className="mb-8 h-px w-full"
              style={{
                background: `linear-gradient(90deg, ${theme.accent} 0%, ${theme.accentSoft} 30%, transparent 72%)`,
                opacity: 0.6,
              }}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              {t.engineeringPillars.map((pillar, index) => (
                <div
                  key={pillar.title}
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
                      {pillar.title}
                    </h3>

                    <p className="mt-4 max-w-[30ch] text-[0.93rem] leading-7 lg:text-[0.98rem]" style={{ color: theme.mutedText }}>
                      {pillar.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealBlock>

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

      <RevealBlock
        as="footer"
        variant="footer"
        className="border-t px-4 py-6 text-sm transition-colors duration-300"
        style={{ borderColor: theme.border, color: theme.softText }}
      >
        <div className="flex w-full flex-col justify-between gap-3 px-[clamp(1.25rem,4vw,6rem)] sm:flex-row xl:px-[clamp(3rem,5vw,7.5rem)] 2xl:px-[clamp(4rem,6vw,10rem)]">
          <div className="flex items-center gap-3">
            <Logo className={footerLogoClass} themeName={theme.logoTheme} />
            <span className="text-[0.82rem] sm:text-[0.88rem] lg:text-[0.95rem]">{t.brand}</span>
          </div>
          <div className="text-[0.82rem] sm:text-[0.88rem] lg:text-[0.95rem]">{t.operatedBy}</div>
        </div>
      </RevealBlock>

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
