import Image from "next/image";

export const metadata = {
  title: "Tea Collection"
};

const teas = [
  {
    slug: "da-hong-pao",
    name: "Da Hong Pao",
    chinese: "大紅袍",
    origin: "Wuyi, Fujian",
    type: "Rock Oolong",
    look: "Dark twisted strips with roasted edges and mineral fragrance.",
    process: "Withered, bruised, oxidized, charcoal roasted, then rested until the roast settles into the leaf.",
    taste: "Cliff mineral, orchid, warm roast, dark honey, and long returning sweetness.",
    ritual: "Best in a small gaiwan with short, hot infusions after an important conversation.",
    palette: "rock"
  },
  {
    slug: "longjing",
    name: "Longjing",
    chinese: "龍井",
    origin: "Hangzhou, Zhejiang",
    type: "Green Tea",
    look: "Flat jade-green leaves pressed by hand against the pan.",
    process: "Tender spring leaves are hand pan-fired to stop oxidation and preserve clarity.",
    taste: "Chestnut, bean flower, spring grass, rain, and clean sweetness.",
    ritual: "Brew in glass or white porcelain so the falling leaf becomes part of the experience.",
    palette: "green"
  },
  {
    slug: "bai-hao-yin-zhen",
    name: "Bai Hao Yin Zhen",
    chinese: "白毫銀針",
    origin: "Fuding, Fujian",
    type: "White Tea",
    look: "Silver buds covered in fine down, pale as moonlit needles.",
    process: "Picked as young buds, then withered and dried with minimal intervention.",
    taste: "Hay sweetness, pear skin, soft honey, and a quiet luminous body.",
    ritual: "Use soft water and patience; the tea opens with restraint rather than force.",
    palette: "white"
  },
  {
    slug: "tie-guan-yin",
    name: "Tie Guan Yin",
    chinese: "鐵觀音",
    origin: "Anxi, Fujian",
    type: "Oolong",
    look: "Rolled green pearls that unfurl into thick aromatic leaves.",
    process: "Withered, shaken, partially oxidized, rolled, dried, and refined by roast.",
    taste: "Orchid, cream, green stem, bright mineral, and lingering perfume.",
    ritual: "Warm the cup first; this tea is read through fragrance before taste.",
    palette: "orchid"
  },
  {
    slug: "puer",
    name: "Pu'er",
    chinese: "普洱",
    origin: "Yunnan",
    type: "Aged Tea",
    look: "Compressed leaves in dark cakes or loose aged fragments with red-brown depth.",
    process: "Sun-dried maocha is compressed and aged, sometimes fermented, until time becomes flavor.",
    taste: "Earth, camphor, old wood, dried fruit, and mellow sweetness.",
    ritual: "Rinse once, awaken the tea, then let the room slow down through many infusions.",
    palette: "aged"
  },
  {
    slug: "high-mountain-oolong",
    name: "High Mountain Oolong",
    chinese: "高山烏龍",
    origin: "Taiwan",
    type: "Oolong",
    look: "Tightly rolled leaves with cool green-gold sheen.",
    process: "Light oxidation, rolling, careful drying, and gentle roast preserve alpine fragrance.",
    taste: "Cream, flower, cool air, soft stem, and lingering highland sweetness.",
    ritual: "Use porcelain and repeated short infusions to follow the mountain air in the cup.",
    palette: "mountain"
  }
];

export default function TeaCollectionPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <main className="tea-collection-page">
      <section className="tea-collection-hero">
        <Image
          src={`${basePath}/images/chazen-tea-collection-v1.png`}
          alt="Premium Chinese tea collection with loose leaves, tea canisters, and teaware."
          fill
          priority
          sizes="100vw"
        />
        <div className="tea-collection-shade" />
        <div className="tea-collection-hero-copy">
          <p className="museum-kicker">Tea Collection / 茶品收藏</p>
          <h1>Leaves as origin, craft, taste, and ritual.</h1>
          <p lang="zh-Hant">一片茶葉，藏著山、水、手藝與時間。</p>
          <a href={`${basePath}/#chapter-index`} className="museum-link-button">
            Return to CHAZEN
          </a>
        </div>
      </section>

      <section className="museum-section tea-leaf-gallery">
        <div className="museum-container">
          <div className="section-title-block">
            <p className="museum-kicker">Object Studies / 茶葉標本</p>
            <h2>Clicking a tea should feel like opening a drawer in a museum cabinet.</h2>
            <p>Each leaf study shows what the tea looks like, how it is made, where it comes from, and how it tastes in the cup.</p>
          </div>

          <div className="tea-leaf-grid">
            {teas.map((tea, index) => (
              <article id={tea.slug} key={tea.slug} className={`tea-leaf-card tea-${tea.palette}`}>
                <div className="leaf-specimen" aria-hidden="true">
                  <span className="leaf-dish" />
                  <span className="leaf leaf-one" />
                  <span className="leaf leaf-two" />
                  <span className="leaf leaf-three" />
                  <span className="leaf leaf-four" />
                  <em>{String(index + 1).padStart(2, "0")}</em>
                </div>
                <div className="tea-leaf-copy">
                  <span>{tea.type}</span>
                  <h2>{tea.name}</h2>
                  <strong lang="zh-Hant">{tea.chinese}</strong>
                  <dl>
                    <div>
                      <dt>Origin</dt>
                      <dd>{tea.origin}</dd>
                    </div>
                    <div>
                      <dt>Leaf Appearance</dt>
                      <dd>{tea.look}</dd>
                    </div>
                    <div>
                      <dt>How It Is Made</dt>
                      <dd>{tea.process}</dd>
                    </div>
                    <div>
                      <dt>Taste</dt>
                      <dd>{tea.taste}</dd>
                    </div>
                    <div>
                      <dt>Ritual Moment</dt>
                      <dd>{tea.ritual}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
