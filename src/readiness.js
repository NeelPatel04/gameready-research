// Scoring logic lives here (separate from the UI) so it is easy to test and explain.

export const LIMITS = {
  sleep: { min: 0, max: 14 },
  time: { min: 0, max: 180 },
};

// Returns an object of error messages; empty object means the inputs are valid.
export function validate({ sleep, time }) {
  const errors = {};
  const s = Number(sleep);
  const t = Number(time);

  if (sleep === "" || Number.isNaN(s)) errors.sleep = "Enter your hours of sleep.";
  else if (s < LIMITS.sleep.min || s > LIMITS.sleep.max)
    errors.sleep = `Sleep must be between ${LIMITS.sleep.min} and ${LIMITS.sleep.max} hours.`;

  if (time === "" || Number.isNaN(t)) errors.time = "Enter the minutes you have.";
  else if (t < LIMITS.time.min || t > LIMITS.time.max)
    errors.time = `Time must be between ${LIMITS.time.min} and ${LIMITS.time.max} minutes.`;

  return errors;
}

const LEVEL_POINTS = { Low: 1, Medium: 2, High: 3 };

// Each factor is worth 1-3 points. "Good" direction differs per factor.
export function calculateReadiness({ sleep, energy, soreness, stress, hydration, time }) {
  const s = Number(sleep);
  const t = Number(time);

  const sleepPts = s >= 8 ? 3 : s >= 6 ? 2 : 1;
  const energyPts = LEVEL_POINTS[energy];
  const sorenessPts = 4 - LEVEL_POINTS[soreness]; 
  const stressPts = 4 - LEVEL_POINTS[stress]; 
  const hydrationPts = LEVEL_POINTS[hydration];
  const timePts = t >= 60 ? 3 : t >= 30 ? 2 : 1;

  const score = sleepPts + energyPts + sorenessPts + stressPts + hydrationPts + timePts;
  const max = 18;
  const percent = Math.round((score / max) * 100);

  const tips = [];
  if (sleepPts === 1) tips.push("Aim for 7-9 hours of sleep tonight.");
  if (hydrationPts === 1) tips.push("Drink water before and during training.");
  if (stressPts === 1) tips.push("High stress slows recovery. Try a short walk or breathing break.");
  if (sorenessPts === 1) tips.push("Prioritize stretching and mobility for sore muscles.");

  let result;
  if (percent >= 70) {
    result = {
      level: "high",
      title: "Full training session",
      text: "You look ready for your planned workout. Go for a 45-60 minute strength or conditioning session.",
    };
  } else if (percent >= 50) {
    result = {
      level: "medium",
      title: "Modified workout",
      text: "Your readiness is moderate. Try a shorter session, lighter weights, or fewer sets.",
    };
  } else {
    result = {
      level: "low",
      title: "Recovery day",
      text: "Your body may need rest. Choose stretching, mobility work, walking, and extra sleep over hard training.",
    };
  }

  return { ...result, score, max, percent, tips };
}