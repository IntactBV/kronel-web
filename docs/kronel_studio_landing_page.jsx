import { useEffect, useMemo, useState } from "react";

/* Ultra high-conversion enterprise landing for studio.kronel.io */

const PRIMARY = "#5F24E6";
const SECONDARY = "#7a3cff";
const THEME_ORDER = ["system", "light", "dark"];
const LANGUAGES = ["en", "de", "fr", "el", "ro"];

const translations = {
  en: {
    brand: "KRONEL STUDIO",
    heroTitle1: "We don’t build software.",
    heroTitle2: "We build systems businesses rely on.",
    heroDescription:
      "Kronel Studio designs and delivers custom software systems that transform how companies operate, automate and scale.",
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
    contactTitle: "Let’s discuss the system your business actually needs.",
    contactDescription:
      "If you are serious about building scalable internal software and operational structure, let’s talk.",
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
    heroTitle2: "Nous créons des systèmes sur lesquels les entreprises s’appuient.",
    heroDescription:
      "Kronel Studio conçoit et livre des systèmes logiciels sur mesure qui transforment la manière dont les entreprises fonctionnent, automatisent et se développent.",
    heroExperience:
      "Fondé sur plus de 20 ans d’expérience en développement logiciel via INTACT SRL.",
    bookCall: "Réserver un appel",
    learnMore: "En savoir plus",
    systemImpact: "Impact du système",
    enterpriseReady: "Livraison prête pour l’entreprise",
    efficiency: "Efficacité",
    manualWork: "Travail manuel",
    scalability: "Scalabilité",
    high: "Élevée",
    coreCapabilities: "Compétences clés",
    executionModel: "Modèle d’exécution",
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
          "Plateformes critiques pour l’activité",
          "Outils internes & CRM",
          "Intégrations système complexes",
        ],
      },
      {
        title: "Digitalisation & Automatisation",
        items: [
          "Éliminer les workflows manuels",
          "Architecture des processus",
          "Systèmes d’efficacité opérationnelle",
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
    heroTitle1: "Nu construim doar software.",
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

function ThemeSwitcher({ mode, onToggle, theme, resolvedTheme }) {
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
    <button
      type="button"
      onClick={onToggle}
      aria-label={labels[mode]}
      title={labels[mode]}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition hover:translate-y-[-1px]"
      style={{
        backgroundColor: theme.panel,
        borderColor: theme.border,
        color: theme.mutedText,
      }}
    >
      {icons[mode]}
    </button>
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
    heroGlow: "rgba(122,60,255,0.22)",
    accent: PRIMARY,
    accent2: SECONDARY,
    accentSoft: "rgba(122,60,255,0.1)",
    buttonText: "#FFFFFF",
    secondaryButtonText: "#16121F",
    logoTheme: "light",
  },
};

export default function KronelStudioLandingPage() {
  const [mode, setMode] = useState("system");
  const [systemTheme, setSystemTheme] = useState("dark");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => setSystemTheme(media.matches ? "dark" : "light");

    syncTheme();
    media.addEventListener("change", syncTheme);
    return () => media.removeEventListener("change", syncTheme);
  }, []);

  const resolvedTheme = mode === "system" ? systemTheme : mode;
  const theme = useMemo(() => themeMap[resolvedTheme], [resolvedTheme]);
  const t = translations[language] ?? translations.en;

  const cycleTheme = () => {
    const currentIndex = THEME_ORDER.indexOf(mode);
    const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
    setMode(THEME_ORDER[nextIndex]);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: theme.page,
        color: theme.text,
      }}
    >
      <section className="relative mx-auto max-w-7xl px-4 py-20 lg:py-32">
        <div
          className="absolute -top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 blur-[120px] opacity-30"
          style={{ background: theme.heroGlow }}
        />

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Logo className="h-10 w-10" themeName={theme.logoTheme} />
                <span className="text-sm tracking-[0.28em]" style={{ color: theme.softText }}>
                  {t.brand}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="rounded-full border px-3 py-2 text-xs outline-none transition"
                  style={{
                    backgroundColor: theme.panel,
                    borderColor: theme.border,
                    color: theme.mutedText,
                  }}
                  aria-label="Language selector"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.toUpperCase()}
                    </option>
                  ))}
                </select>

                <ThemeSwitcher
                  mode={mode}
                  onToggle={cycleTheme}
                  theme={theme}
                  resolvedTheme={resolvedTheme}
                />
              </div>
            </div>

            <h1 className="text-4xl font-black leading-[1.05] sm:text-6xl">
              {t.heroTitle1}
              <br />
              <span style={{ color: theme.accent }}>{t.heroTitle2}</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg" style={{ color: theme.mutedText }}>
              {t.heroDescription}
            </p>

            <p className="mt-4 text-sm" style={{ color: theme.softText }}>
              {t.heroExperience}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="rounded-xl px-6 py-4 font-semibold transition hover:translate-y-[-1px]"
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
                className="rounded-xl border px-6 py-4 transition hover:translate-y-[-1px]"
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.panel,
                  color: theme.secondaryButtonText,
                }}
              >
                {t.learnMore}
              </a>
            </div>
          </div>

          <div className="relative">
            <div
              className="rounded-2xl border p-6 backdrop-blur-xl transition-colors duration-300"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.panelStrong,
              }}
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm" style={{ color: theme.softText }}>
                    {t.systemImpact}
                  </div>
                  <div className="mt-2 text-2xl font-semibold">{t.enterpriseReady}</div>
                </div>
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: theme.accentSoft }}
                >
                  <Logo className="h-8 w-8" themeName={theme.logoTheme} />
                </div>
              </div>

              <div className="space-y-3">
                {[
                  [t.efficiency, "+65%"],
                  [t.manualWork, "-50%"],
                  [t.scalability, t.high],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl border px-4 py-3"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.panel,
                    }}
                  >
                    <span style={{ color: theme.mutedText }}>{label}</span>
                    <span style={{ color: theme.accent }} className="font-semibold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="mx-auto max-w-7xl border-t px-4 py-20"
        style={{ borderColor: theme.border }}
      >
        <h2 className="text-3xl font-bold">{t.coreCapabilities}</h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {t.services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border p-6 transition-colors duration-300"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.panel,
              }}
            >
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <ul className="mt-4 space-y-2" style={{ color: theme.mutedText }}>
                {service.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl border-t px-4 py-20"
        style={{ borderColor: theme.border }}
      >
        <h2 className="text-3xl font-bold">{t.executionModel}</h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {t.process.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border p-6 transition-colors duration-300"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.panel,
              }}
            >
              <div className="text-5xl" style={{ color: theme.softText }}>
                {item.step}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3" style={{ color: theme.mutedText }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl border-t px-4 py-20"
        style={{ borderColor: theme.border }}
      >
        <h2 className="text-3xl font-bold">{t.businessOutcomes}</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {t.outcomes.map((outcome) => (
            <div
              key={outcome}
              className="rounded-xl border p-5 transition-colors duration-300"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.panel,
              }}
            >
              {outcome}
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-7xl border-t px-4 py-20"
        style={{ borderColor: theme.border }}
      >
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <Logo className="h-12 w-12" themeName={theme.logoTheme} />
            <div className="text-sm tracking-[0.24em]" style={{ color: theme.softText }}>
              {t.contactEyebrow}
            </div>
          </div>

          <h2 className="text-3xl font-bold">{t.contactTitle}</h2>

          <p className="mt-4 max-w-xl" style={{ color: theme.mutedText }}>
            {t.contactDescription}
          </p>

          <div className="mt-6">
            <a
              href="mailto:sales@kronel.io"
              className="inline-block rounded-xl px-6 py-4 font-semibold transition hover:translate-y-[-1px]"
              style={{
                backgroundColor: theme.accent2,
                color: theme.buttonText,
              }}
            >
              sales@kronel.io
            </a>
          </div>
        </div>
      </section>

      <footer
        className="border-t px-4 py-6 text-sm transition-colors duration-300"
        style={{ borderColor: theme.border, color: theme.softText }}
      >
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-3">
            <Logo className="h-6 w-6" themeName={theme.logoTheme} />
            <span>{t.brand}</span>
          </div>
          <div>{t.operatedBy}</div>
        </div>
      </footer>
    </div>
  );
}
