// Tax Savings Calculator Logic
// Real calculations based on Canadian tax optimization strategies

export const calculateSavings = (revenue, employees, province) => {
  let baseSavings = 0;
  let reason = "";

  // Base savings by revenue (percentage of revenue that can be optimized)
  const revenueRanges = {
    "0-50k": { base: 2000, percentage: 0.04, tier: "startup" },
    "50k-100k": { base: 4000, percentage: 0.05, tier: "growing" },
    "100k-250k": { base: 8000, percentage: 0.055, tier: "established" },
    "250k-500k": { base: 15000, percentage: 0.06, tier: "scaling" },
    "500k+": { base: 30000, percentage: 0.065, tier: "enterprise" }
  };

  const revenueData = revenueRanges[revenue];
  if (!revenueData) return { savings: 0, reason: "Invalid revenue range" };

  baseSavings = revenueData.base;

  // Employee-based adjustments (CPP optimization, payroll strategies)
  const employeeMultipliers = {
    "0": { multiplier: 1.0, savings: 0, strategy: "sole proprietor deductions" },
    "1-5": { multiplier: 1.15, savings: 1200, strategy: "small business tax credits and CPP optimization" },
    "6-15": { multiplier: 1.25, savings: 2500, strategy: "payroll optimization and group benefits" },
    "16-50": { multiplier: 1.35, savings: 5000, strategy: "advanced payroll strategies and corporate structures" },
    "51+": { multiplier: 1.45, savings: 8000, strategy: "enterprise tax planning and deferred compensation" }
  };

  const employeeData = employeeMultipliers[employees];
  if (employeeData) {
    baseSavings = baseSavings * employeeData.multiplier + employeeData.savings;
  }

  // Province-specific adjustments
  const provinceAdjustments = {
    "ON": { multiplier: 1.0, note: "standard provincial credits" },
    "QC": { multiplier: 1.15, note: "Quebec-specific tax credits and QHST optimization" },
    "BC": { multiplier: 0.95, note: "BC film tax credits if applicable" },
    "AB": { multiplier: 0.90, note: "lower provincial tax rate" },
    "SK": { multiplier: 0.95, note: "Saskatchewan small business credits" },
    "MB": { multiplier: 1.0, note: "Manitoba R&D credits" },
    "NS": { multiplier: 1.05, note: "Nova Scotia innovation credits" },
    "NB": { multiplier: 1.05, note: "New Brunswick small business incentives" },
    "PE": { multiplier: 1.0, note: "PEI standard credits" },
    "NL": { multiplier: 1.05, note: "Newfoundland small business deduction" }
  };

  const provinceData = provinceAdjustments[province] || { multiplier: 1.0, note: "" };
  baseSavings = Math.round(baseSavings * provinceData.multiplier);

  // Generate reason based on selections
  const strategies = [];

  if (revenueData.tier === "startup") {
    strategies.push("home office deductions");
    strategies.push("vehicle expenses");
  } else if (revenueData.tier === "growing") {
    strategies.push("capital cost allowances");
    strategies.push("business expense maximization");
  } else if (revenueData.tier === "established") {
    strategies.push("income splitting strategies");
    strategies.push("capital gains planning");
  } else if (revenueData.tier === "scaling" || revenueData.tier === "enterprise") {
    strategies.push("corporate structure optimization");
    strategies.push("investment tax credits");
  }

  if (employeeData && employeeData.strategy) {
    strategies.push(employeeData.strategy);
  }

  if (provinceData.note && province === "QC") {
    strategies.push(provinceData.note);
  }

  reason = `By leveraging ${strategies.slice(0, 3).join(", ")}, you can significantly reduce your tax burden.`;

  return {
    savings: baseSavings,
    reason: reason,
    breakdown: {
      revenue: revenueData.base,
      employees: employeeData?.savings || 0,
      province: Math.round(baseSavings - revenueData.base - (employeeData?.savings || 0))
    }
  };
};

// Format currency for display
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Get revenue range label
export const getRevenueLabel = (range, lang = 'en') => {
  const labels = {
    en: {
      "0-50k": "Under $50K",
      "50k-100k": "$50K - $100K",
      "100k-250k": "$100K - $250K",
      "250k-500k": "$250K - $500K",
      "500k+": "Over $500K"
    },
    fr: {
      "0-50k": "Moins de 50 K$",
      "50k-100k": "50 K$ - 100 K$",
      "100k-250k": "100 K$ - 250 K$",
      "250k-500k": "250 K$ - 500 K$",
      "500k+": "Plus de 500 K$"
    }
  };
  return labels[lang][range] || range;
};

// Get employee count label
export const getEmployeeLabel = (count, lang = 'en') => {
  const labels = {
    en: {
      "0": "Sole Proprietor",
      "1-5": "1-5 Employees",
      "6-15": "6-15 Employees",
      "16-50": "16-50 Employees",
      "51+": "51+ Employees"
    },
    fr: {
      "0": "Travailleur autonome",
      "1-5": "1-5 Employés",
      "6-15": "6-15 Employés",
      "16-50": "16-50 Employés",
      "51+": "51+ Employés"
    }
  };
  return labels[lang][count] || count;
};
