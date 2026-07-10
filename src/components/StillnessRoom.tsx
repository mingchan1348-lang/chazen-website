"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, Timer, Volume2 } from "lucide-react";

const moods = [
  {
    name: "Scattered",
    tea: "Wuyi Rock Tea",
    copy: "Mineral warmth and roasted depth for returning attention to the body."
  },
  {
    name: "Heavy",
    tea: "Longjing",
    copy: "Spring green clarity for a lighter, cleaner beginning."
  },
  {
    name: "Restless",
    tea: "High Mountain Oolong",
    copy: "Soft alpine aroma for slowing the edge of the day."
  }
];

export function StillnessRoom() {
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const [mood, setMood] = useState(moods[0]);
  const bowlAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!running || seconds === 0) {
      return;
    }

    const interval = window.setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearInterval(interval);
  }, [running, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      setRunning(false);
    }
  }, [seconds]);

  const timeLabel = useMemo(() => {
    const mins = Math.floor(seconds / 60);
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }, [seconds]);

  function toggleMeditation() {
    if (seconds === 0) {
      setSeconds(60);
      setRunning(true);
      return;
    }

    setRunning((value) => !value);
  }

  function resetMeditation() {
    setSeconds(60);
    setRunning(false);
  }

  function strikeBowl() {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    if (!bowlAudioRef.current) {
      bowlAudioRef.current = new Audio(`${basePath}/audio/singing-bowl.mp3`);
    }

    const audio = bowlAudioRef.current;
    audio.currentTime = 0;
    audio.volume = 0.6;
    void audio.play();
  }

  return (
    <div className="premium-card mx-auto max-w-2xl bg-porcelain p-8 sm:p-12">
      <div className="text-center">
        <div
          className={`mx-auto grid h-16 w-16 place-items-center rounded-full border border-moss/30 bg-moss/5 text-[0.65rem] font-bold uppercase tracking-widest text-moss ${
            running ? "animate-pulse" : ""
          }`}
          aria-hidden="true"
        >
          {running ? "Breathe" : "Begin"}
        </div>
        <p className="museum-label mt-6 text-brass">60-second tea meditation</p>
        <p className="display-title mt-3 text-6xl leading-none text-ink">{timeLabel}</p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-ink/62">
          Let the first sound mark the beginning. Watch the breath expand and release. Return to
          the cup before returning to the day.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button type="button" className="button-primary" onClick={toggleMeditation}>
          {running ? <Pause size={17} /> : <Play size={17} />}
          {running ? "Pause" : seconds === 0 ? "Restart" : "Begin"}
        </button>
        <button type="button" className="button-secondary" onClick={resetMeditation}>
          <Timer size={17} />
          Reset
        </button>
        <button type="button" className="button-secondary" onClick={strikeBowl}>
          <Volume2 size={17} />
          Strike bowl
        </button>
      </div>

      <div className="mt-10 border-t border-ink/10 pt-8">
        <p className="museum-label text-center text-ink/50">How are you feeling?</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {moods.map((item) => (
            <button
              type="button"
              key={item.name}
              aria-pressed={mood.name === item.name}
              className={
                mood.name === item.name
                  ? "rounded-full border border-moss bg-moss px-4 py-2 text-sm font-semibold text-porcelain transition"
                  : "rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink/68 transition hover:border-moss/50"
              }
              onClick={() => setMood(item)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-clay/20 bg-paper px-6 py-5 text-center">
          <p className="museum-label text-clay">Recommended tea</p>
          <strong className="display-title mt-2 block text-2xl text-ink">{mood.tea}</strong>
          <span className="mt-1 block text-sm leading-6 text-ink/62">{mood.copy}</span>
        </div>
      </div>
    </div>
  );
}
