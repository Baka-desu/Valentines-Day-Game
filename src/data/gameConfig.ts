export interface MeganLocation {
  id: string;
  x: number;
  y: number;
  size: number;
}

export interface GameLevel {
  id: string;
  name: string;
  description: string;
  megans: MeganLocation[];
  bgColor: string;
  bgImage: string;
  clutter: string[];
}

export const gameLevels: GameLevel[] = [
  {
    id: "level-1",
    name: "2000s Nostalgia Blast",
    description: "Find Megan hiding among the flip phones and frosted tips!",
    megans: [
      { id: "l1-m1", x: 15, y: 25, size: 45 },
      { id: "l1-m2", x: 72, y: 60, size: 40 },
      { id: "l1-m3", x: 45, y: 80, size: 35 },
      { id: "l1-m4", x: 88, y: 15, size: 42 },
    ],
    bgColor: "from-pink-400 via-purple-400 to-indigo-400",
    bgImage: "/images/level1-bg.png",
    clutter: [
      "📱", "💿", "🎵", "⭐", "🌟", "📀", "🎧", "🎮", "📺", "🎤",
      "👑", "💎", "🦋", "🌈", "✨", "💫", "🎸", "🎹", "📻", "🕹️",
      "🎭", "🎪", "🎠", "🎡", "🎢", "🎬", "🎨", "🎯", "🎲", "🎰",
      "🧸", "🎀", "💄", "👠", "👗", "🕶️", "📸", "💌", "🎁", "🎈",
    ],
  },
  {
    id: "level-2",
    name: "Meme Dimension",
    description: "She's hiding in the memes! Much search. Very Megan. Wow.",
    megans: [
      { id: "l2-m1", x: 25, y: 40, size: 38 },
      { id: "l2-m2", x: 60, y: 20, size: 35 },
      { id: "l2-m3", x: 80, y: 70, size: 32 },
      { id: "l2-m4", x: 10, y: 75, size: 36 },
      { id: "l2-m5", x: 50, y: 55, size: 30 },
    ],
    bgColor: "from-yellow-400 via-green-400 to-cyan-400",
    bgImage: "/images/level2-bg.png",
    clutter: [
      "🐸", "☕", "🐕", "🌮", "😂", "💀", "🗿", "🤡", "👽", "🤖",
      "🦍", "🐱", "🐶", "🦊", "🐻", "🐼", "🐨", "🦁", "🐯", "🦄",
      "🌚", "🌝", "🌞", "🔥", "💥", "⚡", "🌊", "🍕", "🍔", "🌭",
      "🎃", "👻", "💩", "🤠", "🥴", "🤪", "😎", "🤓", "🥸", "🤯",
      "🦆", "🦈", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟",
    ],
  },
  {
    id: "level-3",
    name: "MAXIMUM CHAOS",
    description: "Pure chaos. Megan is everywhere and nowhere. Good luck.",
    megans: [
      { id: "l3-m1", x: 20, y: 30, size: 28 },
      { id: "l3-m2", x: 55, y: 15, size: 26 },
      { id: "l3-m3", x: 75, y: 45, size: 24 },
      { id: "l3-m4", x: 35, y: 70, size: 30 },
      { id: "l3-m5", x: 90, y: 85, size: 22 },
      { id: "l3-m6", x: 8, y: 55, size: 25 },
    ],
    bgColor: "from-red-500 via-pink-500 to-purple-600",
    bgImage: "/images/level3-bg.png",
    clutter: [
      "📱", "💿", "🐸", "☕", "🗿", "🦍", "💀", "🤡", "👽", "🤖",
      "⭐", "🌟", "💫", "✨", "🔥", "💥", "⚡", "🌊", "🎸", "🎹",
      "🐕", "🐱", "🦊", "🐻", "🦁", "🐯", "🦄", "🐼", "🦆", "🦈",
      "🍕", "🍔", "🌮", "🌭", "🍟", "🍩", "🎂", "🍪", "🧁", "🍦",
      "👑", "💎", "🦋", "🌈", "🎭", "🎪", "🎠", "🎡", "🎢", "🎬",
      "💄", "👠", "👗", "🕶️", "📸", "💌", "🎁", "🎈", "🎀", "🧸",
      "🤠", "🥴", "🤪", "😎", "🤓", "🥸", "🤯", "😂", "🥹", "😈",
    ],
  },
];

export const happinessMilestones = [
  { threshold: 25, message: "Getting warmer! 🌡️" },
  { threshold: 50, message: "HALFWAY THERE! 🔥" },
  { threshold: 75, message: "Almost there bestie! 💕" },
  { threshold: 90, message: "CRITICAL MASS APPROACHING! ⚠️💖" },
  { threshold: 100, message: "MAXIMUM CRINGE ACHIEVED! 🎉💕🎉" },
];
