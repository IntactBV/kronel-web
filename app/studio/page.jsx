"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* Ultra high-conversion enterprise landing for studio.kronel.io */

const PRIMARY = "#5F24E6";
const SECONDARY = "#7a3cff";
const THEME_ORDER = ["system", "light", "dark"];
const LANGUAGES = ["en", "de", "fr", "el", "ro"];
const STORAGE_KEYS = {
  mode: "kronel.studio.themeMode",
  language: "kronel.studio.language",
};
const LANGUAGE_LABELS = {
  en: "English",
  de: "Deutsch",
  fr: "Francais",
  el: "Ellinika",
  ro: "Romana",
};

const OUTCOME_LONG_COPY = {
  en: [
    "Teams work from one clearer operational picture instead of scattered tools, duplicated files, and informal status updates. That creates stronger ownership, fewer blind spots, and faster coordination across the business. Leaders gain better visibility into what is moving, what is blocked, and where attention is actually needed.",
    "Manual effort drops when repeated checks, updates, handoffs, and data entry are built into the system instead of depending on memory. Teams spend less time pushing information around and more time on meaningful work. That reduces errors, shortens delays, and makes the business less dependent on a few key people.",
    "A scalable internal system gives the business room to grow without multiplying friction. More clients, more work, and more team members can be absorbed through structure instead of improvised process. The result is better consistency, easier change management, and far more control as operational complexity increases.",
    "Structured systems improve decisions because the underlying data becomes more consistent, visible, and trustworthy. Teams spend less time debating what is true and more time deciding what to do next. Over time, that leads to better prioritization, stronger forecasting, and a business that improves with much more intention.",
  ],
};

const CONTACT_FORM_COPY = {
  en: {
    title: "Send a project brief",
    description: "Share the basics and the message will be stored locally in your studio inbox.",
    teaserTitle: "Ready to describe the system you need?",
    teaserText: "Open a short brief form and leave the core details. Your message will be saved locally so you can review every inquiry later from the studio inbox.",
    open: "Open form",
    cancel: "Cancel",
    name: "Name",
    email: "Email",
    company: "Company",
    message: "Message",
    captcha: "Captcha",
    captchaPlaceholder: "Enter the result",
    captchaLoading: "Loading challenge...",
    captchaRefresh: "Refresh challenge",
    captchaError: "Unable to load the captcha challenge right now.",
    captchaHint: "This quick check helps block automated spam.",
    submit: "Send Message",
    sending: "Sending email...",
    success: "Your email has been sent. We will review your brief and get back to you.",
    error: "Something went wrong while saving the message.",
    inbox: "Open inbox",
  },
};

const translations = {
  en: {
    brand: "KRONEL STUDIO",
    heroTitle1: "We don't just build software.",
    heroTitle2: "We build systems that businesses can rely on.",
    heroDescription:
      "Kronel Studio designs and delivers custom software systems that transform how organizations operate, automate and scale.",
    heroExperience:
      "Built on over 20 years of software development experience through INTACT SRL.",
    bookCall: "Book a call",
    learnMore: "Learn more",
    systemImpact: "System Impact",
    enterpriseReady: "Enterprise-ready delivery",
    efficiency: "Efficiency",
    manualWork: "Manual work",
    scalability: "Scalability",
    high: "High",
    coreCapabilities: "Core capabilities",
    executionModel: "Execution model",
    businessOutcomes: "Business outcomes",
    contactEyebrow: "START THE CONVERSATION",
    contactTitle: "Let's discuss the system your business actually needs.",
    contactDescription:
      "If you are serious about building scalable internal software and operational structure, let's talk.",
    operatedBy: "Operated by INTACT SRL",
    services: [
      {
        title: "Custom Software Systems",
        items: [
          "Business-critical platforms",
          "Internal tools & CRMs",
          "Complex system integrations",
        ],
      },
      {
        title: "Digitalization & Automation",
        items: [
          "Eliminate manual workflows",
          "Process architecture",
          "Operational efficiency systems",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Deep Analysis",
        text: "We break down how your business truly operates and identify what slows it down.",
      },
      {
        step: "02",
        title: "System Design",
        text: "We design a scalable architecture tailored to your exact operational needs.",
      },
      {
        step: "03",
        title: "Execution",
        text: "We build robust systems that your business can rely on long-term.",
      },
    ],
    outcomes: [
      "Operational clarity",
      "Reduced dependency on manual work",
      "Scalable internal systems",
      "Better decision-making through structure",
    ],
  },
  de: {
    brand: "KRONEL STUDIO",
    heroTitle1: "Wir entwickeln nicht einfach Software.",
    heroTitle2: "Wir entwickeln Systeme, auf die Unternehmen sich verlassen.",
    heroDescription:
      "Kronel Studio konzipiert und liefert maßgeschneiderte Softwaresysteme, die Unternehmen beim Strukturieren, Automatisieren und Skalieren unterstützen.",
    heroExperience:
      "Aufgebaut auf über 20 Jahren Softwareentwicklungserfahrung durch INTACT SRL.",
    bookCall: "Gespräch buchen",
    learnMore: "Mehr erfahren",
    systemImpact: "Systemwirkung",
    enterpriseReady: "Enterprise-taugliche Umsetzung",
    efficiency: "Effizienz",
    manualWork: "Manuelle Arbeit",
    scalability: "Skalierbarkeit",
    high: "Hoch",
    coreCapabilities: "Kernkompetenzen",
    executionModel: "Umsetzungsmodell",
    businessOutcomes: "Geschäftliche Ergebnisse",
    contactEyebrow: "GESPRÄCH STARTEN",
    contactTitle: "Lassen Sie uns über das System sprechen, das Ihr Unternehmen wirklich braucht.",
    contactDescription:
      "Wenn Sie ernsthaft skalierbare interne Software und operative Struktur aufbauen möchten, sprechen wir miteinander.",
    operatedBy: "Betrieben von INTACT SRL",
    services: [
      {
        title: "Individuelle Softwaresysteme",
        items: [
          "Geschäftskritische Plattformen",
          "Interne Tools & CRMs",
          "Komplexe Systemintegrationen",
        ],
      },
      {
        title: "Digitalisierung & Automatisierung",
        items: [
          "Manuelle Abläufe eliminieren",
          "Prozessarchitektur",
          "Systeme für operative Effizienz",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Tiefenanalyse",
        text: "Wir analysieren, wie Ihr Unternehmen tatsächlich arbeitet, und identifizieren Bremsfaktoren.",
      },
      {
        step: "02",
        title: "Systemdesign",
        text: "Wir entwickeln eine skalierbare Architektur, abgestimmt auf Ihre operativen Anforderungen.",
      },
      {
        step: "03",
        title: "Umsetzung",
        text: "Wir bauen robuste Systeme, auf die sich Ihr Unternehmen langfristig verlassen kann.",
      },
    ],
    outcomes: [
      "Operative Klarheit",
      "Weniger Abhängigkeit von manueller Arbeit",
      "Skalierbare interne Systeme",
      "Bessere Entscheidungen durch Struktur",
    ],
  },
  fr: {
    brand: "KRONEL STUDIO",
    heroTitle1: "Nous ne créons pas simplement des logiciels.",
    heroTitle2: "Nous créons des systèmes sur lesquels les entreprises s'appuient.",
    heroDescription:
      "Kronel Studio conçoit et livre des systèmes logiciels sur mesure qui transforment la manière dont les entreprises fonctionnent, automatisent et se développent.",
    heroExperience:
      "Fondé sur plus de 20 ans d'expérience en développement logiciel via INTACT SRL.",
    bookCall: "Réserver un appel",
    learnMore: "En savoir plus",
    systemImpact: "Impact du système",
    enterpriseReady: "Livraison prête pour l'entreprise",
    efficiency: "Efficacité",
    manualWork: "Travail manuel",
    scalability: "Scalabilité",
    high: "Élevée",
    coreCapabilities: "Compétences clés",
    executionModel: "Modèle d'exécution",
    businessOutcomes: "Résultats business",
    contactEyebrow: "DÉMARRER LA CONVERSATION",
    contactTitle: "Parlons du système dont votre entreprise a réellement besoin.",
    contactDescription:
      "Si vous voulez vraiment construire des logiciels internes évolutifs et une structure opérationnelle solide, parlons-en.",
    operatedBy: "Exploité par INTACT SRL",
    services: [
      {
        title: "Systèmes logiciels sur mesure",
        items: [
          "Plateformes critiques pour l'activité",
          "Outils internes & CRM",
          "Intégrations système complexes",
        ],
      },
      {
        title: "Digitalisation & Automatisation",
        items: [
          "Éliminer les workflows manuels",
          "Architecture des processus",
          "Systèmes d'efficacité opérationnelle",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Analyse approfondie",
        text: "Nous analysons le fonctionnement réel de votre entreprise et identifions ce qui la ralentit.",
      },
      {
        step: "02",
        title: "Conception du système",
        text: "Nous concevons une architecture évolutive adaptée à vos besoins opérationnels précis.",
      },
      {
        step: "03",
        title: "Exécution",
        text: "Nous construisons des systèmes robustes sur lesquels votre entreprise peut compter à long terme.",
      },
    ],
    outcomes: [
      "Clarté opérationnelle",
      "Moins de dépendance au travail manuel",
      "Systèmes internes évolutifs",
      "Meilleure prise de décision grâce à la structure",
    ],
  },
  el: {
    brand: "KRONEL STUDIO",
    heroTitle1: "Δεν δημιουργούμε απλώς λογισμικό.",
    heroTitle2: "Δημιουργούμε συστήματα στα οποία βασίζονται οι επιχειρήσεις.",
    heroDescription:
      "Το Kronel Studio σχεδιάζει και υλοποιεί προσαρμοσμένα συστήματα λογισμικού που μετασχηματίζουν τον τρόπο με τον οποίο οι εταιρείες λειτουργούν, αυτοματοποιούν και αναπτύσσονται.",
    heroExperience:
      "Χτισμένο πάνω σε περισσότερα από 20 χρόνια εμπειρίας ανάπτυξης λογισμικού μέσω της INTACT SRL.",
    bookCall: "Κλείστε κλήση",
    learnMore: "Μάθετε περισσότερα",
    systemImpact: "Επίδραση συστήματος",
    enterpriseReady: "Παράδοση έτοιμη για επιχειρήσεις",
    efficiency: "Αποδοτικότητα",
    manualWork: "Χειροκίνητη εργασία",
    scalability: "Κλιμάκωση",
    high: "Υψηλή",
    coreCapabilities: "Βασικές δυνατότητες",
    executionModel: "Μοντέλο υλοποίησης",
    businessOutcomes: "Επιχειρηματικά αποτελέσματα",
    contactEyebrow: "ΞΕΚΙΝΗΣΤΕ ΤΗ ΣΥΖΗΤΗΣΗ",
    contactTitle: "Ας συζητήσουμε το σύστημα που πραγματικά χρειάζεται η επιχείρησή σας.",
    contactDescription:
      "Αν θέλετε σοβαρά να χτίσετε επεκτάσιμο εσωτερικό λογισμικό και λειτουργική δομή, ας μιλήσουμε.",
    operatedBy: "Λειτουργεί από την INTACT SRL",
    services: [
      {
        title: "Προσαρμοσμένα συστήματα λογισμικού",
        items: [
          "Κρίσιμες επιχειρησιακές πλατφόρμες",
          "Εσωτερικά εργαλεία & CRM",
          "Σύνθετες ενσωματώσεις συστημάτων",
        ],
      },
      {
        title: "Ψηφιοποίηση & Αυτοματισμός",
        items: [
          "Κατάργηση χειροκίνητων ροών εργασίας",
          "Αρχιτεκτονική διαδικασιών",
          "Συστήματα λειτουργικής αποδοτικότητας",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Βαθιά ανάλυση",
        text: "Αναλύουμε πώς λειτουργεί πραγματικά η επιχείρησή σας και εντοπίζουμε τι την επιβραδύνει.",
      },
      {
        step: "02",
        title: "Σχεδιασμός συστήματος",
        text: "Σχεδιάζουμε επεκτάσιμη αρχιτεκτονική προσαρμοσμένη στις ακριβείς λειτουργικές σας ανάγκες.",
      },
      {
        step: "03",
        title: "Υλοποίηση",
        text: "Κατασκευάζουμε αξιόπιστα συστήματα στα οποία μπορεί να βασιστεί η επιχείρησή σας μακροπρόθεσμα.",
      },
    ],
    outcomes: [
      "Λειτουργική σαφήνεια",
      "Μικρότερη εξάρτηση από χειροκίνητη εργασία",
      "Επεκτάσιμα εσωτερικά συστήματα",
      "Καλύτερες αποφάσεις μέσω δομής",
    ],
  },
  ro: {
    brand: "KRONEL STUDIO",
    heroTitle1: "Nu construim doar aplicații software.",
    heroTitle2: "Construim sisteme pe care companiile se bazează.",
    heroDescription:
      "Kronel Studio proiectează și livrează sisteme software custom care transformă modul în care companiile operează, automatizează și scalează.",
    heroExperience:
      "Construit pe peste 20 de ani de experiență în dezvoltare software prin INTACT SRL.",
    bookCall: "Programează un call",
    learnMore: "Află mai mult",
    systemImpact: "Impactul sistemului",
    enterpriseReady: "Livrare pregătită pentru enterprise",
    efficiency: "Eficiență",
    manualWork: "Muncă manuală",
    scalability: "Scalabilitate",
    high: "Ridicată",
    coreCapabilities: "Capabilități esențiale",
    executionModel: "Model de execuție",
    businessOutcomes: "Rezultate de business",
    contactEyebrow: "ÎNCEPE CONVERSAȚIA",
    contactTitle: "Hai să discutăm despre sistemul de care afacerea ta are cu adevărat nevoie.",
    contactDescription:
      "Dacă vrei serios să construiești software intern scalabil și structură operațională solidă, hai să vorbim.",
    operatedBy: "Operat de INTACT SRL",
    services: [
      {
        title: "Sisteme software custom",
        items: [
          "Platforme critice pentru business",
          "Instrumente interne & CRM-uri",
          "Integrări complexe între sisteme",
        ],
      },
      {
        title: "Digitalizare & Automatizare",
        items: [
          "Eliminarea proceselor manuale",
          "Arhitectură de procese",
          "Sisteme pentru eficiență operațională",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Analiză profundă",
        text: "Descompunem modul real în care funcționează business-ul tău și identificăm ce îl încetinește.",
      },
      {
        step: "02",
        title: "Design de sistem",
        text: "Proiectăm o arhitectură scalabilă, adaptată exact nevoilor tale operaționale.",
      },
      {
        step: "03",
        title: "Execuție",
        text: "Construim sisteme robuste pe care afacerea ta se poate baza pe termen lung.",
      },
    ],
    outcomes: [
      "Claritate operațională",
      "Dependență redusă de muncă manuală",
      "Sisteme interne scalabile",
      "Decizii mai bune prin structură",
    ],
  },
};

function KronelLogoDark({ className = "h-10 w-10" }) {
  return (
    <svg
      viewBox="0 0 79.651474 109.62114"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="translate(-1430.4836,-342.95062)">
        <g transform="matrix(0.41496015,0,0,0.41496015,735.84033,1012.6963)" style={{ fill: "#ececec" }}>
          <rect x="1826.0206" y="-1600.3601" width="1.5182211" height="0.60728842" fill="#ececec" />
          <path
            fill="#ececec"
            d="m 1769.5291,-1614 -29.0383,66.5608 c 6.292,2.5751 10.4028,8.6987 10.4031,15.4972 -2e-4,9.2483 -7.4977,16.7458 -16.746,16.7455 -9.248,-2e-4 -16.7447,-7.4975 -16.7449,-16.7455 10e-5,-4.4466 1.7685,-8.7106 4.9157,-11.8518 l -48.3114,-48.3115 H 1674 l 0.068,242.278 64.5471,-64.5471 -43.9386,-93.9173 101.1748,36.6811 69.2071,-69.2071 v -51.2876 h -0.01 l -48.2047,48.2048 c 3.2132,3.1494 5.0236,7.4592 5.0236,11.9585 -10e-5,9.248 -7.4968,16.7453 -16.7448,16.7455 -9.248,-2e-4 -16.7446,-7.4975 -16.7448,-16.7455 0,-6.7271 4.0249,-12.801 10.2203,-15.4223 z"
          />
          <path
            fill="#7a3cff"
            d="m 1718.9636,-1486.5286 63.7633,136.2922 v 0.1711 l 0.056,-0.056 0.1377,0.2937 0.2667,-0.6976 82.7624,-82.7394 -0.1,0.01 0.024,-0.011 z"
          />
        </g>
      </g>
    </svg>
  );
}

function KronelLogoLight({ className = "h-10 w-10" }) {
  return (
    <svg
      viewBox="0 0 79.650002 109.62117"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="translate(-1088.849,-342.95053)">
        <g transform="matrix(0.13031958,0,0,0.13031958,920.19811,712.26732)" style={{ fill: "#333333" }}>
          <g transform="translate(-3070.9696,-252.16922)" style={{ fill: "#333333" }}>
            <g transform="translate(-134,-195)" style={{ fill: "#333333" }}>
              <rect x="4983.1626" y="-2343.3306" width="4.8342795" height="1.9337118" fill="#333333" />
              <path
                fill="#000000"
                d="m 4803.284,-2386.7625 -92.4629,211.9414 c 20.0347,8.1994 33.1243,27.698 33.125,49.3457 -4e-4,29.4482 -23.8739,53.3214 -53.3222,53.3204 -29.4471,-5e-4 -53.318,-23.8732 -53.3184,-53.3204 2e-4,-14.1587 5.631,-27.7361 15.6524,-37.7382 l -153.8321,-153.8321 h -0.023 l 0.2148,771.4551 205.5293,-205.5293 -139.9082,-299.0488 322.1582,116.7988 220.3672,-220.3672 v -163.3086 h -0.023 l -153.4922,153.4922 c 10.2314,10.0284 15.9961,23.7515 15.9961,38.0781 -5e-4,29.4472 -23.8713,53.3199 -53.3184,53.3204 -29.4472,-5e-4 -53.3179,-23.8732 -53.3183,-53.3204 0,-21.4202 12.8157,-40.7608 32.5429,-49.1074 z"
              />
              <path
                fill="#5f24e6"
                d="m 4642.2746,-1980.8714 203.0335,433.9781 -0.011,0.5449 0.1782,-0.1782 0.4384,0.9353 0.8493,-2.2212 263.5296,-263.4568 -0.3169,0.026 0.075,-0.035 z"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

function ThemeSwitcher({ mode, onToggle, theme, resolvedTheme, className = "" }) {
  const icons = {
    system: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8" />
        <path d="M12 16v4" />
      </svg>
    ),
    light: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    ),
    dark: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
      </svg>
    ),
  };

  const labels = {
    system: `System theme (${resolvedTheme})`,
    light: "Light theme",
    dark: "Dark theme",
  };

  return (
    <div className="group relative inline-flex">
      <button
        type="button"
        onClick={onToggle}
        aria-label={labels[mode]}
        className={`inline-flex items-center justify-center rounded-full border transition duration-200 hover:translate-y-[-1px] hover:scale-[1.04] focus-visible:translate-y-[-1px] focus-visible:scale-[1.04] ${className}`}
        style={{
          backgroundColor: theme.panel,
          borderColor: theme.border,
          color: theme.mutedText,
        }}
      >
        {icons[mode]}
      </button>
      <span
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 -translate-x-1/2 rounded-full px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] opacity-0 transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          backgroundColor: theme.panelStrong,
          border: `1px solid ${theme.border}`,
          color: theme.softText,
          boxShadow: `0 18px 40px ${theme.accentSoft}`,
        }}
      >
        {labels[mode]}
      </span>
    </div>
  );
}

function ContactShortcut({ theme, className = "" }) {
  return (
    <div className="group relative inline-flex">
      <a
        href="#contact"
        aria-label="Jump to contact section"
        className={`inline-flex items-center justify-center rounded-full border transition duration-200 hover:translate-y-[-1px] hover:scale-[1.04] focus-visible:translate-y-[-1px] focus-visible:scale-[1.04] ${className}`}
        style={{
          backgroundColor: theme.panel,
          borderColor: theme.border,
          color: theme.mutedText,
        }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 3 10 14" />
          <path d="m21 3-7 18-4-7-7-4 18-7Z" />
        </svg>
      </a>
      <span
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 -translate-x-1/2 rounded-full px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] opacity-0 transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          backgroundColor: theme.panelStrong,
          border: `1px solid ${theme.border}`,
          color: theme.softText,
          boxShadow: `0 18px 40px ${theme.accentSoft}`,
        }}
      >
        Contact
      </span>
    </div>
  );
}

function LanguageSwitcher({ language, onChange, theme, className = "" }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={rootRef} className="group relative z-[120]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${LANGUAGE_LABELS[language] ?? language.toUpperCase()}`}
        className={`inline-flex items-center gap-2 rounded-full border pl-3 pr-3 transition duration-200 hover:translate-y-[-1px] hover:scale-[1.04] focus-visible:translate-y-[-1px] focus-visible:scale-[1.04] sm:pl-4 sm:pr-4 lg:gap-3 lg:pl-5 lg:pr-5 ${className}`}
        style={{
          backgroundColor: theme.panelStrong,
          borderColor: theme.border,
          color: theme.softText,
        }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 lg:h-[1.05rem] lg:w-[1.05rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8.25" />
          <path d="M3.75 12h16.5M12 3.75a13.2 13.2 0 0 1 0 16.5M12 3.75a13.2 13.2 0 0 0 0 16.5" />
        </svg>
        <span className="text-[0.72rem] font-medium uppercase sm:text-[0.82rem] lg:text-[0.95rem] 2xl:text-[1rem]">
          {language}
        </span>
        <svg
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </button>

      <span
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 -translate-x-1/2 rounded-full px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] opacity-0 transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          backgroundColor: theme.panelStrong,
          border: `1px solid ${theme.border}`,
          color: theme.softText,
          boxShadow: `0 18px 40px ${theme.accentSoft}`,
        }}
      >
        Language
      </span>

      {open ? (
        <div
          role="listbox"
          className="absolute right-0 top-full z-[140] mt-3 min-w-[12rem] rounded-2xl border p-2 shadow-2xl backdrop-blur-xl"
          style={{
            backgroundColor: theme.panelStrong,
            borderColor: theme.border,
            boxShadow: `0 24px 80px ${theme.accentSoft}`,
          }}
        >
          {LANGUAGES.map((lang) => {
            const active = lang === language;
            return (
              <button
                key={lang}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(lang);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition"
                style={{
                  backgroundColor: active ? theme.panel : "transparent",
                  color: active ? theme.text : theme.mutedText,
                }}
              >
                <span className="text-[0.78rem] font-medium lg:text-[0.9rem]">{LANGUAGE_LABELS[lang]}</span>
                <span className="text-[0.68rem] uppercase tracking-[0.22em]">{lang}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function RevealBlock({
  as: Component = "section",
  className = "",
  variant = "fade-up",
  children,
  style,
  appearOnMount = false,
  mountDelayMs = 0,
  ...props
}) {
  const rootRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (appearOnMount) {
      let frameA = 0;
      let frameB = 0;
      let timeoutId = 0;

      frameA = window.requestAnimationFrame(() => {
        frameB = window.requestAnimationFrame(() => {
          timeoutId = window.setTimeout(() => {
            setIsVisible(true);
          }, mountDelayMs);
        });
      });

      return () => {
        window.clearTimeout(timeoutId);
        window.cancelAnimationFrame(frameA);
        window.cancelAnimationFrame(frameB);
      };
    }

    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={rootRef}
      className={`reveal-block reveal-${variant} ${isVisible ? "is-visible" : ""} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}

function Logo({ className = "h-10 w-10", themeName = "dark" }) {
  return themeName === "dark" ? (
    <KronelLogoDark className={className} />
  ) : (
    <KronelLogoLight className={className} />
  );
}

const themeMap = {
  dark: {
    name: "dark",
    page: "#050505",
    text: "#F5F2FF",
    mutedText: "rgba(245,242,255,0.68)",
    softText: "rgba(245,242,255,0.5)",
    border: "rgba(255,255,255,0.12)",
    panel: "rgba(255,255,255,0.04)",
    panelStrong: "rgba(255,255,255,0.06)",
    heroGlow: PRIMARY,
    accent: PRIMARY,
    accent2: SECONDARY,
    accentSoft: "rgba(122,60,255,0.14)",
    buttonText: "#FFFFFF",
    secondaryButtonText: "#FFFFFF",
    logoTheme: "dark",
  },
  light: {
    name: "light",
    page: "#FAF9FE",
    text: "#16121F",
    mutedText: "rgba(22,18,31,0.72)",
    softText: "rgba(22,18,31,0.5)",
    border: "rgba(95,36,230,0.14)",
    panel: "rgba(95,36,230,0.04)",
    panelStrong: "rgba(95,36,230,0.06)",
    heroGlow: "rgba(122,60,255,0.28)",
    accent: PRIMARY,
    accent2: SECONDARY,
    accentSoft: "rgba(122,60,255,0.1)",
    buttonText: "#FFFFFF",
    secondaryButtonText: "#16121F",
    logoTheme: "light",
  },
};

export default function StudioPage() {
  const [mode, setMode] = useState("system");
  const [systemTheme, setSystemTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
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
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => setSystemTheme(media.matches ? "dark" : "light");

    syncTheme();
    media.addEventListener("change", syncTheme);
    return () => media.removeEventListener("change", syncTheme);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.mode, mode);
  }, [mode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.language, language);
  }, [language]);

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

  const sectionShell = "w-full px-[clamp(1.25rem,4vw,6rem)] py-20 sm:py-22 lg:py-24 xl:px-[clamp(3rem,5vw,7.5rem)] xl:py-28 2xl:px-[clamp(4rem,6vw,10rem)]";
  const brandLogoClass = "h-9 w-9 sm:h-10 sm:w-10 lg:h-[4.75rem] lg:w-[4.75rem] 2xl:h-[5.5rem] 2xl:w-[5.5rem]";
  const contactLogoClass = "h-10 w-10 sm:h-11 sm:w-11 lg:h-[5.25rem] lg:w-[5.25rem]";
  const footerLogoClass = "h-5 w-5 sm:h-6 sm:w-6 lg:h-[2.625rem] lg:w-[2.625rem]";

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
        id="services"
        variant="slide-up"
        className={`${sectionShell} border-t`}
        style={{ borderColor: theme.border }}
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <div
              className="inline-flex items-center rounded-full border px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.24em]"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.panelStrong,
                color: theme.softText,
              }}
            >
              {t.systemImpact}
            </div>
            <h2 className="font-display mt-5 text-[1.9rem] font-bold sm:text-[2.15rem] lg:text-[2.65rem]">
              {t.coreCapabilities}
            </h2>
          </div>

          <p
            className="max-w-3xl text-[0.95rem] leading-7 lg:ml-auto lg:text-[1.02rem] lg:leading-8"
            style={{ color: theme.mutedText }}
          >
            {t.heroDescription}
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-2 2xl:grid-cols-[repeat(2,minmax(0,1fr))]">
          {t.services.map((service, index) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 lg:p-8"
              style={{
                borderColor: theme.border,
                background: `linear-gradient(180deg, ${theme.panelStrong} 0%, ${theme.panel} 100%)`,
                boxShadow: `0 24px 80px ${index === 0 ? theme.accentSoft : "rgba(0,0,0,0.12)"}`,
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${theme.accent} 50%, transparent 100%)`,
                  opacity: 0.9,
                }}
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
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.panelStrong,
                      color: theme.accent,
                    }}
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
                  style={{
                    backgroundColor: theme.panelStrong,
                    color: theme.softText,
                  }}
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
        variant="tilt-in"
        className={`${sectionShell} border-t`}
        style={{ borderColor: theme.border }}
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <div
              className="inline-flex items-center rounded-full border px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.24em]"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.panelStrong,
                color: theme.softText,
              }}
            >
              {t.enterpriseReady}
            </div>
            <h2 className="font-display mt-5 text-[1.9rem] font-bold sm:text-[2.15rem] lg:text-[2.65rem]">
              {t.executionModel}
            </h2>
          </div>

          <p
            className="max-w-3xl text-[0.95rem] leading-7 lg:ml-auto lg:text-[1.02rem] lg:leading-8"
            style={{ color: theme.mutedText }}
          >
            {t.process.map((item) => item.title).join(" • ")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {t.process.map((item, index) => (
            <div
              key={item.step}
              className="group relative overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 lg:p-8"
              style={{
                borderColor: theme.border,
                background: `linear-gradient(180deg, ${theme.panelStrong} 0%, ${theme.panel} 100%)`,
                boxShadow: `0 24px 72px ${theme.accentSoft}`,
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${theme.accent} 50%, transparent 100%)`,
                  opacity: 0.85,
                }}
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
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.panelStrong,
                      color: theme.accent,
                    }}
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

                <h3 className="font-display mt-10 text-[1.28rem] font-semibold sm:text-[1.38rem] lg:text-[1.56rem]">
                  {item.title}
                </h3>
                <div
                  className="mt-3 inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em]"
                  style={{
                    backgroundColor: theme.panelStrong,
                    color: theme.softText,
                  }}
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
              style={{
                borderColor: theme.border,
                backgroundColor: theme.panelStrong,
                color: theme.softText,
              }}
            >
              {t.businessOutcomes}
            </div>
            <h2 className="font-display mt-5 text-[1.9rem] font-bold sm:text-[2.15rem] lg:text-[2.55rem]">
              {t.businessOutcomes}
            </h2>
          </div>

          <p
            className="max-w-3xl text-[0.95rem] leading-7 lg:ml-auto lg:text-[1.02rem] lg:leading-8"
            style={{ color: theme.mutedText }}
          >
            Clearer operations, less manual drag, and systems that support better decisions as the business scales.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 2xl:grid-cols-4">
          {t.outcomes.map((outcome, index) => (
            <div
              key={outcome}
              className="group relative overflow-hidden rounded-[1.75rem] border p-5 transition-all duration-300 lg:p-6"
              style={{
                borderColor: theme.border,
                background: `linear-gradient(180deg, ${theme.panelStrong} 0%, ${theme.panel} 100%)`,
                boxShadow: `0 20px 64px ${theme.accentSoft}`,
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${theme.accent} 50%, transparent 100%)`,
                  opacity: 0.8,
                }}
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
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.panelStrong,
                      color: theme.accent,
                    }}
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

                <h3 className="font-display mt-10 text-[1.08rem] font-semibold leading-7 lg:text-[1.18rem]" style={{ color: theme.text }}>
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

            <h2 className="font-display text-[2rem] font-bold sm:text-[2.25rem] lg:text-[2.7rem]">{t.contactTitle}</h2>

            <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 sm:text-[1.04rem] lg:text-[1.12rem] lg:leading-8" style={{ color: theme.mutedText }}>
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
              style={{
                borderColor: theme.border,
                background: `linear-gradient(180deg, ${theme.panelStrong} 0%, ${theme.panel} 100%)`,
                boxShadow: `0 24px 80px ${theme.accentSoft}`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className="inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em]"
                  style={{
                    backgroundColor: theme.panelStrong,
                    color: theme.softText,
                  }}
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
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.panel,
                      color: theme.text,
                    }}
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
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.panel,
                      color: theme.text,
                    }}
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
                  style={{
                    borderColor: theme.border,
                    backgroundColor: theme.panel,
                    color: theme.text,
                  }}
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
                    borderColor: theme.border,
                    backgroundColor: theme.panel,
                    color: theme.text,
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
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.panelStrong,
                }}
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
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.panel,
                      color: theme.text,
                    }}
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
                style={{
                  backgroundColor: theme.panelStrong,
                  color: theme.softText,
                }}
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
