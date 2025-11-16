// Bilingual support (EN/FR) for Gator Bookkeeping

export const translations = {
  en: {
    hero: {
      title: "Save Thousands on Your Taxes",
      subtitle: "Answer 3 simple questions to discover your savings",
      cta: "Calculate My Savings"
    },
    calculator: {
      title: "Tax Savings Calculator",
      q1: {
        question: "What's your annual revenue?",
        options: {
          "0-50k": "Under $50,000",
          "50k-100k": "$50,000 - $100,000",
          "100k-250k": "$100,000 - $250,000",
          "250k-500k": "$250,000 - $500,000",
          "500k+": "Over $500,000"
        }
      },
      q2: {
        question: "How many employees do you have?",
        options: {
          "0": "Just me (sole proprietor)",
          "1-5": "1-5 employees",
          "6-15": "6-15 employees",
          "16-50": "16-50 employees",
          "51+": "51+ employees"
        }
      },
      q3: {
        question: "Which province are you in?",
        provinces: {
          "ON": "Ontario",
          "QC": "Quebec",
          "BC": "British Columbia",
          "AB": "Alberta",
          "SK": "Saskatchewan",
          "MB": "Manitoba",
          "NS": "Nova Scotia",
          "NB": "New Brunswick",
          "PE": "Prince Edward Island",
          "NL": "Newfoundland and Labrador"
        }
      },
      result: {
        title: "You could save",
        perYear: "this year",
        reason: "By maximizing business deductions, CPP optimization, and tax planning strategies.",
        cta: "Get My Savings Plan"
      },
      back: "Back",
      next: "Next"
    },
    leadForm: {
      title: "Get Your Personalized Tax Savings Plan",
      subtitle: "We'll send you a magic link to access your portal",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      submit: "Send Magic Link",
      success: "Check your email! We've sent you a magic link.",
      error: "Something went wrong. Please try again."
    },
    portal: {
      welcome: "Hi {name}! Let's save you money.",
      uploadPrompt: "Drop your T4 here!",
      uploadSuccess: "Great! You're now {status} status!",
      status: {
        bronze: "Bronze",
        silver: "Silver",
        gold: "Gold"
      },
      tabs: {
        overview: "Overview",
        documents: "Documents",
        messages: "Messages",
        payments: "Payments"
      }
    },
    admin: {
      title: "Gator CRM",
      clients: "Clients",
      analytics: "Analytics",
      filters: "Filters"
    },
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success"
    }
  },
  fr: {
    hero: {
      title: "Économisez des milliers sur vos impôts",
      subtitle: "Répondez à 3 questions simples pour découvrir vos économies",
      cta: "Calculer mes économies"
    },
    calculator: {
      title: "Calculateur d'économies d'impôt",
      q1: {
        question: "Quel est votre revenu annuel?",
        options: {
          "0-50k": "Moins de 50 000$",
          "50k-100k": "50 000$ - 100 000$",
          "100k-250k": "100 000$ - 250 000$",
          "250k-500k": "250 000$ - 500 000$",
          "500k+": "Plus de 500 000$"
        }
      },
      q2: {
        question: "Combien d'employés avez-vous?",
        options: {
          "0": "Juste moi (travailleur autonome)",
          "1-5": "1-5 employés",
          "6-15": "6-15 employés",
          "16-50": "16-50 employés",
          "51+": "51+ employés"
        }
      },
      q3: {
        question: "Dans quelle province êtes-vous?",
        provinces: {
          "ON": "Ontario",
          "QC": "Québec",
          "BC": "Colombie-Britannique",
          "AB": "Alberta",
          "SK": "Saskatchewan",
          "MB": "Manitoba",
          "NS": "Nouvelle-Écosse",
          "NB": "Nouveau-Brunswick",
          "PE": "Île-du-Prince-Édouard",
          "NL": "Terre-Neuve-et-Labrador"
        }
      },
      result: {
        title: "Vous pourriez économiser",
        perYear: "cette année",
        reason: "En maximisant les déductions d'entreprise, l'optimisation du RPC et les stratégies fiscales.",
        cta: "Obtenir mon plan d'économies"
      },
      back: "Retour",
      next: "Suivant"
    },
    leadForm: {
      title: "Obtenez votre plan d'économies d'impôt personnalisé",
      subtitle: "Nous vous enverrons un lien magique pour accéder à votre portail",
      firstName: "Prénom",
      lastName: "Nom de famille",
      email: "Adresse courriel",
      submit: "Envoyer le lien magique",
      success: "Vérifiez votre courriel! Nous vous avons envoyé un lien magique.",
      error: "Une erreur s'est produite. Veuillez réessayer."
    },
    portal: {
      welcome: "Bonjour {name}! Économisons ensemble.",
      uploadPrompt: "Déposez votre T4 ici!",
      uploadSuccess: "Super! Vous êtes maintenant statut {status}!",
      status: {
        bronze: "Bronze",
        silver: "Argent",
        gold: "Or"
      },
      tabs: {
        overview: "Aperçu",
        documents: "Documents",
        messages: "Messages",
        payments: "Paiements"
      }
    },
    admin: {
      title: "CRM Gator",
      clients: "Clients",
      analytics: "Analytiques",
      filters: "Filtres"
    },
    common: {
      loading: "Chargement...",
      error: "Erreur",
      success: "Succès"
    }
  }
};

// Auto-detect language
export const detectLanguage = () => {
  // 1. Check localStorage (user preference)
  const saved = localStorage.getItem('gator-language');
  if (saved && (saved === 'en' || saved === 'fr')) return saved;

  // 2. Check URL query param (?lang=fr)
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang === 'fr' || urlLang === 'en') {
    localStorage.setItem('gator-language', urlLang);
    return urlLang;
  }

  // 3. Check browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('fr')) {
    localStorage.setItem('gator-language', 'fr');
    return 'fr';
  }

  // 4. Default to English
  localStorage.setItem('gator-language', 'en');
  return 'en';
};

// Get translation by key path (e.g., "calculator.q1.question")
export const t = (keyPath, lang = 'en', replacements = {}) => {
  const keys = keyPath.split('.');
  let value = translations[lang];

  for (const key of keys) {
    if (value && typeof value === 'object') {
      value = value[key];
    } else {
      return keyPath; // Return key if translation not found
    }
  }

  // Replace placeholders like {name}
  if (typeof value === 'string' && Object.keys(replacements).length > 0) {
    return value.replace(/\{(\w+)\}/g, (match, key) => {
      return replacements[key] !== undefined ? replacements[key] : match;
    });
  }

  return value || keyPath;
};

// Set language
export const setLanguage = (lang) => {
  if (lang === 'en' || lang === 'fr') {
    localStorage.setItem('gator-language', lang);
    window.location.reload(); // Reload to apply language change
  }
};
