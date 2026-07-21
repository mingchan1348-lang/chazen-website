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
  }
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
