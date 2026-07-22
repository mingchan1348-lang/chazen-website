export type Product = {
  id: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  amount: number; // in cents
  currency: "aud";
};

export const products: Product[] = [
  {
    id: "first-pack",
    title: { en: "First Pack", zh: "初次體驗包" },
    description: { en: "Curated starter tea with brewing guide", zh: "精選入門茶與沖泡指南" },
    amount: 2500,
    currency: "aud"
  },
  {
    id: "starter-tea-box",
    title: { en: "Starter Tea Box", zh: "入門茶盒" },
    description: { en: "Two entry tea directions with ritual guide", zh: "兩款入門茶方向與儀式指南" },
    amount: 6800,
    currency: "aud"
  },
  {
    id: "lifetime-tea-box",
    title: { en: "Lifetime Tea Box", zh: "一世茶盒" },
    description: { en: "Premium tea with cultural story cards", zh: "頂級茶葉與文化故事卡" },
    amount: 7800,
    currency: "aud"
  },
  {
    id: "da-hong-pao",
    title: { en: "Da Hong Pao", zh: "大紅袍" },
    description: {
      en: "A rock tea whose luxury comes from restraint: mountain, roast, and aftertaste. 50g.",
      zh: "一款岩茶，其奢華來自克制：山、焙火與回甘。50克。"
    },
    amount: 3200,
    currency: "aud"
  },
  {
    id: "longjing",
    title: { en: "Longjing", zh: "龍井" },
    description: {
      en: "Longjing is clarity as a leaf: quiet, flat, luminous, and precise. 50g.",
      zh: "龍井是化為茶葉的清澈：安靜、扁平、明亮而精準。50克。"
    },
    amount: 2600,
    currency: "aud"
  },
  {
    id: "bai-hao-yin-zhen",
    title: { en: "Bai Hao Yin Zhen", zh: "白毫銀針" },
    description: {
      en: "A tea of patience; the luxury is in what is not forced. 50g.",
      zh: "一款需要耐心的茶；它的奢華在於不強求。50克。"
    },
    amount: 3600,
    currency: "aud"
  },
  {
    id: "tie-guan-yin",
    title: { en: "Tie Guan Yin", zh: "鐵觀音" },
    description: {
      en: "A tea that teaches the host to let aroma arrive before explanation. 50g.",
      zh: "一款教會主人，讓香氣先於言語到達的茶。50克。"
    },
    amount: 2200,
    currency: "aud"
  },
  {
    id: "puer",
    title: { en: "Pu'er", zh: "普洱" },
    description: {
      en: "Pu'er is less a product than a record of storage, climate, and patience. 50g.",
      zh: "普洱與其說是產品，不如說是儲存、氣候與耐心的紀錄。50克。"
    },
    amount: 2000,
    currency: "aud"
  },
  {
    id: "high-mountain-oolong",
    title: { en: "High Mountain Oolong", zh: "高山烏龍" },
    description: {
      en: "Altitude becomes texture: soft, lifted, and quietly expansive. 50g.",
      zh: "海拔化為質地：柔和、輕盈，並靜靜地舒展開來。50克。"
    },
    amount: 3000,
    currency: "aud"
  },
  {
    id: "lapsang-souchong",
    title: { en: "Lapsang Souchong", zh: "正山小種" },
    description: {
      en: "The smoke should feel architectural, not loud: a room made of pine and memory. 50g.",
      zh: "煙燻感應如建築般沉穩，而非張揚：一個由松木與記憶構成的空間。50克。"
    },
    amount: 2400,
    currency: "aud"
  },
  {
    id: "uji-matcha",
    title: { en: "Uji Matcha", zh: "宇治抹茶" },
    description: {
      en: "A bridge to powdered tea culture: focused, tactile, and immediate. 30g.",
      zh: "通往抹茶文化的橋樑：專注、觸感豐富且直接。30克。"
    },
    amount: 3400,
    currency: "aud"
  }
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
