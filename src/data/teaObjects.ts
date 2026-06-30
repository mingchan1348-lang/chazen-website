export type TeaObject = {
  number: string;
  english: string;
  chinese: string;
  purpose: string;
  meaning: string;
  used: string;
  note: string;
  sound: string;
  soundLabel: string;
  video: string;
  brewingRole: string;
  x: string;
  y: string;
};

export const teaObjects: TeaObject[] = [
  {
    number: "01",
    english: "Gaiwan",
    chinese: "蓋碗",
    purpose: "A lidded bowl used to brew loose-leaf tea with precision, fragrance, and speed.",
    meaning: "The lid gathers aroma, the bowl reveals colour, and the saucer carries heat with respect.",
    used: "Used during warming, receiving leaves, brewing, controlling aroma, and pouring.",
    note: "Its open form lets the host observe colour, steam, leaf expansion, and timing.",
    sound: "/audio/tea-pour.mp3",
    soundLabel: "Tea Pouring",
    video: "/video/gaiwan-ritual.mp4",
    brewingRole: "The host reads heat, colour, fragrance, and time through one open vessel.",
    x: "48%",
    y: "42%"
  },
  {
    number: "02",
    english: "Fairness Cup",
    chinese: "公道杯",
    purpose: "Receives brewed liquor before serving so every cup has equal strength.",
    meaning: "Hospitality becomes an ethic designed into the pour.",
    used: "Used immediately after each infusion leaves the gaiwan.",
    note: "Its name carries fairness. The vessel makes equality visible before the first sip.",
    sound: "/audio/tea-pour.mp3",
    soundLabel: "Tea Pouring",
    video: "/video/gaiwan-ritual.mp4",
    brewingRole: "It equalises the infusion so the first guest and last guest receive the same tea.",
    x: "63%",
    y: "34%"
  },
  {
    number: "03",
    english: "Tasting Cup",
    chinese: "品茗杯",
    purpose: "A small cup that concentrates aroma, warmth, and texture.",
    meaning: "The cup asks the drinker to pause before judgment.",
    used: "Used after the fairness cup distributes each infusion.",
    note: "Small volume keeps the tea alive through repeated infusions rather than one large serving.",
    sound: "/audio/tea-pour.mp3",
    soundLabel: "Tea Pouring",
    video: "/video/gaiwan-ritual.mp4",
    brewingRole: "It turns tasting into attention: aroma first, warmth second, texture last.",
    x: "72%",
    y: "58%"
  },
  {
    number: "04",
    english: "Tea Scoop",
    chinese: "茶則",
    purpose: "Transfers dry leaves cleanly and measures abundance with restraint.",
    meaning: "Generosity without excess, precision without harshness.",
    used: "Used when moving leaves from presentation vessel into gaiwan.",
    note: "The scoop is a discipline of proportion: enough leaf to speak, not enough to shout.",
    sound: "/audio/tea-pour.mp3",
    soundLabel: "Tea Pouring",
    video: "/video/gaiwan-ritual.mp4",
    brewingRole: "It sets proportion before water arrives, shaping intensity without spectacle.",
    x: "28%",
    y: "60%"
  },
  {
    number: "05",
    english: "Tea Tongs",
    chinese: "茶夾",
    purpose: "Handles hot cups and protects the drinking rim from unnecessary touch.",
    meaning: "Care appears as cleanliness, distance, and restraint.",
    used: "Used during warming, rinsing, arranging, and resetting cups.",
    note: "Refinement often means removing the hand when the tool can serve more respectfully.",
    sound: "/audio/tea-pour.mp3",
    soundLabel: "Tea Pouring",
    video: "/video/gaiwan-ritual.mp4",
    brewingRole: "It preserves cleanliness while hot vessels move through the ritual sequence.",
    x: "22%",
    y: "48%"
  },
  {
    number: "06",
    english: "Tea Tray",
    chinese: "茶盤",
    purpose: "A drained stage for water, vessels, and controlled movement.",
    meaning: "It contains overflow so the room can remain visually still.",
    used: "Used throughout the full brewing sequence.",
    note: "The tray makes abundance quiet. Water can move freely while the ritual remains composed.",
    sound: "/audio/tea-pour.mp3",
    soundLabel: "Tea Pouring",
    video: "/video/gaiwan-ritual.mp4",
    brewingRole: "It gives water a hidden path so the table can remain calm and exact.",
    x: "50%",
    y: "52%"
  },
  {
    number: "07",
    english: "Tea Cloth",
    chinese: "茶巾",
    purpose: "Wipes water marks and restores calm between gestures.",
    meaning: "Cleanliness is visual stillness.",
    used: "Used between pours and whenever the table needs a quiet reset.",
    note: "The cloth is the rhythm nobody notices until it is missing.",
    sound: "/audio/tea-pour.mp3",
    soundLabel: "Tea Pouring",
    video: "/video/gaiwan-ritual.mp4",
    brewingRole: "It erases excess water, allowing each gesture to begin from quiet again.",
    x: "34%",
    y: "75%"
  },
  {
    number: "08",
    english: "Waste Bowl",
    chinese: "水盂",
    purpose: "Receives rinse water, old heat, and the first discarded infusion.",
    meaning: "Release is part of refinement.",
    used: "Used during warming, rinsing, and clearing.",
    note: "The bowl gives letting go a place on the table.",
    sound: "/audio/tea-pour.mp3",
    soundLabel: "Tea Pouring",
    video: "/video/gaiwan-ritual.mp4",
    brewingRole: "It keeps the necessary discard dignified, contained, and intentional.",
    x: "80%",
    y: "42%"
  },
  {
    number: "09",
    english: "Tea Needle",
    chinese: "茶針",
    purpose: "Clears spouts and opens compressed leaves with delicacy.",
    meaning: "Precision without force.",
    used: "Used when a vessel or compressed tea needs gentle opening.",
    note: "The needle reminds the host that force is rarely elegance.",
    sound: "/audio/tea-pour.mp3",
    soundLabel: "Tea Pouring",
    video: "/video/gaiwan-ritual.mp4",
    brewingRole: "It solves obstruction with delicacy, preserving the vessel and the leaf.",
    x: "18%",
    y: "66%"
  },
  {
    number: "10",
    english: "Tea Presentation Vessel",
    chinese: "茶荷",
    purpose: "Presents dry leaves so guests can read shape, fragrance, and origin before brewing.",
    meaning: "A pause of respect before water transforms the leaf.",
    used: "Used before the leaves enter the warmed gaiwan.",
    note: "The leaf is first treated as an object of origin: mountain, season, craft, and weather.",
    sound: "/audio/tea-pour.mp3",
    soundLabel: "Tea Pouring",
    video: "/video/gaiwan-ritual.mp4",
    brewingRole: "It turns dry leaf into a museum object before it becomes drink.",
    x: "35%",
    y: "36%"
  },
  {
    number: "11",
    english: "Singing Bowl",
    chinese: "冥想鉢",
    purpose: "A sound object used to mark the threshold before stillness and tea.",
    meaning: "One tone turns ordinary time into ritual time.",
    used: "Used before a practice, a quiet pour, or Stillness Mode.",
    note: "Not a gongfu necessity, but a CHAZEN threshold object: sound before water.",
    sound: "/audio/singing-bowl.mp3",
    soundLabel: "Singing Bowl",
    video: "/video/stillness-room.mp4",
    brewingRole: "It marks the threshold between ordinary time and ritual time.",
    x: "18%",
    y: "32%"
  }
];
