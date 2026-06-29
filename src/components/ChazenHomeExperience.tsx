"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Globe2, Mail, Volume2 } from "lucide-react";

const teaTools = [
  {
    number: "01",
    english: "Gaiwan",
    chinese: "蓋碗",
    purpose: "A lidded bowl used to brew leaves with precision, fragrance, and speed.",
    meaning: "The lid, bowl, and saucer hold heaven, human, and earth in one small form.",
    used: "Used for warming, receiving leaves, brewing, controlling aroma, and pouring.",
    note: "Its openness lets the host read colour, leaf expansion, steam, and timing without hiding the tea.",
    x: "48%",
    y: "42%"
  },
  {
    number: "02",
    english: "Fairness Cup",
    chinese: "公道杯",
    purpose: "Receives the brewed liquor before serving so every cup has equal strength.",
    meaning: "Hospitality becomes a visible ethic: no guest receives a lesser pour.",
    used: "Used immediately after each infusion leaves the gaiwan.",
    note: "In gongfu tea, equality is designed into the table before conversation begins.",
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
    x: "72%",
    y: "58%"
  },
  {
    number: "04",
    english: "Tea Scoop",
    chinese: "茶則",
    purpose: "Transfers dry leaves cleanly and measures abundance with restraint.",
    meaning: "Generosity without excess, precision without harshness.",
    used: "Used when moving leaves from the presentation vessel into the warmed gaiwan.",
    note: "The scoop is a quiet discipline of proportion: enough leaf to speak, not enough to shout.",
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
    note: "Refinement often means removing the hand when the vessel can be served more respectfully.",
    x: "22%",
    y: "48%"
  },
  {
    number: "06",
    english: "Tea Tray",
    chinese: "茶盤",
    purpose: "A drained stage for water, vessels, and controlled movement.",
    meaning: "It contains overflow so the room can remain visually still.",
    used: "Used throughout the entire brewing sequence.",
    note: "The tray makes abundance quiet. Water can move freely while the ritual remains composed.",
    x: "50%",
    y: "52%"
  },
  {
    number: "07",
    english: "Tea Cloth",
    chinese: "茶巾",
    purpose: "Wipes water marks and restores calm between gestures.",
    meaning: "Cleanliness is treated as visual stillness.",
    used: "Used between pours and whenever the table needs a soft reset.",
    note: "The cloth is the rhythm nobody notices until it is missing.",
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
    x: "80%",
    y: "42%"
  }
];

const ritualSteps = [
  {
    number: "01",
    title: "Warm the cup",
    chinese: "溫杯",
    copy: "Heat crosses porcelain first. The vessel wakes before the leaf, and the room learns the pace of the hand.",
    image: "chazen-tea-table-topdown-v3.png"
  },
  {
    number: "02",
    title: "Add tea",
    chinese: "投茶",
    copy: "The dry leaf enters as an origin object: mountain, season, roast, and weather held in a small measure.",
    image: "chazen-tea-collection-v1.png"
  },
  {
    number: "03",
    title: "Awaken the tea",
    chinese: "醒茶",
    copy: "A brief rinse releases storage, dust, and sleep. What remains is the first clean breath of the tea.",
    image: "chazen-hero-gongfu-room-v3.png"
  },
  {
    number: "04",
    title: "Brew",
    chinese: "沖泡",
    copy: "Water falls with intention. Temperature, angle, seconds, and silence become architecture.",
    image: "chazen-hero-gongfu-room-v3.png"
  },
  {
    number: "05",
    title: "Pour",
    chinese: "出湯",
    copy: "The liquor leaves before it becomes heavy. Timing is the elegance of restraint.",
    image: "chazen-tea-table-topdown-v3.png"
  },
  {
    number: "06",
    title: "Savour",
    chinese: "品茗",
    copy: "The first sip is received before it is judged: aroma, texture, warmth, return.",
    image: "chazen-song-diancha-v1.png"
  }
];

const songCards = [
  ["Dragon Kiln", "龍窯", "Fire, ash, clay, and patience."],
  ["Jian Ware", "建盞", "Black glaze holding foam and light."],
  ["Song Aesthetic", "宋風美學", "Restraint as a form of abundance."],
  ["Tea Texts", "茶典", "Knowledge carried through ritual language."]
];

const atlasRegions = ["Yunnan", "Fujian", "Anxi", "Wuyi", "Hangzhou", "Taiwan", "Uji"];

const wisdomCards = [
  ["福", "Fu", "Blessing"],
  ["祿", "Lu", "Prosperity"],
  ["壽", "Shou", "Longevity"],
  ["劉備", "Liu Bei", "Benevolence"],
  ["關羽", "Guan Yu", "Loyalty"],
  ["張飛", "Zhang Fei", "Courage"]
];

const teaProducts = [
  ["Da Hong Pao", "大紅袍", "Rock Oolong", "Wuyi, Fujian", "Cliff mineral, roasted depth, long returning sweetness."],
  ["Longjing", "龍井", "Green Tea", "Hangzhou, Zhejiang", "Chestnut warmth, spring clarity, flattened leaf precision."],
  ["Bai Hao Yin Zhen", "白毫銀針", "White Tea", "Fuding, Fujian", "Silver buds, hay sweetness, quiet luminous body."],
  ["Tie Guan Yin", "鐵觀音", "Oolong", "Anxi, Fujian", "Orchid aroma, rolled leaf, bright lingering finish."]
];

const journalCards = [
  ["A Room for Returning", "How spatial calm changes the way tea is received."],
  ["The Ethics of the Fairness Cup", "Hospitality, equality, and the ritual design of sharing."],
  ["Why Small Cups Matter", "Temperature, repetition, and the beauty of an unfinished pour."]
];

export function ChazenHomeExperience() {
  const [activeTool, setActiveTool] = useState(teaTools[0]);
  const [activeStep, setActiveStep] = useState(ritualSteps[0]);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const imageUrl = (name: string) => `${basePath}/images/${name}`;

  return (
    <>
      <section id="philosophy" className="museum-section philosophy-exhibit">
        <div className="museum-container philosophy-panel">
          <div className="ink-circle" aria-hidden="true" />
          <div className="philosophy-copy">
            <p className="museum-kicker">05 Philosophy</p>
            <h2>Tea is not frenzy. It is a way of returning.</h2>
            <p lang="zh-Hant">茶不是喧囂。而是回到自己的方式。</p>
          </div>
          <div className="ink-mountain" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section id="tea-table" className="museum-section tea-table-exhibit">
        <div className="museum-container">
          <div className="section-title-block">
            <p className="museum-kicker">02 Tea Table / 茶席之器</p>
            <h2>Every vessel has its place. Every movement is a return.</h2>
            <p lang="zh-Hant">器有其位，動作有序。茶之道，在於回歸本真。</p>
          </div>

          <div className="tea-table-grid">
            <div className="tool-selector" aria-label="Tea table objects">
              {teaTools.map((tool) => (
                <button
                  type="button"
                  key={tool.number}
                  className={activeTool.number === tool.number ? "is-active" : ""}
                  onClick={() => setActiveTool(tool)}
                  aria-pressed={activeTool.number === tool.number}
                >
                  <span>{tool.number}</span>
                  <strong>{tool.english}</strong>
                  <em lang="zh-Hant">{tool.chinese}</em>
                </button>
              ))}
            </div>

            <figure className="table-object-stage">
              <Image
                src={imageUrl("chazen-tea-table-topdown-v3.png")}
                alt="Top-down Chinese tea table with gaiwan, fairness cup, tasting cups, tea tray, tea tools, cloth, and waste bowl."
                fill
                sizes="(max-width: 900px) 100vw, 48vw"
                className="table-object-image"
              />
              <div className="table-object-shade" />
              {teaTools.map((tool) => (
                <button
                  type="button"
                  key={tool.number}
                  className={`object-marker ${activeTool.number === tool.number ? "is-active" : ""}`}
                  style={{ left: tool.x, top: tool.y }}
                  onClick={() => setActiveTool(tool)}
                  aria-label={`${tool.number} ${tool.english} ${tool.chinese}`}
                >
                  <span>{tool.number}</span>
                  <em>{tool.chinese}</em>
                </button>
              ))}
              <figcaption>Top-down object study / Click each numbered vessel</figcaption>
            </figure>

            <article className="selected-object-panel">
              <p className="museum-kicker">Selected Object</p>
              <h3 lang="zh-Hant">{activeTool.chinese}</h3>
              <h4>{activeTool.english}</h4>
              <dl>
                <div>
                  <dt>Purpose</dt>
                  <dd>{activeTool.purpose}</dd>
                </div>
                <div>
                  <dt>Ritual Meaning</dt>
                  <dd>{activeTool.meaning}</dd>
                </div>
                <div>
                  <dt>Used When</dt>
                  <dd>{activeTool.used}</dd>
                </div>
                <div>
                  <dt>Cultural Note</dt>
                  <dd>{activeTool.note}</dd>
                </div>
              </dl>
            </article>
          </div>

          <div className="gaiwan-line-study" aria-hidden="true">
            <span className="line-saucer" />
            <span className="line-bowl" />
            <span className="line-lid" />
            <span className="line-knob" />
          </div>
        </div>
      </section>

      <section id="gaiwan-ritual" className="museum-section ritual-exhibit">
        <div className="museum-container ritual-panel">
          <div className="ritual-nav" aria-label="Gaiwan ritual steps">
            <p className="museum-kicker">03 Gaiwan Ritual / 蓋碗沖茶</p>
            {ritualSteps.map((step) => (
              <button
                type="button"
                key={step.number}
                className={activeStep.number === step.number ? "is-active" : ""}
                onClick={() => setActiveStep(step)}
                aria-pressed={activeStep.number === step.number}
              >
                <span>{step.number}</span>
                <strong>{step.title}</strong>
                <em lang="zh-Hant">{step.chinese}</em>
              </button>
            ))}
          </div>

          <div className="ritual-filmstrip">
            {ritualSteps.map((step) => (
              <button
                type="button"
                key={step.number}
                className={activeStep.number === step.number ? "is-active" : ""}
                onClick={() => setActiveStep(step)}
                aria-label={`${step.number} ${step.title}`}
              >
                <Image
                  src={imageUrl(step.image)}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 72vw, 24vw"
                  className="ritual-film-image"
                />
                <span>{step.number}</span>
              </button>
            ))}
          </div>

          <article className="ritual-story">
            <span>{activeStep.number}</span>
            <h2>{activeStep.title}</h2>
            <h3 lang="zh-Hant">{activeStep.chinese}</h3>
            <p>{activeStep.copy}</p>
            <blockquote>
              Water, leaf, time. Nothing more. In six movements, tea becomes a type of listening.
              <br />
              <span lang="zh-Hant">水、葉、時、手、心。六步之間，茶成為一種聆聽。</span>
            </blockquote>
          </article>

          <div className="ritual-ink-wash" aria-hidden="true" />
        </div>
      </section>

      <section id="chapter-index" className="museum-section chapter-exhibition">
        <div className="museum-container">
          <article className="song-room-card">
            <div className="song-room-image">
              <Image
                src={imageUrl("chazen-song-diancha-v1.png")}
                alt="Dian cha tea whisking in a black Jian ware bowl beside a garden window."
                fill
                loading="eager"
                sizes="(max-width: 900px) 100vw, 54vw"
              />
            </div>
            <div className="song-room-copy">
              <p className="museum-kicker">04 Song Room / 宋室雅集</p>
              <h2>Foam, black glaze, scholar restraint.</h2>
              <p>
                The Song Room studies dian cha, Jian ware, kiln fire, and the disciplined
                intelligence of an object made for attention.
              </p>
              <div className="song-mini-grid">
                {songCards.map(([title, chinese, copy]) => (
                  <div key={title}>
                    <strong>{title}</strong>
                    <span lang="zh-Hant">{chinese}</span>
                    <p>{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="museum-duo-grid">
            <article className="stillness-panel">
              <p className="museum-kicker">06 Stillness Mode / 靜心模式</p>
              <h2>Sound before water. Breath before taste.</h2>
              <div className="bowl-stage" aria-hidden="true">
                <span className="bowl-rim" />
                <span className="bowl-body" />
                <span className="bowl-smoke" />
              </div>
              <div className="stillness-options">
                {["Breathing Guide", "Tea Meditation", "Sound of Bowl", "Recommended Tea"].map(
                  (item) => (
                    <span key={item}>{item}</span>
                  )
                )}
              </div>
              <a href="#tea-table" className="dark-cta">
                Start Your Practice <Volume2 size={16} aria-hidden="true" />
              </a>
            </article>

            <article className="atlas-panel">
              <p className="museum-kicker">07 Tea Atlas / 茶之地圖</p>
              <h2>Origin is not a coordinate. It is climate remembered by leaf.</h2>
              <div className="atlas-map" aria-label="Highlighted tea regions">
                {atlasRegions.map((region) => (
                  <span key={region}>{region}</span>
                ))}
              </div>
              <div className="atlas-feature">
                <span>Featured Origin</span>
                <strong>Wuyi Mountains 武夷山</strong>
                <p>Rock Tea 岩茶 / Cliff · Mist · Depth</p>
              </div>
            </article>
          </div>

          <article className="wisdom-panel">
            <div>
              <p className="museum-kicker">08 Wisdom Collection / 東方智慧 · 傳世典範</p>
              <h2>Character as blessing, memory, and moral form.</h2>
            </div>
            <div className="wisdom-grid">
              {wisdomCards.map(([character, name, meaning]) => (
                <div key={character}>
                  <span lang="zh-Hant">{character}</span>
                  <strong>{name}</strong>
                  <p>{meaning}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="collection-panel">
            <div className="collection-image">
              <Image
                src={imageUrl("chazen-tea-collection-v1.png")}
                alt="Premium Chinese tea collection with tea canisters, loose leaves, gaiwan, and museum table styling."
                fill
                loading="eager"
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </div>
            <div className="collection-copy">
              <p className="museum-kicker">09 Tea Collection / 茶品之選</p>
              <h2>A catalogue of leaves with origin, texture, and mood.</h2>
              <div className="product-catalogue">
                {teaProducts.map(([name, chinese, type, origin, note]) => (
                  <div key={name}>
                    <span>{type}</span>
                    <h3>{name}</h3>
                    <strong lang="zh-Hant">{chinese}</strong>
                    <p>{origin}</p>
                    <small>{note}</small>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="gift-panel">
            <div>
              <p className="museum-kicker">10 Meaningful Gifts / 心意 · 茶禮</p>
              <h2>A gift should not only be received. It should be remembered.</h2>
              <p lang="zh-Hant">禮，不只是送出。是被記住。</p>
              <div className="gift-tags">
                {["Real Estate Settlement", "Corporate Gifts", "VIP Gifts", "Family Blessing"].map(
                  (item) => (
                    <span key={item}>{item}</span>
                  )
                )}
              </div>
            </div>
            <div className="gift-image">
              <Image
                src={imageUrl("chazen-gift-box-v1.png")}
                alt="Premium wooden Chinese tea gift box with ceramic teaware, tea tins, silk cloth, and garden light."
                fill
                loading="eager"
                sizes="(max-width: 900px) 100vw, 44vw"
              />
            </div>
          </article>

          <article className="journal-panel">
            <div className="journal-head">
              <p className="museum-kicker">Journal / 茶記</p>
              <h2>Field notes from the house of tea and stillness.</h2>
            </div>
            <div className="journal-grid">
              {journalCards.map(([title, copy], index) => (
                <a key={title} href="#philosophy">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="home-brand-footer" aria-label="CHAZEN closing statement">
        <div className="museum-container">
          <p className="display-title">CHAZEN 茶禪</p>
          <h2>Tea. Return. Stillness.</h2>
          <div className="brand-footer-links">
            <a href="mailto:hello@chazen.example">
              <Mail size={15} aria-hidden="true" /> Inquiry
            </a>
            <a href="#tea-table">
              <Globe2 size={15} aria-hidden="true" /> Museum
            </a>
            <a href="#gaiwan-ritual">
              <Volume2 size={15} aria-hidden="true" /> Ritual
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
