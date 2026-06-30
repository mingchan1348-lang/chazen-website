export type TeaHistoryItem = {
  number: string;
  title: string;
  chinese: string;
  copy: string;
  expanded: string;
  keywords: string[];
  image: string;
};

export type KnowledgeCard = {
  title: string;
  chinese: string;
  copy: string;
  image: string;
  details: string[];
  href: string;
};

export const teaHistoryItems: TeaHistoryItem[] = [
  {
    number: "01",
    title: "Mythic Origin",
    chinese: "神農傳說",
    copy: "Tea began in legend as medicine and observation.",
    expanded: "The earliest tea stories place the leaf between mountain, herb, and body. Before tea became refinement, it was watched as medicine and lived as practical knowledge.",
    keywords: ["medicine", "mountain", "observation"],
    image: "chazen-tea-collection-v1.png"
  },
  {
    number: "02",
    title: "Tang Dynasty",
    chinese: "唐代",
    copy: "Lu Yu and The Classic of Tea. Tea became written, studied, and systematised.",
    expanded: "Lu Yu gave tea a language of water, fire, vessel, and method. With The Classic of Tea, drinking became a cultural form that could be studied and transmitted.",
    keywords: ["scholarship", "method", "text"],
    image: "chazen-arrival-room.avif"
  },
  {
    number: "03",
    title: "Song Dynasty",
    chinese: "宋代",
    copy: "Dian Cha, Jian ware, and scholar tea culture. Tea became visual, tactile, and aesthetic.",
    expanded: "Powdered tea was whisked into foam and judged by surface, bowl, and rhythm. The Song room made tea an art of restraint, touch, and cultivated sight.",
    keywords: ["aesthetic", "dian cha", "Jian ware"],
    image: "chazen-song-diancha-v1.png"
  },
  {
    number: "04",
    title: "Ming Dynasty",
    chinese: "明代",
    copy: "Brewing shifts toward leaf infusion and more direct vessel use.",
    expanded: "Loose-leaf tea brought the leaf back into direct contact with vessel, water, and eye. The gaiwan and teapot became intimate instruments of clarity.",
    keywords: ["loose leaf", "vessel", "infusion"],
    image: "chazen-tea-table-topdown-v3.png"
  },
  {
    number: "05",
    title: "Qing Dynasty",
    chinese: "清代",
    copy: "Gongfu tea matures as a refined, repeatable daily ritual.",
    expanded: "Small cups, repeated infusions, and southern tea rooms made technique part of everyday refinement. Tea became a practice of precision without display.",
    keywords: ["gongfu", "hospitality", "daily ritual"],
    image: "chazen-hero-gongfu-room-v3.png"
  },
  {
    number: "06",
    title: "Contemporary CHAZEN",
    chinese: "當代茶禪",
    copy: "Tea returns as ritual, sound, meditation, and meaningful gifting.",
    expanded: "Today CHAZEN brings tea back as a complete cultural room: leaf, vessel, silence, sound, and gift. The ritual becomes a way to return attention to the present.",
    keywords: ["stillness", "sound", "gifting"],
    image: "chazen-gift-box-v1.png"
  }
];

export const knowledgeCards: KnowledgeCard[] = [
  {
    title: "Lu Yu",
    chinese: "陸羽與茶經",
    copy: "The Tang scholar Lu Yu gave tea language, method, and cultural form. The Classic of Tea made drinking a studied art rather than a casual habit.",
    image: "chazen-arrival-room.avif",
    details: ["Era: Tang Dynasty", "Role: Tea scholar", "Contribution: The Classic of Tea formalised tea culture"],
    href: "#tea-history"
  },
  {
    title: "Song Dian Cha",
    chinese: "宋代點茶",
    copy: "Powdered tea was whisked into a luminous surface. Technique, bowl, foam, and scholar taste became a single aesthetic practice.",
    image: "chazen-song-diancha-v1.png",
    details: ["Era: Song Dynasty", "Practice: powdered tea whisking", "Aesthetic: bowl, foam, rhythm, scholarship"],
    href: "#chapter-index"
  },
  {
    title: "Jian Ware",
    chinese: "建盞",
    copy: "Black-glazed bowls made pale tea foam visible. Their iron-rich surfaces turned drinking into an encounter with light and mineral depth.",
    image: "chazen-song-diancha-v1.png",
    details: ["Region: Fujian", "Material: iron-rich glaze", "Use: ideal for pale tea foam contrast"],
    href: "#chapter-index"
  },
  {
    title: "Gongfu Tea",
    chinese: "工夫茶",
    copy: "Gongfu is not speed but skill over time. Small vessels, repeated infusions, and precise gestures reveal the leaf gradually.",
    image: "chazen-tea-table-topdown-v3.png",
    details: ["Region: southern China", "Method: small vessels, multiple infusions", "Spirit: precision and repeatable attention"],
    href: "#gaiwan-ritual"
  },
  {
    title: "Fairness Cup",
    chinese: "公道杯",
    copy: "The fairness cup is ethics in porcelain. It equalises strength before serving, making hospitality visible on the table.",
    image: "chazen-tea-table-topdown-v3.png",
    details: ["Purpose: equalise tea strength", "Meaning: fairness in serving", "Use: after brewing, before tasting"],
    href: "#tea-table"
  },
  {
    title: "Tea Hospitality",
    chinese: "茶與待客之禮",
    copy: "A host offers temperature, timing, sequence, and attention. Tea becomes a refined way to receive another person.",
    image: "chazen-hero-gongfu-room-v3.png",
    details: ["Meaning: receiving with care", "Focus: timing, warmth, order", "Value: respect and welcome"],
    href: "#meaningful-gifts"
  },
  {
    title: "Tea Meditation",
    chinese: "茶與靜心",
    copy: "The cup narrows the world enough for attention to return. Breath, steam, and silence make practice ordinary and repeatable.",
    image: "chazen-tea-room-hero-v2.png",
    details: ["Focus: breath, repetition, observation", "Feeling: slower attention", "Practice: return to self through tea"],
    href: "#stillness-mode"
  },
  {
    title: "Tea Gifting",
    chinese: "茶與禮",
    copy: "Tea carries respect without shouting. Origin, vessel, blessing, and packaging turn a gift into memory.",
    image: "chazen-gift-box-v1.png",
    details: ["Meaning: blessing and memory", "Context: family, corporate, settlement gift", "Value: respect through presentation"],
    href: "#meaningful-gifts"
  }
];
