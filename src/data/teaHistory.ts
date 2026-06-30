export type TeaHistoryItem = {
  number: string;
  title: string;
  chinese: string;
  copy: string;
  character: string;
  visualLabel: string;
  image: string;
  story: string;
};

export type KnowledgeCard = {
  title: string;
  chinese: string;
  copy: string;
  href: string;
};

export const teaHistoryItems: TeaHistoryItem[] = [
  {
    number: "01",
    title: "Mythic Origin",
    chinese: "神農傳說",
    copy: "Tea began in legend as medicine and observation.",
    character: "藥",
    visualLabel: "Steam over mountain herb",
    image: "chazen-shanshui-chapter-2.png",
    story: "The myth of Shennong frames tea as a discovery of balance: leaf, body, heat, and attention. Before tea became taste, it was a way of reading nature."
  },
  {
    number: "02",
    title: "Tang Dynasty",
    chinese: "唐代",
    copy: "Lu Yu and The Classic of Tea. Tea became written, studied, and systematised.",
    character: "經",
    visualLabel: "Lu Yu and the written tea canon",
    image: "chazen-arrival-room.avif",
    story: "Lu Yu's Tea Classic gave tea a language of source, vessel, water, fire, and conduct. The cup entered scholarship, and scholarship entered the cup."
  },
  {
    number: "03",
    title: "Song Dynasty",
    chinese: "宋代",
    copy: "Dian Cha, Jian ware, and scholar tea culture. Tea became visual, tactile, and aesthetic.",
    character: "點",
    visualLabel: "Powdered tea, foam, Jian bowl",
    image: "chazen-song-diancha-v1.png",
    story: "Song dian cha turned powdered tea into a luminous surface. Whisk, bowl, foam, wrist, and silence became a visual art of discipline."
  },
  {
    number: "04",
    title: "Ming-Qing",
    chinese: "明清",
    copy: "Loose-leaf brewing and gongfu practice. Tea entered refined daily life.",
    character: "器",
    visualLabel: "Gongfu vessels and loose leaf",
    image: "chazen-tea-table-topdown-v3.png",
    story: "Loose-leaf infusion changed the grammar of tea. Smaller vessels, faster pours, and repeated cups made technique intimate."
  },
  {
    number: "05",
    title: "Contemporary CHAZEN",
    chinese: "當代茶禪",
    copy: "Tea returns as ritual, sound, meditation, and meaningful gifting.",
    character: "禪",
    visualLabel: "Tea room, sound, return",
    image: "chazen-hero-gongfu-room-v3.png",
    story: "CHAZEN brings origin, teaware, breathing, sound, and cultural memory into one contemporary room for returning to the present."
  }
];

export const knowledgeCards: KnowledgeCard[] = [
  {
    title: "Lu Yu",
    chinese: "陸羽與茶經",
    copy: "The Tang scholar Lu Yu gave tea language, method, and cultural form. The Classic of Tea made drinking a studied art rather than a casual habit.",
    href: "#tea-history"
  },
  {
    title: "Song Dian Cha",
    chinese: "宋代點茶",
    copy: "Powdered tea was whisked into a luminous surface. Technique, bowl, foam, and scholar taste became a single aesthetic practice.",
    href: "#chapter-index"
  },
  {
    title: "Jian Ware",
    chinese: "建盞",
    copy: "Black-glazed bowls made pale tea foam visible. Their iron-rich surfaces turned drinking into an encounter with light and mineral depth.",
    href: "#chapter-index"
  },
  {
    title: "Gongfu Tea",
    chinese: "工夫茶",
    copy: "Gongfu is not speed but skill over time. Small vessels, repeated infusions, and precise gestures reveal the leaf gradually.",
    href: "#gaiwan-ritual"
  },
  {
    title: "Fairness Cup",
    chinese: "公道杯",
    copy: "The fairness cup is ethics in porcelain. It equalises strength before serving, making hospitality visible on the table.",
    href: "#tea-table"
  },
  {
    title: "Tea Hospitality",
    chinese: "茶與待客之禮",
    copy: "A host offers temperature, timing, sequence, and attention. Tea becomes a refined way to receive another person.",
    href: "#meaningful-gifts"
  },
  {
    title: "Tea Meditation",
    chinese: "茶與靜心",
    copy: "The cup narrows the world enough for attention to return. Breath, steam, and silence make practice ordinary and repeatable.",
    href: "#stillness-mode"
  },
  {
    title: "Tea Gifting",
    chinese: "茶與禮",
    copy: "Tea carries respect without shouting. Origin, vessel, blessing, and packaging turn a gift into memory.",
    href: "#meaningful-gifts"
  }
];
