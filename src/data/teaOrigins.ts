export type TeaOrigin = {
  name: string;
  chinese: string;
  tea: string;
  landscape: string;
  climate: string;
  terroir: string;
  history: string;
  process: string;
  taste: string;
  brewing: string;
  ritual: string;
};

export const teaOrigins: TeaOrigin[] = [
  {
    name: "Yunnan",
    chinese: "雲南",
    tea: "Pu'er 普洱",
    landscape: "Ancient tea forests, misted highlands, caravan memory.",
    climate: "Misty highlands, old trees, warm rain.",
    terroir: "Ancient arbor roots, red earth, mountain humidity.",
    history: "One of tea's oldest landscapes, tied to caravan routes and border cultures.",
    process: "Sun-drying, compression, microbial aging.",
    taste: "Earth, camphor, dark fruit, long sweetness.",
    brewing: "Rinse once, then brew patiently through many short infusions.",
    ritual: "Slow infusions and shared patience."
  },
  {
    name: "Fujian Wuyi",
    chinese: "福建武夷",
    tea: "Rock Tea 岩茶",
    landscape: "Cliffs, river mist, narrow valleys, mineral stone.",
    climate: "Cliff shade, river mist, mineral stone.",
    terroir: "Narrow valleys and weathered rock hold heat and fragrance.",
    history: "A scholar and cliff-tea landscape with centuries of tribute and craft.",
    process: "Withering, bruising, roasting, slow refinement.",
    taste: "Mineral depth, orchid, roast, returning sweetness.",
    brewing: "Use hot water, small cups, and short gongfu infusions.",
    ritual: "Short gongfu infusions that reveal layers."
  },
  {
    name: "Anxi",
    chinese: "安溪",
    tea: "Tie Guan Yin 鐵觀音",
    landscape: "Oolong gardens, granite slopes, fragrant mountain air.",
    climate: "Cool slopes and fragrant air.",
    terroir: "Granite soils, fog, and careful garden management.",
    history: "Home of one of China's most beloved oolong traditions.",
    process: "Rolled oolong with controlled oxidation.",
    taste: "Orchid, cream, green stem, bright finish.",
    brewing: "Wake the rolled leaf with a quick rinse and follow the fragrance arc.",
    ritual: "Aroma cups and repeated awakening."
  },
  {
    name: "Hangzhou",
    chinese: "杭州",
    tea: "Longjing 龍井",
    landscape: "West Lake slopes, spring rain, tender green shoots.",
    climate: "Spring rain, lake air, tender early shoots.",
    terroir: "West Lake slopes, mild humidity, fine picking windows.",
    history: "A green tea associated with literati taste and imperial praise.",
    process: "Pan-fired flat leaf craft.",
    taste: "Chestnut, bean, spring grass, clarity.",
    brewing: "Brew gently in glass or white porcelain to watch the leaf fall.",
    ritual: "Glass or porcelain brewing to watch the leaf fall."
  },
  {
    name: "Chaozhou",
    chinese: "潮州",
    tea: "Dancong 單叢",
    landscape: "Phoenix Mountain, single-bush fragrance, coastal air.",
    climate: "Phoenix Mountain mist and warm coastal air.",
    terroir: "Single-bush aromatics from high mountain gardens.",
    history: "A living center of gongfu tea service and aromatic oolong craft.",
    process: "Oolong oxidation, shaping, and patient roasting.",
    taste: "Honey orchid, fruit, spice, and a bright edge.",
    brewing: "Use small vessels and quick pours to protect high fragrance.",
    ritual: "Small pots, quick pours, intense aroma."
  },
  {
    name: "Taiwan",
    chinese: "台灣",
    tea: "High Mountain Oolong 高山烏龍",
    landscape: "Alpine gardens, cold fog, slow-growing leaf.",
    climate: "Cold highland fog and strong day-night temperature shifts.",
    terroir: "Alpine gardens, soft mist, slow leaf growth.",
    history: "A modern oolong culture shaped by altitude and precision.",
    process: "Light oxidation, rolling, careful low roasting.",
    taste: "Cream, flower, cool air, lingering sweetness.",
    brewing: "Use porcelain and repeated short infusions to follow the cool floral body.",
    ritual: "Porcelain gaiwan or small pot to follow the fragrance arc."
  },
  {
    name: "Uji Japan",
    chinese: "日本宇治",
    tea: "Matcha 抹茶",
    landscape: "Shade-grown tea fields, river basin humidity, stone mills.",
    climate: "Shade cultivation and humid river basin air.",
    terroir: "Managed shade, tender leaves, concentrated umami.",
    history: "A Japanese tea center connected to chanoyu and powdered tea practice.",
    process: "Steaming, drying, stone milling.",
    taste: "Umami, green depth, soft bitterness, cream.",
    brewing: "Whisk with warm water into a focused, luminous bowl.",
    ritual: "Whisked tea as a focused act of presence."
  }
];
