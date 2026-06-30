"use client";

import { Pause, Volume2, Waves, Wind } from "lucide-react";

type SoundDockProps = {
  open: boolean;
  active: boolean;
  activeLabel?: string;
  notice: string;
  onToggle: () => void;
  onPlay: (path: string, label: string, loop?: boolean) => void;
  onStop: () => void;
};

export function SoundDock({ open, active, activeLabel, notice, onToggle, onPlay, onStop }: SoundDockProps) {
  return (
    <div className={`sound-dock ${active ? "is-playing" : ""} ${activeLabel === "Singing Bowl" ? "is-bowl" : ""}`}>
      {open && (
        <div className="sound-menu" role="menu" aria-label="Sound menu" aria-live="polite">
          <div className="sound-menu-head">
            <strong>Sound of Stillness</strong>
            <span lang="zh-Hant">靜心之聲</span>
            <p>{notice}</p>
          </div>
          <button type="button" role="menuitem" onClick={() => onPlay("/audio/singing-bowl.mp3", "Singing Bowl")}>
            <Volume2 size={15} aria-hidden="true" />
            <span>
              Singing Bowl <em lang="zh-Hant">冥想鉢</em>
              <small>A single resonant bowl sound for stillness.</small>
            </span>
          </button>
          <button type="button" role="menuitem" onClick={() => onPlay("/audio/tea-pour.mp3", "Tea Pouring")}>
            <Waves size={15} aria-hidden="true" />
            <span>
              Tea Pouring <em lang="zh-Hant">注水聲</em>
              <small>Short sound of hot water entering tea.</small>
            </span>
          </button>
          <button type="button" role="menuitem" onClick={() => onPlay("/audio/garden-rain.mp3", "Garden Rain", true)}>
            <Wind size={15} aria-hidden="true" />
            <span>
              Garden Rain <em lang="zh-Hant">庭雨</em>
              <small>Soft ambient rain loop for garden stillness.</small>
            </span>
          </button>
          <button type="button" role="menuitem" onClick={() => onPlay("/audio/tea-room-ambience.mp3", "Tea Room Ambience", true)}>
            <Waves size={15} aria-hidden="true" />
            <span>
              Tea Room Ambience <em lang="zh-Hant">茶室環境聲</em>
              <small>Subtle ceramic, water, and room tone.</small>
            </span>
          </button>
          <button type="button" role="menuitem" onClick={onStop}>
            <Pause size={15} aria-hidden="true" />
            <span>
              Silent Mode <em lang="zh-Hant">靜音</em>
              <small>Stops all current audio.</small>
            </span>
          </button>
        </div>
      )}
      <button
        type="button"
        className="sound-toggle"
        aria-label={open ? "Close sound controls" : "Open sound controls"}
        aria-expanded={open}
        onClick={onToggle}
      >
        <Volume2 size={17} aria-hidden="true" />
        <span>
          Sound of Stillness <em lang="zh-Hant">靜心之聲</em>
        </span>
      </button>
    </div>
  );
}
