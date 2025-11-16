import confetti from 'canvas-confetti';

// Trigger confetti celebration
export const triggerConfetti = (options = {}) => {
  const defaults = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#2D5F3F', '#FFB966', '#4CAF50', '#E8F5E9']
  };

  confetti({
    ...defaults,
    ...options
  });
};

// Status upgrade confetti (more intense)
export const statusUpgradeConfetti = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#2D5F3F', '#FFB966', '#4CAF50']
    });

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#2D5F3F', '#FFB966', '#4CAF50']
    });
  }, 250);
};

// Gold status confetti (ultimate celebration)
export const goldStatusConfetti = () => {
  const duration = 5000;
  const animationEnd = Date.now() + duration;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#FFB966', '#FFD700', '#FFA500']
    });

    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#FFB966', '#FFD700', '#FFA500']
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  }());
};

// File upload success confetti
export const uploadSuccessConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.7 },
    colors: ['#4CAF50', '#2D5F3F', '#E8F5E9']
  });
};
