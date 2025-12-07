// Rate limiting utility to prevent abuse
// Stores attempt counts in localStorage with timestamps

const RATE_LIMITS = {
  signIn: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: 'Too many sign-in attempts. Please try again in 15 minutes.'
  },
  signUp: {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many registration attempts. Please try again in 1 hour.'
  },
  oauth: {
    maxAttempts: 10,
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: 'Too many OAuth attempts. Please try again in 15 minutes.'
  }
};

/**
 * Check if an action is rate limited
 * @param {string} action - The action type (signIn, signUp, oauth)
 * @param {string} identifier - Email or IP (for now using action type only)
 * @returns {Object} { allowed: boolean, message: string, retryAfter: number }
 */
export const checkRateLimit = (action, identifier = 'default') => {
  const limit = RATE_LIMITS[action];
  if (!limit) {
    console.warn(`Unknown rate limit action: ${action}`);
    return { allowed: true };
  }

  const key = `rateLimit_${action}_${identifier}`;
  const now = Date.now();

  // Get stored attempts
  const stored = localStorage.getItem(key);
  let attempts = stored ? JSON.parse(stored) : [];

  // Filter out old attempts outside the time window
  attempts = attempts.filter(timestamp => now - timestamp < limit.windowMs);

  // Check if limit exceeded
  if (attempts.length >= limit.maxAttempts) {
    const oldestAttempt = Math.min(...attempts);
    const retryAfter = Math.ceil((oldestAttempt + limit.windowMs - now) / 1000 / 60); // minutes

    return {
      allowed: false,
      message: limit.message,
      retryAfter: retryAfter
    };
  }

  // Add current attempt
  attempts.push(now);
  localStorage.setItem(key, JSON.stringify(attempts));

  return { allowed: true };
};

/**
 * Clear rate limit for a specific action (e.g., after successful login)
 * @param {string} action - The action type
 * @param {string} identifier - Email or identifier
 */
export const clearRateLimit = (action, identifier = 'default') => {
  const key = `rateLimit_${action}_${identifier}`;
  localStorage.removeItem(key);
};

/**
 * Get remaining attempts before rate limit
 * @param {string} action - The action type
 * @param {string} identifier - Email or identifier
 * @returns {number} Remaining attempts
 */
export const getRemainingAttempts = (action, identifier = 'default') => {
  const limit = RATE_LIMITS[action];
  if (!limit) return Infinity;

  const key = `rateLimit_${action}_${identifier}`;
  const now = Date.now();

  const stored = localStorage.getItem(key);
  let attempts = stored ? JSON.parse(stored) : [];

  // Filter out old attempts
  attempts = attempts.filter(timestamp => now - timestamp < limit.windowMs);

  return Math.max(0, limit.maxAttempts - attempts.length);
};
