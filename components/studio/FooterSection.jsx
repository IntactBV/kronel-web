"use client";
import React from 'react';
import Image from 'next/image';
import RevealBlock from '../ui/RevealBlock';
import Logo from '../ui/Logo';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import ContactShortcut from '../ui/ContactShortcut';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function FooterSection({ theme, t, resolvedTheme, language, setLanguage, mode, cycleTheme, sectionShell, sectionTitleClass, sectionIntroClass, sectionEyebrowStyle, panelShellStyle, panelTopLineStyle, chipStyle, iconTileStyle, inputSurfaceStyle, brandLogoClass, contactLogoClass, footerLogoClass, isContactFormOpen, setIsContactFormOpen, contactFormRef, handleContactFieldChange, contactForm, messageTextareaRef, handleContactSubmit, isSubmittingContact, isCaptchaLoading, captchaChallenge, captchaLoadError, loadCaptchaChallenge, contactStatus, contactUi, matrixColumns, matrixColumnColors, matrixColumnDurations, matrixColumnFontSizes, matrixColumnBlurs, outcomeLongCopy }) {
  return (
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
  );
}
