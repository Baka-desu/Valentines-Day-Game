export interface ChatResponse {
  text: string;
  type: 'greeting' | 'pickup' | 'compliment' | 'declaration' | 'question' | 'desperate';
}

export const chatResponses: ChatResponse[] = [
  // Greetings
  { text: "OMG HI!!! I've been staring at my phone waiting for you to text me for like 3 hours 😍😍😍", type: "greeting" },
  { text: "FINALLY you're here!! I was about to send a carrier pigeon 🐦💕", type: "greeting" },
  { text: "heyyyy 😘😘😘 (I typed that with 3 kissy faces so you know I'm serious)", type: "greeting" },
  { text: "You just made my whole day, my whole week, my whole LIFE by saying hi 🥺✨", type: "greeting" },

  // Pickup lines
  { text: "Are you a parking ticket? Because you've got FINE written all over you 🚗💕", type: "pickup" },
  { text: "Did it hurt when you fell from heaven? Because your face looks kinda messed up... JUST KIDDING you're GORGEOUS 😭💖", type: "pickup" },
  { text: "Are you made of copper and tellurium? Because you're Cu-Te 🧪❤️ (I googled that)", type: "pickup" },
  { text: "If you were a vegetable, you'd be a cute-cumber 🥒✨ (I have more where that came from)", type: "pickup" },
  { text: "Do you have a Band-Aid? Because I just scraped my knee falling for you... literally I fell down the stairs reading your message 🩹", type: "pickup" },
  { text: "Are you a campfire? Because you're hot and I want s'more 🔥🏕️", type: "pickup" },

  // Compliments
  { text: "You type so beautifully. Like... each letter is a tiny work of art 🎨", type: "compliment" },
  { text: "I bet you look amazing right now. Like, even your elbows are probably cute 💕", type: "compliment" },
  { text: "Your energy through text is immaculate. I can feel your aura through my screen ✨🔮", type: "compliment" },
  { text: "You know what? You're like WiFi - I feel a strong connection 📶💕", type: "compliment" },
  { text: "Every word you type makes flowers grow in my heart garden 🌸🌺🌻 (that's not weird right?)", type: "compliment" },
  { text: "I just showed your message to my mom. She said you seem nice. WE'RE BASICALLY ENGAGED NOW 💍", type: "compliment" },

  // Declarations
  { text: "I think... I think I'm in love with you?? We've exchanged like 3 messages but I KNOW what I feel 😭💖", type: "declaration" },
  { text: "I've already named our kids. Sparkle and Thunder. You can pick the middle names 👶✨⚡", type: "declaration" },
  { text: "I just wrote a 47-page love letter about this conversation. Want me to read it? 📝💕", type: "declaration" },
  { text: "My heart literally just did a backflip. I might need medical attention but it's WORTH IT for you 🏥❤️", type: "declaration" },
  { text: "I've already updated my relationship status in my diary. Yes I have a diary. It's all about you now 📖💕", type: "declaration" },
  { text: "If loving you is wrong, I don't wanna be right. Also I don't know what 'wrong' means anymore because love has CONSUMED me 🔥", type: "declaration" },

  // Questions
  { text: "So like... what's your favorite color? I'm gonna paint my room that color 🎨🏠", type: "question" },
  { text: "What's your love language? Mine is 'aggressive texting at 3am' 📱💕", type: "question" },
  { text: "If we were animals, what would we be? I'd be a puppy following you around EVERYWHERE 🐕", type: "question" },
  { text: "Do you believe in soulmates? Because I believe in you-mates. Get it? Like... you're my mate? I'll stop 🙈", type: "question" },
  { text: "What are you doing for Valentine's Day? And by that I mean what are WE doing? 😏💕", type: "question" },
  { text: "Quick question: on a scale of 1 to marry me, how much do you like me? 💍🤔", type: "question" },

  // Desperate
  { text: "Please don't ever stop talking to me. I've already cleared my schedule. For the rest of my LIFE 📅💕", type: "desperate" },
  { text: "I would walk 500 miles for you. Actually I'd walk 1000 miles. Actually I'd crawl. Through LEGOS 🧱😤💕", type: "desperate" },
  { text: "If you stop replying I will simply pass away. No pressure though 🙃☠️💖", type: "desperate" },
  { text: "I just set your contact name to '❤️🔥THE ONE🔥❤️'. Was that too much? I also added 47 heart emojis.", type: "desperate" },
  { text: "BRB I need to go scream into a pillow because you're SO amazing. Okay I'm back. TELL ME MORE 🥰", type: "desperate" },
  { text: "I made a shrine. JK. Unless... 😳👉👈💕", type: "desperate" },
  { text: "I've been practicing how to say 'I love you' in 47 different languages. Wanna hear? 🌍❤️", type: "desperate" },
  { text: "My therapist says I'm 'too intense' but I think she's just jealous of what we have 💅✨", type: "desperate" },
  { text: "I literally cannot stop smiling. My face hurts. This is a medical emergency caused by YOUR cuteness 🚑😊", type: "desperate" },

  // Keyword responses
  { text: "YOU SAID HI!!! That's literally the nicest thing anyone has ever said to me 😭💕💕💕", type: "greeting" },
  { text: "WAIT DON'T GO!!! I'll do anything! I'll learn to cook! I'll learn your horoscope! PLEASE 😭🙏💕", type: "desperate" },
  { text: "You said the L word... I'm literally shaking and crying and floating all at the same time rn 🥺💖✨", type: "declaration" },
];

export const keywordResponses: Record<string, string[]> = {
  hi: [
    "YOU SAID HI!!! That's literally the nicest thing anyone has ever said to me 😭💕",
    "HIIIII TIMES INFINITY!!! I've been waiting my whole life for this moment 🥺✨",
  ],
  hello: [
    "HELLO?? MORE LIKE HELL-YES because you're talking to me 😍🔥",
    "Hello!! My heart just exploded. Sending you the pieces 💕💔💕",
  ],
  bye: [
    "WAIT DON'T GO!!! I'll learn to juggle if you stay! 😭🤹‍♂️💕",
    "If you leave, I'll simply stare at this chat forever. No pressure 🥺📱",
  ],
  love: [
    "YOU SAID LOVE?? I'M SCREAMING!!! THE NEIGHBORS ARE CONCERNED!!! 😭💖🔊",
    "Love... LOVE... I need to lie down. Actually no, I need to do a victory lap 🏃‍♂️💕",
  ],
  cute: [
    "NO YOU'RE CUTE!! Wait did you call ME cute?? BRB telling everyone I know 📢💕",
    "Cute?? I'm adding this to my resume. 'Was called cute by the love of my life' ✨",
  ],
  funny: [
    "You think I'm funny?? I've been rehearsing these lines for WEEKS 😂💕",
    "Comedy is my second language. My first language is loving you 💖🎤",
  ],
  no: [
    "No?? That's okay!! I respect that!! *cries in 47 languages* 😭💕",
    "Rejection builds character and I am FULL of character at this point 💪😤💖",
  ],
  megan: [
    "DID SOMEONE SAY MEGAN FOX?! She's got nothing on you... okay she has a LITTLE on you 😍🦊",
    "Megan Fox is cool but have you seen... YOU? In this chat? Being amazing?? 💕✨",
  ],
};
