export interface PickupLineTemplate {
  template: string;
  requiredFields: string[];
}

export const pickupLines: PickupLineTemplate[] = [
  { template: "Are you a Wi-Fi signal? Because I'm feeling a very weak connection to {name} but I'm desperate to stay logged in.", requiredFields: ["name"] },
  { template: "Hey {name}, are you {food}? Because you're making my heart melt faster than cheese in a microwave.", requiredFields: ["name", "food"] },
  { template: "If {hobby} was a crime, you'd be serving a life sentence... in my heart. Also you'd be a {adjective} criminal.", requiredFields: ["hobby", "adjective"] },
  { template: "Are you a {animal}? Because you just made my heart do a {adjective} backflip, {name}.", requiredFields: ["name", "animal", "adjective"] },
  { template: "Roses are {color}, violets are also {color} apparently, I'm colorblind but I can see you're {adjective}, {name}.", requiredFields: ["name", "color", "adjective"] },
  { template: "I must be a {animal} because every time I see {name}, I forget how to function like a normal human being.", requiredFields: ["name", "animal"] },
  { template: "Is your name Google? Because {name}, you have everything I've been searching for... mostly {food} recipes.", requiredFields: ["name", "food"] },
  { template: "If you were {food}, you'd be the {adjective} kind. And I'd eat you... wait no. I'd HAVE you for dinner. No wait—", requiredFields: ["food", "adjective"] },
  { template: "Hey {name}, do you like {hobby}? Because I'd {hobby} with you until the {animal}s come home. All the {animal}s.", requiredFields: ["name", "hobby", "animal"] },
  { template: "I'm not a photographer, but I can picture {name} and me doing {hobby} together forever in a {color} sunset.", requiredFields: ["name", "hobby", "color"] },
  { template: "Are you a magician? Because whenever I look at {name}, everyone else disappears... probably because they're cringing.", requiredFields: ["name"] },
  { template: "If I were a {animal}, I'd give you my last {food}. That's the most {adjective} thing I can think of.", requiredFields: ["animal", "food", "adjective"] },
  { template: "They say love is blind, so {name}, please don't look at me too closely. But my {hobby} skills? *chef's kiss* {adjective}.", requiredFields: ["name", "hobby", "adjective"] },
  { template: "{name}, you're like {food} on a Friday night—absolutely {adjective} and I need you in my life immediately.", requiredFields: ["name", "food", "adjective"] },
  { template: "I wrote you a poem: Roses are {color}, my face is too, because every time {name} walks by I trip over a {animal}.", requiredFields: ["name", "color", "animal"] },
  { template: "If beauty were a {animal}, you'd be the whole zoo, {name}. A {adjective}, {color} zoo of love.", requiredFields: ["name", "animal", "adjective", "color"] },
  { template: "My love for {name} is like {food}—messy, {adjective}, and I definitely need more of it.", requiredFields: ["name", "food", "adjective"] },
  { template: "Do you believe in love at first sight, or should I walk by again doing {hobby}? I'll be wearing {color}.", requiredFields: ["hobby", "color"] },
  { template: "If I could rearrange the alphabet, I'd put U and I together... and also {name} because three's not a crowd when {hobby} is involved.", requiredFields: ["name", "hobby"] },
  { template: "Hey {name}, you must be made of {color} diamonds because you're {adjective} and way out of my league. Like a {animal} trying to fly.", requiredFields: ["name", "color", "adjective", "animal"] },
  { template: "I'd cross every ocean for you, {name}. I'd also cross the street but that's scarier because of the {animal}s.", requiredFields: ["name", "animal"] },
  { template: "On a scale of 1 to {food}, you're a {adjective} 11, {name}. And I can't even count that high when you're around.", requiredFields: ["name", "food", "adjective"] },
  { template: "You know what's on the menu? Me-n-{name}, a plate of {food}, and the most {adjective} evening of {hobby} you've ever seen.", requiredFields: ["name", "food", "adjective", "hobby"] },
  { template: "I'm like a {color} {animal} — weird, {adjective}, but somehow lovable. Just give me a chance, {name}!", requiredFields: ["name", "color", "animal", "adjective"] },
  { template: "Life without {name} is like {food} without seasoning. {adjective}. Dry. Desperately missing something {color}.", requiredFields: ["name", "food", "adjective", "color"] },
];
