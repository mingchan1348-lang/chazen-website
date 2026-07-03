"use client";

import Image from "next/image";
import { type CSSProperties, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Gift,
  Leaf,
  Moon,
  Sparkles,
  Volume2,
  VolumeX
} from "lucide-react";
import { audioAssets, withBasePath } from "@/lib/media";

const cupPortals = [
  {
    key: "calm",
    chinese: "安",
    title: "Calm",
    state: "Stress, tension, need to slow down",
    visual: "Mist blue-grey, water ripples, bamboo shadow",
    cta: "Calm the Mind"
  },
  {
    key: "focus",
    chinese: "定",
    title: "Focus",
    state: "Distracted, working, studying, need concentration",
    visual: "Bamboo green, lattice light, steam gathering inward",
    cta: "Return to Focus"
  },
  {
    key: "sleep",
    chinese: "眠",
    title: "Sleep",
    state: "Restless, overthinking, nighttime, need rest",
    visual: "Moon white, silver-grey, evening courtyard mist",
    cta: "Rest Into Stillness"
  },
  {
    key: "release",
    chinese: "放",
    title: "Release",
    state: "Emotional pressure, irritability, heaviness",
    visual: "Tea brown, amber light, steam opening like breath",
    cta: "Let the Weight Leave"
  },
  {
    key: "clarity",
    chinese: "清",
    title: "Clarity",
    state: "Need clarity, self-understanding, cultural learning",
    visual: "Ivory white, soft gold, ink-wash emptiness",
    cta: "See With Clarity"
  }
];

const testSteps = [
  "選擇你現在的狀態",
  "回答簡單生活問題",
  "Chazen 分析你的茶方向",
  "得到茶推薦與飲用方法"
];

const exhibitionCards = [
  ["The First Cup", "第一杯茶", "New beginner guide to Chinese tea"],
  ["The Gaiwan Ritual", "蓋碗儀式", "Gaiwan, fairness pitcher, Jian Zhan, and ritual steps"],
  ["Tea and the Mind", "茶與心境", "Sleep, stress, focus, emotion, and tea"],
  ["Dynasties of Tea", "茶的朝代故事", "Tang, Song, Ming tea culture"],
  ["The Lifetime Tea Box", "一世茶盒", "Collectible cultural gift box story"]
];

const ritualSteps = [
  ["溫器", "讓茶具先承接溫度。"],
  ["置茶", "茶葉落入蓋碗，香氣開始打開。"],
  ["醒茶", "第一道水，喚醒茶葉。"],
  ["聞香", "先聞香，再入口。"],
  ["出湯", "茶湯流入公道杯，再分入杯中。"],
  ["慢飲", "一口茶，一次呼吸。"]
];

const philosophyCards = [
  [
    "Tea for Mind",
    "不同的茶，有不同的節奏。有些適合專注，有些適合放鬆，有些適合在晚上慢慢飲。"
  ],
  [
    "Tea as Culture",
    "中國茶文化承載歷史、禮儀、哲學與人與人之間的連結。"
  ],
  [
    "Tea as Daily Practice",
    "飲茶不一定複雜。可以用蓋碗，也可以用杯；可以正式，也可以自然地融入生活。"
  ]
];

const timelineItems = [
  ["神農傳說", "Tea begins as observation, remedy, and origin myth.", "Origin"],
  ["唐代 — 陸羽《茶經》", "Tea becomes studied as culture, method, and refined daily practice.", "Classic"],
  ["宋代 — 點茶與文人美學", "Powdered tea, Jian ware, courtyard taste, and scholar restraint.", "Song"],
  ["明代 — 散茶", "Loose-leaf infusion reshapes the vessel, the table, and the rhythm.", "Leaf"],
  ["Modern Chazen", "Tea returns as emotional reflection, cultural education, and gifting.", "Now"]
];

const teaCards = [
  ["Green Tea", "綠茶", "Fresh, clear, awake", "Morning focus", "Morning / early afternoon", "Easy"],
  ["White Tea", "白茶", "Soft, gentle, spacious", "Calm reset", "Afternoon", "Easy"],
  ["Oolong", "烏龍", "Layered, fragrant, balanced", "Focus and conversation", "Midday / evening", "Medium"],
  ["Black Tea", "紅茶", "Warm, steady, comforting", "Grounded energy", "Morning / cool days", "Easy"],
  ["Pu-erh", "普洱", "Deep, earthy, slow", "Release and settling", "After meals / late afternoon", "Medium"]
];

const journeyCards = [
  ["AI Tea Test", "For users discovering what tea suits them.", "開始茶測試"],
  ["Starter Tea Box", "For beginners starting Chinese tea culture.", "探索新手茶盒"],
  ["Lifetime Tea Box", "For collectible cultural gifting.", "了解一世茶盒"],
  ["B2B Tea Box", "For corporate gifts, client appreciation, and real estate settlement gifts.", "查詢企業茶禮"]
];

const membershipTiers = [
  ["Free Member", "Begin with culture notes, tea test access, and seasonal guidance."],
  ["$28/month Community Member", "Continue with monthly tea learning, tasting prompts, and member gatherings."],
  ["$38/month Premium Ritual Member", "Receive deeper ritual education, premium guides, and early box access."]
];

const b2bUses = [
  "Corporate gifts",
  "Client appreciation",
  "Real estate settlement gifts",
  "Festival gifts",
  "Business partners",
  "Cultural events"
];

const journalCategories = [
  "茶歷史",
  "茶與睡眠",
  "茶與專注",
  "茶與壓力",
  "如何沖茶",
  "茶具介紹",
  "中國送禮文化",
  "Chazen 故事"
];

function SectionIntro({
  eyebrow,
  title,
  english,
  copy
}: {
  eyebrow: string;
  title: string;
  english: string;
  copy?: string;
}) {
  return (
    <div className="courtyard-section-intro">
      <p>{eyebrow}</p>
      <h2 lang="zh-Hant">{title}</h2>
      <strong>{english}</strong>
      {copy ? <span>{copy}</span> : null}
    </div>
  );
}

export default function Home() {
  const [activeCup, setActiveCup] = useState(cupPortals[0]);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeCupIndex = useMemo(
    () => cupPortals.findIndex((cup) => cup.key === activeCup.key),
    [activeCup]
  );

  const toggleSound = async () => {
    if (soundOn) {
      audioRef.current?.pause();
      audioRef.current = null;
      setSoundOn(false);
      return;
    }

    const audio = new Audio(withBasePath(audioAssets.bambooWind));
    audio.loop = true;
    audio.volume = 0.22;
    try {
      await audio.play();
      audioRef.current = audio;
      setSoundOn(true);
    } catch {
      setSoundOn(false);
    }
  };

  return (
    <main className="courtyard-home">
      <section className="song-courtyard-hero" aria-labelledby="home-title">
        <Image
          src={withBasePath("/images/chazen-generated/chazen-tea-room-hero-v2.png")}
          alt="A calm Chinese tea table with gaiwan, cups, warm wood, garden stones, soft daylight, and tea steam."
          fill
          priority
          sizes="100vw"
          className="song-courtyard-photo"
        />
        <div className="courtyard-daylight" />
        <div className="courtyard-roofline" aria-hidden="true" />
        <div className="bamboo-shadow bamboo-shadow-one" aria-hidden="true" />
        <div className="bamboo-shadow bamboo-shadow-two" aria-hidden="true" />
        <div className="courtyard-host" aria-hidden="true">
          <span />
        </div>
        <div className="hero-steam" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="courtyard-hero-inner">
          <p className="courtyard-kicker">Song Courtyard / 現代中國茶文化體驗</p>
          <h1 id="home-title" lang="zh-Hant">
            <span>一席茶，</span>
            <span>一方心境</span>
          </h1>
          <p className="hero-english">Enter the Courtyard of Tea</p>
          <div className="hero-copy">
            <p lang="zh-Hant">在茶煙、木香與庭院光影之中，尋找此刻最適合你心境的一杯茶。</p>
            <p>Step into a modern Chinese tea sanctuary and discover the tea your mind needs today.</p>
          </div>
          <div className="courtyard-actions">
            <a href={withBasePath("/discover-your-tea/index.html")} className="courtyard-cta primary">
              開始茶測試 / Start Tea Test <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a href="#tea-ritual" className="courtyard-cta secondary">
              進入茶儀式 / Enter the Ritual
            </a>
            <button type="button" className="sound-toggle" onClick={toggleSound} aria-pressed={soundOn}>
              {soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
              {soundOn ? "Courtyard sound on" : "Optional sound"}
            </button>
          </div>
        </div>
      </section>

      <section className="cup-portals-section" aria-labelledby="cup-portals-title">
        <div className="courtyard-container">
          <SectionIntro
            eyebrow="Five Jian Zhan Cup Portals"
            title="你此刻，需要進入哪一杯茶的世界？"
            english="Choose the Tea World Your Mind Needs"
            copy="A young host pours from gaiwan to fairness pitcher, then into five Jian Zhan cups. Each cup opens a quiet emotional direction."
          />
          <div className="pouring-table" aria-hidden="true">
            <div className="gaiwan-vessel" />
            <div className="tea-flow-line" />
            <div className="fairness-pitcher" />
            <div className="cup-world-preview" data-cup={activeCup.key}>
              <span>{activeCup.chinese}</span>
            </div>
          </div>
          <div className="cup-grid" style={{ "--active-cup": activeCupIndex } as CSSProperties}>
            {cupPortals.map((cup) => (
              <button
                key={cup.key}
                type="button"
                className={`cup-portal cup-${cup.key}${activeCup.key === cup.key ? " is-active" : ""}`}
                onMouseEnter={() => setActiveCup(cup)}
                onFocus={() => setActiveCup(cup)}
              >
                <span className="jian-cup" aria-hidden="true">
                  <i />
                </span>
                <span className="cup-character" lang="zh-Hant">
                  {cup.chinese}
                </span>
                <strong>{cup.title}</strong>
                <small>{cup.state}</small>
                <em>{cup.visual}</em>
                <b>{cup.cta}</b>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="tea-test-section" id="tea-test-preview">
        <div className="courtyard-container tea-test-layout">
          <SectionIntro
            eyebrow="AI Tea State Test Preview"
            title="由你此刻的感覺開始"
            english="Begin With How You Feel"
          />
          <div className="paper-steps">
            {testSteps.map((step, index) => (
              <article key={step}>
                <span>{index + 1}</span>
                <p lang="zh-Hant">{step}</p>
              </article>
            ))}
          </div>
          <aside className="tea-result-card">
            <p>Sample Result</p>
            <h3>Current State: Overthinking / Restless</h3>
            <dl>
              <div>
                <dt>Tea Direction</dt>
                <dd>Warm roasted oolong</dd>
              </div>
              <div>
                <dt>Why</dt>
                <dd lang="zh-Hant">適合需要慢下來，但又不想太沉重的晚上。</dd>
              </div>
            </dl>
            <a href={withBasePath("/discover-your-tea/index.html")} className="courtyard-cta primary">
              開始我的茶測試 / Start My Tea Test
            </a>
          </aside>
        </div>
      </section>

      <section className="living-exhibition-section">
        <div className="courtyard-container">
          <SectionIntro
            eyebrow="Living Tea Exhibition"
            title="一場關於中國茶文化的互動展覽"
            english="A Living Exhibition of Chinese Tea Culture"
          />
          <div className="exhibition-grid">
            {exhibitionCards.map(([title, chinese, body], index) => (
              <article key={title} className="exhibition-card">
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <strong lang="zh-Hant">{chinese}</strong>
                <p>{body}</p>
                <BookOpen size={18} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ritual-preview-section" id="tea-ritual">
        <div className="courtyard-container ritual-preview-layout">
          <div>
            <SectionIntro
              eyebrow="Tea Ritual Preview"
              title="茶入口之前，先有一場儀式"
              english="The Ritual Before the Tea"
              copy="Scroll through the six gestures that turn water, leaf, vessel, and breath into a calm practice."
            />
            <div className="ritual-actions">
              <a href={withBasePath("/tea-ritual/")} className="courtyard-cta primary">
                觀看完整茶儀式 / Watch Full Ritual
              </a>
              <a href={withBasePath("/tea-atlas/")} className="courtyard-cta secondary">
                新手泡茶指南 / Beginner Guide
              </a>
            </div>
          </div>
          <div className="ritual-scroll">
            {ritualSteps.map(([title, body], index) => (
              <article key={title}>
                <span>{index + 1}</span>
                <h3 lang="zh-Hant">{title}</h3>
                <p lang="zh-Hant">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="philosophy-section" id="philosophy">
        <div className="courtyard-container">
          <SectionIntro
            eyebrow="Chazen Philosophy"
            title="茶，不只是飲品"
            english="Tea Is Not Only a Drink"
          />
          <div className="philosophy-grid">
            {philosophyCards.map(([title, body]) => (
              <article key={title}>
                <Leaf size={21} aria-hidden="true" />
                <h3>{title}</h3>
                <p lang="zh-Hant">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tea-history-scroll">
        <div className="courtyard-container">
          <SectionIntro
            eyebrow="Tea Culture Timeline"
            title="茶，如何穿過中國歷史"
            english="Tea Through Chinese History"
            copy="A horizontal cultural scroll, moving from origin myth to modern emotional tea ritual."
          />
          <div className="history-scroll" aria-label="Tea culture timeline">
            {timelineItems.map(([title, body, tag]) => (
              <article key={title}>
                <div className="timeline-image-space">
                  <span>{tag}</span>
                </div>
                <h3 lang="zh-Hant">{title}</h3>
                <p>{body}</p>
                <a href={withBasePath("/tea-atlas/")}>
                  Learn More <ArrowRight size={14} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tea-atlas-section">
        <div className="courtyard-container">
          <SectionIntro
            eyebrow="Tea Atlas"
            title="找到你的茶方向"
            english="Find Your Tea Direction"
          />
          <div className="tea-direction-grid">
            {teaCards.map(([name, chinese, feeling, state, time, difficulty]) => (
              <article key={name}>
                <h3>{name}</h3>
                <strong lang="zh-Hant">{chinese}</strong>
                <dl>
                  <div>
                    <dt>Feeling</dt>
                    <dd>{feeling}</dd>
                  </div>
                  <div>
                    <dt>Suitable state</dt>
                    <dd>{state}</dd>
                  </div>
                  <div>
                    <dt>Best drinking time</dt>
                    <dd>{time}</dd>
                  </div>
                  <div>
                    <dt>Beginner difficulty</dt>
                    <dd>{difficulty}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <a href={withBasePath("/discover-your-tea/index.html")} className="atlas-test-cta">
            不知道適合哪一種？開始茶測試 <span>Not sure where to begin? Start the Tea Test</span>
          </a>
        </div>
      </section>

      <section className="tea-journey-section">
        <div className="courtyard-container">
          <SectionIntro
            eyebrow="Tea Boxes"
            title="開始，或延續你的茶旅程"
            english="Begin or Continue Your Tea Journey"
          />
          <div className="journey-card-grid">
            {journeyCards.map(([title, body, action], index) => (
              <article key={title}>
                {index === 0 ? <Sparkles size={21} /> : index === 3 ? <BriefcaseBusiness size={21} /> : <Gift size={21} />}
                <h3>{title}</h3>
                <p>{body}</p>
                <a href={index === 0 ? withBasePath("/discover-your-tea/index.html") : withBasePath("/gift-box/")}>
                  {action}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="membership-section">
        <div className="courtyard-container membership-layout">
          <SectionIntro
            eyebrow="Membership Preview"
            title="每個月，延續你的茶文化旅程"
            english="Continue Your Tea Journey Month by Month"
            copy="Membership is positioned as continuing cultural practice, not just a subscription."
          />
          <div className="membership-tiers">
            {membershipTiers.map(([title, body]) => (
              <article key={title}>
                <Check size={18} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="b2b-gifts-section">
        <div className="courtyard-container b2b-layout">
          <div>
            <SectionIntro
              eyebrow="B2B Cultural Gifts"
              title="為重要關係準備的文化禮盒"
              english="Cultural Gifts for Meaningful Relationships"
              copy="Tea boxes for moments where respect, memory, and cultural texture matter."
            />
            <a href={withBasePath("/b2b/")} className="courtyard-cta primary">
              查詢企業茶禮盒 / Enquire for B2B Gift Box
            </a>
          </div>
          <div className="b2b-use-grid">
            {b2bUses.map((use) => (
              <span key={use}>{use}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="journal-section" id="journal">
        <div className="courtyard-container journal-layout">
          <SectionIntro
            eyebrow="Journal / Learning Hub"
            title="繼續認識茶"
            english="Learn More About Tea"
          />
          <div className="journal-category-grid">
            {journalCategories.map((category) => (
              <a key={category} href={withBasePath("/tea-atlas/")} lang="zh-Hant">
                {category}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="courtyard-closing" aria-label="Chazen closing statement">
        <div className="courtyard-container">
          <Moon size={22} aria-hidden="true" />
          <p>
            Chazen is a modern Chinese tea culture experience designed for calm, connection, and
            self-understanding.
          </p>
          <p lang="zh-Hant">Chazen 是一個現代中國茶文化體驗品牌，為平靜、連結與自我理解而設。</p>
          <a href={withBasePath("/discover-your-tea/index.html")} className="courtyard-cta primary">
            Start Tea Test <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
