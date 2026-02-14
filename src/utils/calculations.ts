export function calculateLovePercentage(name1: string, name2: string): number {
  const n1 = name1.trim().toLowerCase();
  const n2 = name2.trim().toLowerCase();

  if (n1.includes("megan fox") || n2.includes("megan fox")) {
    return 1000000;
  }

  const combined = n1 + n2;
  let sum = 0;
  for (let i = 0; i < combined.length; i++) {
    sum += combined.charCodeAt(i) * (i + 1);
  }

  const base = ((sum * 7 + 13) % 89) + 11;
  const lengthBonus = Math.min((n1.length + n2.length) % 10, 5);

  return Math.min(base + lengthBonus, 100);
}

export function getLoveMessage(percentage: number): string {
  if (percentage >= 1000000) return "MEGAN FOX?! SAY LESS!!! 🦊💕🔥💕🔥";
  if (percentage >= 90) return "SOULMATES ALERT! The universe has SPOKEN! 💕💕💕";
  if (percentage >= 80) return "You two are disgustingly perfect together 🥰";
  if (percentage >= 60) return "Ooh la la! Things are getting SPICY 🌶️💕";
  if (percentage >= 40) return "There's potential here... if you squint really hard 👀";
  if (percentage >= 20) return "Friendship goals! ...just friendship though 😅";
  return "Yikes... maybe try different names? Or bribery? 😬";
}

export function checkMeganHit(
  clickX: number,
  clickY: number,
  megans: Array<{ x: number; y: number; size: number; id: string }>,
  foundMegans: string[]
): string | null {
  for (const megan of megans) {
    if (foundMegans.includes(megan.id)) continue;
    const dx = clickX - megan.x;
    const dy = clickY - megan.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const hitRadius = megan.size / 2 + 2;
    if (distance <= hitRadius) {
      return megan.id;
    }
  }
  return null;
}
