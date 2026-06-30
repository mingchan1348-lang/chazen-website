"use client";

import Image from "next/image";
import { useState } from "react";
import { ChazenHomeExperience } from "@/components/ChazenHomeExperience";
import { VideoModal } from "@/components/VideoModal";

export default function Home() {
  const [filmOpen, setFilmOpen] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <main className="museum-home">
      <section className="cinema-hero" aria-labelledby="home-title">
        <Image
          src={`${basePath}/images/chazen-tea-room-hero-v2.png`}
          alt="A dark wooden Chinese tea room with a real gongfu tea table, gaiwan, fairness cup, tasting cups, tea tray, singing bowl, steam, and garden morning light."
          fill
          priority
          sizes="100vw"
          className="cinema-hero-image"
        />
        <div className="cinema-hero-shade" />
        <div className="cinema-hero-inner">
          <p className="museum-kicker hero-eyebrow">Private tea room / 茶禪入室</p>
          <div>
            <h1 id="home-title" className="cinema-title">
              CHAZEN <span>茶禪</span>
            </h1>
            <div className="cinema-tagline">
              <p>
                One Cup.
                <br />
                One Breath.
                <br />
                One Return.
              </p>
              <p lang="zh-Hant">一盞茶，一口氣，回到當下。</p>
            </div>
            <div className="hero-actions">
              <a href="#tea-table" className="museum-cta">
                Enter the Ritual
              </a>
              <button type="button" className="museum-cta museum-cta-secondary" onClick={() => setFilmOpen(true)}>
                Watch Ritual Film
              </button>
            </div>
          </div>
          <aside className="hero-object-caption" aria-label="Hero object caption">
            <span>01</span>
            <p>
              Gaiwan, fairness cup, tasting cups, tea tray, singing bowl, morning garden light.
            </p>
            <small lang="zh-Hant">蓋碗、公道杯、品茗杯、茶盤、冥想鉢與晨光。</small>
          </aside>
          <div className="hero-scroll-cue" aria-hidden="true">
            <span />
            Scroll
          </div>
        </div>
      </section>

      <ChazenHomeExperience />
      <VideoModal
        open={filmOpen}
        title="Ritual Film Coming Soon"
        src={`${basePath}/video/chazen-ritual-film.mp4`}
        onClose={() => setFilmOpen(false)}
      />
    </main>
  );
}
