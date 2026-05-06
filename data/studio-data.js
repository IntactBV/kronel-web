import languageSettings from "../app/studio/languages.json";

export const PRIMARY = "#5F24E6";
export const SECONDARY = "#7a3cff";
export const THEME_ORDER = ["system", "light", "dark"];
export const LANGUAGE_SETTINGS = languageSettings.countries ?? {};
export const isLanguageEnabled = (config) =>
  typeof config === "boolean" ? config : config?.enabled !== false;
export const LANGUAGES = Object.entries(LANGUAGE_SETTINGS)
  .filter(([, config]) => isLanguageEnabled(config))
  .map(([languageCode]) => languageCode);
export const DEFAULT_LANGUAGE = LANGUAGES[0] ?? "en";
export const STORAGE_KEYS = {
  mode: "kronel.studio.themeMode",
  language: "kronel.studio.language",
};
export const LANGUAGE_LABELS = Object.fromEntries(
  Object.entries(LANGUAGE_SETTINGS).map(([languageCode, config]) => [
    languageCode,
    languageSettings.labels?.[languageCode] ?? config?.label ?? languageCode.toUpperCase(),
  ]),
);
export const ROMANIAN_LANGUAGE_CODE = "ro";
export const ROMANIA_COUNTRY_CODE = "RO";
export const ROMANIA_TIME_ZONE = "Europe/Bucharest";

export function getCookieValue(name) {
  if (typeof document === "undefined") return "";

  return (
    document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(`${name}=`))
      ?.split("=")[1] ?? ""
  );
}

export function getDetectedDefaultLanguage() {
  if (!LANGUAGES.includes(ROMANIAN_LANGUAGE_CODE)) {
    return DEFAULT_LANGUAGE;
  }

  export const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  export const usesRomanian = browserLanguages.some((browserLanguage) =>
    browserLanguage?.toLowerCase().startsWith("ro"),
  );

  if (usesRomanian) {
    return ROMANIAN_LANGUAGE_CODE;
  }

  export const countryCode = decodeURIComponent(getCookieValue("kronel.country")).toUpperCase();
  if (countryCode === ROMANIA_COUNTRY_CODE) {
    return ROMANIAN_LANGUAGE_CODE;
  }

  export const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timeZone === ROMANIA_TIME_ZONE) {
    return ROMANIAN_LANGUAGE_CODE;
  }

  return DEFAULT_LANGUAGE;
}

export const OUTCOME_LONG_COPY = {
  en: [
    "Teams work from one clearer operational picture instead of scattered tools, duplicated files, and informal status updates. That creates stronger ownership, fewer blind spots, and faster coordination across the business. Leaders gain better visibility into what is moving, what is blocked, and where attention is actually needed.",
    "Manual effort drops when repeated checks, updates, handoffs, and data entry are built into the system instead of depending on memory. Teams spend less time pushing information around and more time on meaningful work. That reduces errors, shortens delays, and makes the business less dependent on a few key people.",
    "A scalable internal system gives the business room to grow without multiplying friction. More clients, more work, and more team members can be absorbed through structure instead of improvised process. The result is better consistency, easier change management, and far more control as operational complexity increases.",
    "Structured systems improve decisions because the underlying data becomes more consistent, visible, and trustworthy. Teams spend less time debating what is true and more time deciding what to do next. Over time, that leads to better prioritization, stronger forecasting, and a business that improves with much more intention.",
  ],
};

export const CONTACT_FORM_COPY = {
  en: {
    title: "Send a project brief",
    description: "Share the basics and the message will be stored locally in your studio inbox.",
    teaserTitle: "Ready to describe the system you need?",
    teaserText: "Open a short brief form and leave the core details. Your message will be sent to the Kronel team, reviewed carefully, and followed up with a solution shaped around your needs.",
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
  de: {
    title: "Projektbrief senden",
    description: "Teilen Sie die wichtigsten Angaben. Die Nachricht wird lokal in Ihrem Studio-Posteingang gespeichert.",
    teaserTitle: "Bereit, das System zu beschreiben, das Sie brauchen?",
    teaserText: "Öffnen Sie ein kurzes Briefing-Formular und hinterlassen Sie die wichtigsten Details. Ihre Nachricht wird an das Kronel-Team gesendet, sorgfältig analysiert und mit einer Lösung beantwortet, die auf Ihre Anforderungen abgestimmt ist.",
    open: "Formular öffnen",
    cancel: "Abbrechen",
    name: "Name",
    email: "E-Mail",
    company: "Unternehmen",
    message: "Nachricht",
    captcha: "Captcha",
    captchaPlaceholder: "Ergebnis eingeben",
    captchaLoading: "Prüfung wird geladen...",
    captchaRefresh: "Prüfung aktualisieren",
    captchaError: "Die Captcha-Prüfung kann im Moment nicht geladen werden.",
    captchaHint: "Diese kurze Prüfung hilft, automatisierten Spam zu blockieren.",
    submit: "Nachricht senden",
    sending: "E-Mail wird gesendet...",
    success: "Ihre E-Mail wurde gesendet. Wir prüfen Ihr Briefing und melden uns bei Ihnen.",
    error: "Beim Speichern der Nachricht ist etwas schiefgelaufen.",
    inbox: "Posteingang öffnen",
  },
  fr: {
    title: "Envoyer un brief projet",
    description: "Partagez les informations essentielles. Le message sera enregistré localement dans votre boîte de réception studio.",
    teaserTitle: "Prêt à décrire le système dont vous avez besoin ?",
    teaserText: "Ouvrez un court formulaire de brief et laissez les détails clés. Votre message sera transmis à l'équipe Kronel, analysé avec attention, puis suivi d'une solution adaptée à vos besoins.",
    open: "Ouvrir le formulaire",
    cancel: "Annuler",
    name: "Nom",
    email: "E-mail",
    company: "Entreprise",
    message: "Message",
    captcha: "Captcha",
    captchaPlaceholder: "Saisir le résultat",
    captchaLoading: "Chargement du défi...",
    captchaRefresh: "Actualiser le défi",
    captchaError: "Impossible de charger le défi captcha pour le moment.",
    captchaHint: "Cette vérification rapide aide à bloquer le spam automatisé.",
    submit: "Envoyer le message",
    sending: "Envoi de l'e-mail...",
    success: "Votre e-mail a été envoyé. Nous étudierons votre brief et reviendrons vers vous.",
    error: "Une erreur est survenue lors de l'enregistrement du message.",
    inbox: "Ouvrir la boîte de réception",
  },
  el: {
    title: "Στείλτε brief έργου",
    description: "Μοιραστείτε τα βασικά στοιχεία. Το μήνυμα θα αποθηκευτεί τοπικά στο studio inbox σας.",
    teaserTitle: "Έτοιμοι να περιγράψετε το σύστημα που χρειάζεστε;",
    teaserText: "Ανοίξτε μια σύντομη φόρμα brief και αφήστε τις βασικές λεπτομέρειες. Το μήνυμά σας θα σταλεί στην ομάδα Kronel, θα αναλυθεί προσεκτικά και θα ακολουθήσει πρόταση λύσης προσαρμοσμένη στις ανάγκες σας.",
    open: "Άνοιγμα φόρμας",
    cancel: "Ακύρωση",
    name: "Όνομα",
    email: "Email",
    company: "Εταιρεία",
    message: "Μήνυμα",
    captcha: "Captcha",
    captchaPlaceholder: "Εισάγετε το αποτέλεσμα",
    captchaLoading: "Φόρτωση ελέγχου...",
    captchaRefresh: "Ανανέωση ελέγχου",
    captchaError: "Δεν είναι δυνατή η φόρτωση του captcha αυτή τη στιγμή.",
    captchaHint: "Αυτός ο σύντομος έλεγχος βοηθά στον αποκλεισμό αυτοματοποιημένου spam.",
    submit: "Αποστολή μηνύματος",
    sending: "Αποστολή email...",
    success: "Το email σας στάλθηκε. Θα εξετάσουμε το brief σας και θα επικοινωνήσουμε μαζί σας.",
    error: "Κάτι πήγε στραβά κατά την αποθήκευση του μηνύματος.",
    inbox: "Άνοιγμα inbox",
  },
  ro: {
    title: "Trimite un brief de proiect",
    description: "Trimite detaliile esențiale, iar mesajul va fi salvat local în inbox-ul studio.",
    teaserTitle: "Ești gata să descrii sistemul de care ai nevoie?",
    teaserText: "Deschide un formular scurt de brief și lasă detaliile principale. Mesajul tău va ajunge la echipa Kronel, va fi analizat cu atenție, iar noi vom reveni cu o soluție potrivită nevoilor tale.",
    open: "Deschide formularul",
    cancel: "Anulează",
    name: "Nume",
    email: "Email",
    company: "Companie",
    message: "Mesaj",
    captcha: "Captcha",
    captchaPlaceholder: "Introdu rezultatul",
    captchaLoading: "Se încarcă verificarea...",
    captchaRefresh: "Reîmprospătează verificarea",
    captchaError: "Verificarea captcha nu poate fi încărcată momentan.",
    captchaHint: "Această verificare rapidă ajută la blocarea spamului automat.",
    submit: "Trimite mesajul",
    sending: "Se trimite emailul...",
    success: "Emailul tău a fost trimis. Vom analiza brief-ul și revenim către tine.",
    error: "Ceva nu a funcționat la salvarea mesajului.",
    inbox: "Deschide inbox-ul",
  },
};

export const translations = {
  en: {
    brand: "KRONEL STUDIO",
    heroTitle1: "We don't just build software.",
    heroTitle2: "We build systems that businesses can rely on.",
    heroDescription:
      "Kronel Studio designs and delivers custom software systems that transform how organizations operate, automate and scale.",
    heroExperience:
      "Built on over 20 years of software development experience through INTACT SRL.",
    visionEyebrow: "Why Kronel exists",
    visionTitle: "Our vision is a business that runs on clarity, not operational noise.",
    visionDescription:
      "We believe companies should operate through dependable systems instead of fragmented tools, manual work, and process hidden in people's heads. We build the structure that makes execution cleaner, decisions faster, and growth more stable.",
    visionVisualTitle: "Systems that replace noise with signal.",
    visionVisualCaption: "Fragmented operations resolve into one dependable flow.",
    engineeringEyebrow: "Built for real operations",
    engineeringTitle: "Engineered for speed, resilience, and systems that fit the business.",
    engineeringDescription:
      "Our delivery approach is built around platforms that stay responsive under pressure, keep data structured and reliable, scale without operational drag, and support intelligent automation shaped around how your business actually works.",
    engineeringVisualTitle: "Precision infrastructure, adaptable flow.",
    engineeringVisualCaption: "Performance, continuity, and automation designed around the way the business moves.",
    mobileEyebrow: "Mobile applications",
    mobileTitle: "Any mobile application your business needs to perform faster.",
    mobileDescription:
      "We design and build custom mobile applications around the workflows, data, roles, and decisions that actually move your business. From field operations and client portals to internal productivity tools, every app is built to reduce friction, accelerate execution, and give teams the right capability wherever work happens.",
    mobileVisualTitle: "Business capability, engineered for the device in your team's hand.",
    mobileVisualCaption: "Native-feeling mobile systems connected to the operation behind them.",
    websiteEyebrow: "Websites and web platforms",
    websiteTitle: "Premium websites engineered to turn trust into action.",
    websiteDescription:
      "We create business websites, product pages, landing pages, and client-facing web experiences that do more than look polished. Every site is shaped around clarity, performance, conversion, SEO structure, analytics, and the integrations needed to turn interest into measurable business movement.",
    websiteVisualTitle: "A website should behave like a business asset, not a static brochure.",
    websiteVisualCaption: "Presentation, performance, conversion, and data flow connected into one web experience.",
    websiteFormats: "Websites • Landing pages • Portals",
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
    visionPoints: [
      {
        title: "From fragmented to connected",
        text: "Disconnected workflows, spreadsheets, and approvals are consolidated into one operational system.",
      },
      {
        title: "From reactive to structured",
        text: "Teams stop improvising around bottlenecks and start operating with clear logic and dependable flow.",
      },
      {
        title: "From growth to durable scale",
        text: "The business gains infrastructure that can absorb more people, more work, and more complexity without chaos.",
      },
    ],
    engineeringPillars: [
      {
        title: "Responsive under load",
        text: "Critical workflows stay fast and usable even as data volume, users, and operational pressure increase.",
      },
      {
        title: "Structured, reliable data",
        text: "Information stays consistent, searchable, and trustworthy so teams can act with more confidence.",
      },
      {
        title: "Scalable by design",
        text: "The system is built to handle growth cleanly instead of becoming fragile as complexity expands.",
      },
      {
        title: "Automation that fits reality",
        text: "Automated and intelligent workflows are shaped around the business model instead of forcing the business to adapt to the tool.",
      },
    ],
    mobileCapabilities: [
      {
        title: "Built around the workflow",
        text: "Every screen, action, and notification is shaped around the job your users need to complete.",
      },
      {
        title: "Connected to core systems",
        text: "Mobile experiences can integrate with CRMs, ERPs, APIs, dashboards, and operational data.",
      },
      {
        title: "Performance in the field",
        text: "Fast, resilient interfaces keep teams productive when work happens away from a desk.",
      },
    ],
    websiteCapabilities: [
      {
        title: "Built for credibility",
        text: "Clear messaging, refined UX, and premium visual structure help visitors understand why your company is worth trusting.",
      },
      {
        title: "Built for conversion",
        text: "Every page can guide interested visitors toward clear actions, so inquiries become easier to track and turn into real opportunities.",
      },
      {
        title: "Built to perform",
        text: "Fast loading, responsive layouts, SEO structure, and reliable foundations keep the site useful as traffic grows.",
      },
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
    visionEyebrow: "Warum Kronel existiert",
    visionTitle: "Unsere Vision ist ein Unternehmen, das auf Klarheit statt auf operativem Rauschen basiert.",
    visionDescription:
      "Wir sind überzeugt, dass Unternehmen mit verlässlichen Systemen arbeiten sollten statt mit fragmentierten Tools, manueller Arbeit und Prozessen, die nur im Kopf einzelner Menschen existieren. Wir bauen die Struktur, die Ausführung sauberer, Entscheidungen schneller und Wachstum stabiler macht.",
    visionVisualTitle: "Systeme, die Rauschen durch klare Signale ersetzen.",
    visionVisualCaption: "Fragmentierte Abläufe werden zu einem verlässlichen Gesamtfluss.",
    engineeringEyebrow: "Für reale Abläufe gebaut",
    engineeringTitle: "Entwickelt für Geschwindigkeit, Stabilität und Systeme, die zum Unternehmen passen.",
    engineeringDescription:
      "Unser Ansatz zielt auf Plattformen, die auch unter Last schnell bleiben, Daten sauber und verlässlich halten, ohne operative Reibung skalieren und intelligente Automatisierung entlang Ihrer realen Abläufe ermöglichen.",
    engineeringVisualTitle: "Präzise Infrastruktur, anpassungsfähiger Fluss.",
    engineeringVisualCaption: "Performance, Kontinuität und Automatisierung entlang echter Geschäftsbewegung.",
    mobileEyebrow: "Mobile Anwendungen",
    mobileTitle: "Jede mobile Anwendung, die Ihr Unternehmen für mehr Leistung braucht.",
    mobileDescription:
      "Wir entwickeln maßgeschneiderte mobile Anwendungen rund um die Abläufe, Daten, Rollen und Entscheidungen, die Ihr Unternehmen wirklich bewegen. Von Außendienstprozessen und Kundenportalen bis zu internen Produktivitätstools wird jede App darauf ausgelegt, Reibung zu reduzieren, Ausführung zu beschleunigen und Teams dort handlungsfähig zu machen, wo Arbeit passiert.",
    mobileVisualTitle: "Business-Fähigkeit, entwickelt für das Gerät in der Hand Ihres Teams.",
    mobileVisualCaption: "Mobile Systeme mit nativem Nutzungserlebnis, verbunden mit dem operativen Kern.",
    websiteEyebrow: "Websites und Webplattformen",
    websiteTitle: "Premium-Websites, entwickelt um Vertrauen in Handlung zu verwandeln.",
    websiteDescription:
      "Wir erstellen Unternehmenswebsites, Produktseiten, Landingpages und kundenseitige Web-Erlebnisse, die mehr leisten als nur gut auszusehen. Jede Website wird auf Klarheit, Performance, Conversion, SEO-Struktur, Analytics und die Integrationen ausgerichtet, die Interesse in messbare Geschäftsbewegung verwandeln.",
    websiteVisualTitle: "Eine Website sollte wie ein Business-Asset funktionieren, nicht wie eine statische Broschüre.",
    websiteVisualCaption: "Präsentation, Performance, Conversion und Datenfluss verbunden in einem Web-Erlebnis.",
    websiteFormats: "Websites • Landingpages • Portale",
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
    visionPoints: [
      {
        title: "Von fragmentiert zu verbunden",
        text: "Getrennte Abläufe, Tabellen und Freigaben werden zu einem gemeinsamen operativen System zusammengeführt.",
      },
      {
        title: "Von reaktiv zu strukturiert",
        text: "Teams improvisieren nicht mehr um Engpässe herum, sondern arbeiten mit klarer Logik und verlässlichem Ablauf.",
      },
      {
        title: "Von Wachstum zu belastbarer Skalierung",
        text: "Das Unternehmen erhält eine Infrastruktur, die mehr Menschen, mehr Arbeit und mehr Komplexität ohne Chaos aufnehmen kann.",
      },
    ],
    engineeringPillars: [
      {
        title: "Reaktionsschnell unter Last",
        text: "Kritische Abläufe bleiben schnell und nutzbar, auch wenn Datenmenge, Nutzerzahl und Druck steigen.",
      },
      {
        title: "Strukturierte, verlässliche Daten",
        text: "Informationen bleiben konsistent, auffindbar und belastbar, damit Teams sicherer handeln können.",
      },
      {
        title: "Auf Skalierung ausgelegt",
        text: "Das System ist für Wachstum gebaut und wird nicht fragil, sobald die Komplexität zunimmt.",
      },
      {
        title: "Automatisierung, die zur Realität passt",
        text: "Automatisierte und intelligente Abläufe orientieren sich am Geschäftsmodell statt das Unternehmen an das Werkzeug zu zwingen.",
      },
    ],
    mobileCapabilities: [
      {
        title: "Um den Workflow gebaut",
        text: "Jeder Screen, jede Aktion und jede Benachrichtigung folgt der Aufgabe, die Nutzer wirklich erledigen müssen.",
      },
      {
        title: "Mit Kernsystemen verbunden",
        text: "Mobile Erlebnisse können mit CRMs, ERPs, APIs, Dashboards und operativen Daten integriert werden.",
      },
      {
        title: "Leistung im Einsatz",
        text: "Schnelle, stabile Oberflächen halten Teams produktiv, wenn Arbeit nicht am Schreibtisch stattfindet.",
      },
    ],
    websiteCapabilities: [
      {
        title: "Für Glaubwürdigkeit gebaut",
        text: "Klare Botschaften, durchdachte UX und eine hochwertige visuelle Struktur helfen Besuchern zu verstehen, warum Ihr Unternehmen Vertrauen verdient.",
      },
      {
        title: "Für Conversion gebaut",
        text: "Jede Seite kann interessierte Besucher zu klaren Aktionen führen, damit Anfragen leichter nachvollziehbar werden und echte Chancen entstehen.",
      },
      {
        title: "Für Performance gebaut",
        text: "Schnelle Ladezeiten, responsive Layouts, SEO-Struktur und stabile Grundlagen halten die Website auch bei wachsendem Traffic nutzbar.",
      },
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
    visionEyebrow: "Pourquoi Kronel existe",
    visionTitle: "Notre vision est une entreprise qui fonctionne avec clarté, pas dans le bruit opérationnel.",
    visionDescription:
      "Nous pensons que les entreprises doivent fonctionner avec des systèmes fiables plutôt qu'avec des outils fragmentés, du travail manuel et des processus enfermés dans la tête des personnes. Nous construisons la structure qui rend l'exécution plus nette, les décisions plus rapides et la croissance plus stable.",
    visionVisualTitle: "Des systèmes qui remplacent le bruit par un signal clair.",
    visionVisualCaption: "Les opérations fragmentées convergent vers un flux fiable.",
    engineeringEyebrow: "Pensé pour les opérations réelles",
    engineeringTitle: "Conçu pour la vitesse, la résilience et des systèmes adaptés au métier.",
    engineeringDescription:
      "Notre approche privilégie des plateformes qui restent réactives sous pression, gardent des données structurées et fiables, montent en charge sans friction opérationnelle et soutiennent une automatisation intelligente alignée sur votre réalité métier.",
    engineeringVisualTitle: "Infrastructure précise, flux adaptable.",
    engineeringVisualCaption: "Performance, continuité et automatisation conçues autour du mouvement réel de l'entreprise.",
    mobileEyebrow: "Applications mobiles",
    mobileTitle: "Toute application mobile dont votre entreprise a besoin pour gagner en performance.",
    mobileDescription:
      "Nous concevons et développons des applications mobiles sur mesure autour des workflows, des données, des rôles et des décisions qui font réellement avancer votre activité. Des opérations terrain aux portails clients en passant par les outils internes de productivité, chaque application est pensée pour réduire la friction, accélérer l'exécution et donner aux équipes la bonne capacité là où le travail se fait.",
    mobileVisualTitle: "Une capacité métier, conçue pour l'appareil que vos équipes ont en main.",
    mobileVisualCaption: "Des systèmes mobiles fluides, connectés au fonctionnement opérationnel.",
    websiteEyebrow: "Sites web et plateformes web",
    websiteTitle: "Des sites premium conçus pour transformer la confiance en action.",
    websiteDescription:
      "Nous créons des sites d'entreprise, pages produit, landing pages et expériences web client qui ne se contentent pas d'être élégants. Chaque site est pensé autour de la clarté, de la performance, de la conversion, de la structure SEO, de l'analytics et des intégrations nécessaires pour transformer l'intérêt en mouvement business mesurable.",
    websiteVisualTitle: "Un site web doit fonctionner comme un actif business, pas comme une brochure statique.",
    websiteVisualCaption: "Présentation, performance, conversion et flux de données réunis dans une seule expérience web.",
    websiteFormats: "Sites web • Landing pages • Portails",
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
    visionPoints: [
      {
        title: "Du fragmenté au connecté",
        text: "Les workflows dispersés, les tableurs et les validations sont réunis dans un seul système opérationnel.",
      },
      {
        title: "Du réactif au structuré",
        text: "Les équipes cessent d'improviser face aux blocages et travaillent avec une logique claire et un flux fiable.",
      },
      {
        title: "De la croissance à l'échelle durable",
        text: "L'entreprise obtient une infrastructure capable d'absorber plus d'équipes, plus de travail et plus de complexité sans chaos.",
      },
    ],
    engineeringPillars: [
      {
        title: "Réactif sous charge",
        text: "Les flux critiques restent rapides et exploitables même lorsque les volumes, les utilisateurs et la pression augmentent.",
      },
      {
        title: "Données structurées et fiables",
        text: "L'information reste cohérente, exploitable et digne de confiance pour décider avec plus d'assurance.",
      },
      {
        title: "Évolutif par conception",
        text: "Le système est pensé pour grandir proprement au lieu de devenir fragile quand la complexité augmente.",
      },
      {
        title: "Une automatisation ancrée dans le réel",
        text: "Les workflows automatisés et intelligents s'adaptent au métier au lieu d'obliger le métier à s'adapter à l'outil.",
      },
    ],
    mobileCapabilities: [
      {
        title: "Construit autour du workflow",
        text: "Chaque écran, action et notification suit la tâche que les utilisateurs doivent réellement accomplir.",
      },
      {
        title: "Connecté aux systèmes clés",
        text: "Les expériences mobiles peuvent s'intégrer aux CRM, ERP, API, tableaux de bord et données opérationnelles.",
      },
      {
        title: "Performance sur le terrain",
        text: "Des interfaces rapides et résilientes maintiennent la productivité lorsque le travail se fait loin du bureau.",
      },
    ],
    websiteCapabilities: [
      {
        title: "Conçu pour la crédibilité",
        text: "Des messages clairs, une UX soignée et une structure visuelle premium aident les visiteurs à comprendre pourquoi votre entreprise mérite leur confiance.",
      },
      {
        title: "Conçu pour la conversion",
        text: "Chaque page peut guider les visiteurs intéressés vers des actions claires, pour rendre les demandes plus faciles à suivre et les transformer en vraies opportunités.",
      },
      {
        title: "Conçu pour performer",
        text: "Chargement rapide, layouts responsives, structure SEO et bases fiables gardent le site utile quand le trafic augmente.",
      },
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
    visionEyebrow: "Γιατί υπάρχει η Kronel",
    visionTitle: "Το όραμά μας είναι μια επιχείρηση που λειτουργεί με καθαρότητα, όχι με λειτουργικό θόρυβο.",
    visionDescription:
      "Πιστεύουμε ότι οι εταιρείες πρέπει να λειτουργούν μέσα από αξιόπιστα συστήματα και όχι μέσα από κατακερματισμένα εργαλεία, χειροκίνητη εργασία και διαδικασίες που υπάρχουν μόνο στο μυαλό των ανθρώπων. Χτίζουμε τη δομή που κάνει την εκτέλεση πιο καθαρή, τις αποφάσεις ταχύτερες και την ανάπτυξη πιο σταθερή.",
    visionVisualTitle: "Συστήματα που μετατρέπουν τον θόρυβο σε καθαρό σήμα.",
    visionVisualCaption: "Οι κατακερματισμένες λειτουργίες γίνονται μία αξιόπιστη ροή.",
    engineeringEyebrow: "Χτισμένο για πραγματικές λειτουργίες",
    engineeringTitle: "Σχεδιασμένο για ταχύτητα, ανθεκτικότητα και συστήματα που ταιριάζουν στην επιχείρηση.",
    engineeringDescription:
      "Η προσέγγισή μας δίνει πλατφόρμες που παραμένουν γρήγορες υπό πίεση, κρατούν τα δεδομένα δομημένα και αξιόπιστα, κλιμακώνονται χωρίς λειτουργική τριβή και υποστηρίζουν έξυπνους αυτοματισμούς προσαρμοσμένους στον πραγματικό τρόπο λειτουργίας της επιχείρησης.",
    engineeringVisualTitle: "Ακριβής υποδομή, προσαρμόσιμη ροή.",
    engineeringVisualCaption: "Απόδοση, συνέχεια και αυτοματοποίηση σχεδιασμένες γύρω από την πραγματική κίνηση της επιχείρησης.",
    mobileEyebrow: "Mobile εφαρμογές",
    mobileTitle: "Κάθε mobile εφαρμογή που χρειάζεται η επιχείρησή σας για υψηλότερη απόδοση.",
    mobileDescription:
      "Σχεδιάζουμε και αναπτύσσουμε προσαρμοσμένες mobile εφαρμογές γύρω από τις ροές εργασίας, τα δεδομένα, τους ρόλους και τις αποφάσεις που κινούν πραγματικά την επιχείρηση. Από λειτουργίες πεδίου και portals πελατών μέχρι εσωτερικά εργαλεία παραγωγικότητας, κάθε εφαρμογή μειώνει την τριβή, επιταχύνει την εκτέλεση και δίνει στις ομάδες τη σωστή δυνατότητα εκεί όπου γίνεται η δουλειά.",
    mobileVisualTitle: "Επιχειρησιακή δυνατότητα, σχεδιασμένη για τη συσκευή που κρατά η ομάδα σας.",
    mobileVisualCaption: "Mobile συστήματα με φυσική εμπειρία χρήσης, συνδεδεμένα με τον λειτουργικό πυρήνα.",
    websiteEyebrow: "Websites και web πλατφόρμες",
    websiteTitle: "Premium websites σχεδιασμένα να μετατρέπουν την εμπιστοσύνη σε δράση.",
    websiteDescription:
      "Δημιουργούμε εταιρικά websites, σελίδες προϊόντων, landing pages και web εμπειρίες για πελάτες που κάνουν περισσότερα από το να δείχνουν προσεγμένα. Κάθε site σχεδιάζεται γύρω από καθαρότητα, απόδοση, conversion, SEO δομή, analytics και τις ενσωματώσεις που μετατρέπουν το ενδιαφέρον σε μετρήσιμη επιχειρησιακή κίνηση.",
    websiteVisualTitle: "Ένα website πρέπει να λειτουργεί ως επιχειρησιακό asset, όχι ως στατική μπροσούρα.",
    websiteVisualCaption: "Παρουσίαση, απόδοση, conversion και ροή δεδομένων ενωμένα σε μία web εμπειρία.",
    websiteFormats: "Websites • Landing pages • Portals",
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
    visionPoints: [
      {
        title: "Από τον κατακερματισμό στη σύνδεση",
        text: "Διάσπαρτες ροές εργασίας, αρχεία και εγκρίσεις ενοποιούνται σε ένα κοινό λειτουργικό σύστημα.",
      },
      {
        title: "Από την αντίδραση στη δομή",
        text: "Οι ομάδες σταματούν να αυτοσχεδιάζουν γύρω από τα εμπόδια και λειτουργούν με καθαρή λογική και αξιόπιστη ροή.",
      },
      {
        title: "Από την ανάπτυξη στη βιώσιμη κλιμάκωση",
        text: "Η επιχείρηση αποκτά υποδομή που αντέχει περισσότερους ανθρώπους, περισσότερη δουλειά και μεγαλύτερη πολυπλοκότητα χωρίς χάος.",
      },
    ],
    engineeringPillars: [
      {
        title: "Ανταπόκριση υπό φόρτο",
        text: "Οι κρίσιμες ροές μένουν γρήγορες και χρηστικές ακόμη κι όταν αυξάνονται ο όγκος, οι χρήστες και η πίεση.",
      },
      {
        title: "Δομημένα και αξιόπιστα δεδομένα",
        text: "Η πληροφορία παραμένει συνεπής, αναζητήσιμη και αξιόπιστη ώστε οι ομάδες να κινούνται με περισσότερη βεβαιότητα.",
      },
      {
        title: "Κλιμάκωση από τον σχεδιασμό",
        text: "Το σύστημα είναι χτισμένο για ανάπτυξη χωρίς να γίνεται εύθραυστο όσο αυξάνεται η πολυπλοκότητα.",
      },
      {
        title: "Αυτοματοποίηση που ταιριάζει στην πραγματικότητα",
        text: "Οι αυτοματοποιημένες και έξυπνες ροές προσαρμόζονται στο επιχειρησιακό μοντέλο αντί να το αναγκάζουν να προσαρμοστεί στο εργαλείο.",
      },
    ],
    mobileCapabilities: [
      {
        title: "Χτισμένο γύρω από τη ροή εργασίας",
        text: "Κάθε οθόνη, ενέργεια και ειδοποίηση ακολουθεί τη δουλειά που οι χρήστες πρέπει πραγματικά να ολοκληρώσουν.",
      },
      {
        title: "Σύνδεση με βασικά συστήματα",
        text: "Οι mobile εμπειρίες μπορούν να ενσωματωθούν με CRM, ERP, API, dashboards και επιχειρησιακά δεδομένα.",
      },
      {
        title: "Απόδοση στο πεδίο",
        text: "Γρήγορα και ανθεκτικά interfaces κρατούν τις ομάδες παραγωγικές όταν η εργασία γίνεται μακριά από το γραφείο.",
      },
    ],
    websiteCapabilities: [
      {
        title: "Χτισμένο για αξιοπιστία",
        text: "Καθαρά μηνύματα, προσεγμένο UX και premium οπτική δομή βοηθούν τους επισκέπτες να καταλάβουν γιατί η εταιρεία σας αξίζει εμπιστοσύνη.",
      },
      {
        title: "Χτισμένο για conversion",
        text: "Κάθε σελίδα μπορεί να οδηγεί τους ενδιαφερόμενους επισκέπτες σε καθαρές ενέργειες, ώστε τα αιτήματα να παρακολουθούνται πιο εύκολα και να γίνονται πραγματικές ευκαιρίες.",
      },
      {
        title: "Χτισμένο για απόδοση",
        text: "Γρήγορη φόρτωση, responsive layouts, SEO δομή και αξιόπιστα θεμέλια κρατούν το site χρήσιμο όσο αυξάνεται η επισκεψιμότητα.",
      },
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
    visionEyebrow: "De ce există Kronel",
    visionTitle: "Viziunea noastră este o companie care funcționează prin claritate, nu prin zgomot operațional.",
    visionDescription:
      "Credem că firmele ar trebui să opereze prin sisteme de încredere, nu prin tool-uri fragmentate, muncă manuală și procese ținute doar în capul oamenilor. Construim structura care face execuția mai clară, deciziile mai rapide și creșterea mai stabilă.",
    visionVisualTitle: "Sisteme care înlocuiesc zgomotul cu semnal clar.",
    visionVisualCaption: "Operațiunile fragmentate se transformă într-un singur flux de încredere.",
    engineeringEyebrow: "Construit pentru operațiuni reale",
    engineeringTitle: "Proiectat pentru viteză, reziliență și sisteme care se potrivesc business-ului.",
    engineeringDescription:
      "Abordarea noastră urmărește platforme care rămân rapide sub presiune, păstrează datele structurate și de încredere, scalează fără fricțiune operațională și susțin automatizări inteligente modelate după felul real în care funcționează compania.",
    engineeringVisualTitle: "Infrastructură precisă, flux adaptabil.",
    engineeringVisualCaption: "Performanță, continuitate și automatizare gândite în jurul mișcării reale a business-ului.",
    mobileEyebrow: "Aplicații mobile",
    mobileTitle: "Orice aplicație mobilă de care compania ta are nevoie pentru performanță mai mare.",
    mobileDescription:
      "Proiectăm și dezvoltăm aplicații mobile custom în jurul fluxurilor, datelor, rolurilor și deciziilor care mișcă efectiv business-ul. De la operațiuni pe teren și portaluri pentru clienți până la instrumente interne de productivitate, fiecare aplicație este construită să reducă fricțiunea, să accelereze execuția și să ofere echipelor capabilitatea potrivită oriunde se desfășoară munca.",
    mobileVisualTitle: "Capabilitate de business, proiectată pentru dispozitivul din mâna echipei tale.",
    mobileVisualCaption: "Sisteme mobile cu experiență naturală, conectate la operațiunea din spate.",
    websiteEyebrow: "Website-uri și platforme web",
    websiteTitle: "Website-uri premium proiectate să transforme încrederea în acțiune.",
    websiteDescription:
      "Creăm website-uri de prezentare, pagini de produs, landing pages și experiențe web pentru clienți care fac mai mult decât să arate bine. Fiecare site este gândit pentru claritate, performanță, conversie, structură SEO, analytics și integrările necesare ca interesul să devină mișcare de business măsurabilă.",
    websiteVisualTitle: "Un website ar trebui să funcționeze ca un activ de business, nu ca o broșură statică.",
    websiteVisualCaption: "Prezentare, performanță, conversie și flux de date conectate într-o singură experiență web.",
    websiteFormats: "Website-uri • Landing pages • Portaluri",
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
    visionPoints: [
      {
        title: "De la fragmentat la conectat",
        text: "Fluxurile de lucru separate, tabelele și aprobările sunt reunite într-un singur sistem operațional.",
      },
      {
        title: "De la reactiv la structurat",
        text: "Echipele nu mai improvizează în jurul blocajelor, ci lucrează cu logică clară și flux de încredere.",
      },
      {
        title: "De la creștere la scalare durabilă",
        text: "Business-ul capătă infrastructura necesară pentru a absorbi mai mulți oameni, mai mult volum și mai multă complexitate fără haos.",
      },
    ],
    engineeringPillars: [
      {
        title: "Rapid sub presiune",
        text: "Fluxurile critice rămân rapide și utilizabile chiar când cresc volumul, utilizatorii și presiunea operațională.",
      },
      {
        title: "Date structurate și de încredere",
        text: "Informația rămâne coerentă, ușor de urmărit și credibilă, astfel încât echipele să decidă cu mai multă claritate.",
      },
      {
        title: "Scalare prin design",
        text: "Sistemul este construit să crească sănătos, fără să devină fragil pe măsură ce complexitatea se extinde.",
      },
      {
        title: "Automatizare potrivită realității",
        text: "Fluxurile automate și inteligente sunt modelate după business, nu după constrângerile unui tool.",
      },
    ],
    mobileCapabilities: [
      {
        title: "Construită în jurul fluxului",
        text: "Fiecare ecran, acțiune și notificare urmează sarcina pe care utilizatorii trebuie să o ducă la capăt.",
      },
      {
        title: "Conectată la sisteme esențiale",
        text: "Experiențele mobile se pot integra cu CRM-uri, ERP-uri, API-uri, dashboard-uri și date operaționale.",
      },
      {
        title: "Performanță în teren",
        text: "Interfețele rapide și reziliente mențin echipele productive când munca se întâmplă departe de birou.",
      },
    ],
    websiteCapabilities: [
      {
        title: "Construit pentru credibilitate",
        text: "Mesajele clare, UX-ul rafinat și structura vizuală premium îi ajută pe vizitatori să înțeleagă de ce compania ta merită încredere.",
      },
      {
        title: "Construit pentru conversie",
        text: "Fiecare pagină poate ghida vizitatorii interesați către acțiuni clare, astfel încât cererile să fie mai ușor de urmărit și să devină oportunități reale.",
      },
      {
        title: "Construit pentru performanță",
        text: "Încărcarea rapidă, layout-urile responsive, structura SEO și fundația stabilă păstrează site-ul util pe măsură ce traficul crește.",
      },
    ],
  },
};


export const themeMap = {
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
