"use client";

type StillnessPracticeProps = {
  onStart: () => void;
  onPlayBowl: () => void;
  onStop: () => void;
  onMood: () => void;
  onWatchRoom: () => void;
  onAmbience: () => void;
};

export function StillnessPractice({ onStart, onPlayBowl, onStop, onMood, onWatchRoom, onAmbience }: StillnessPracticeProps) {
  return (
    <article id="stillness-mode" className="stillness-panel stillness-practice-panel">
      <p className="museum-kicker">Chapter 08 / Stillness Mode / 靜心茶室</p>
      <h2>Breathe in. Return to the tea. Breathe out. Return to yourself.</h2>
      <p lang="zh-Hant">吸氣，回到茶。呼氣，回到自己。</p>
      <div className="stillness-practice-stage" aria-hidden="true">
        <div className="practice-orb">
          <span>4</span>
          <small>Inhale</small>
        </div>
        <div className="practice-steam" />
        <div className="bowl-stage">
          <span className="bowl-rim" />
          <span className="bowl-body" />
          <span className="bowl-smoke" />
        </div>
        <div className="practice-exhale">
          <span>6</span>
          <small>Exhale</small>
        </div>
      </div>
      <div className="stillness-options">
        {["Breathing Guide 呼吸引導", "Sound of Bowl 鉢聲", "Tea Meditation 茶靜心", "Return Practice 回歸練習"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <dl className="stillness-detail-grid">
        <div>
          <dt>Purpose</dt>
          <dd>A short guided return through breath, sound, and tea.</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>60 seconds</dd>
        </div>
        <div>
          <dt>Rhythm</dt>
          <dd>inhale 4 / exhale 6</dd>
        </div>
        <div>
          <dt>Outcome</dt>
          <dd>calm attention and tea recommendation</dd>
        </div>
      </dl>
      <div className="chapter-actions">
        <button type="button" className="dark-cta compact" onClick={onStart}>
          Start 60-Second Practice <span lang="zh-Hant">開始一分鐘靜心</span>
        </button>
        <button type="button" className="dark-cta compact" onClick={onPlayBowl}>
          Play Singing Bowl
        </button>
        <button type="button" className="dark-cta compact" onClick={onAmbience}>
          Tea Room Ambience
        </button>
        <button type="button" className="dark-cta compact" onClick={onWatchRoom}>
          Watch Stillness Room
        </button>
        <button type="button" className="dark-cta compact" onClick={onMood}>
          Tea Recommendation
        </button>
        <button type="button" className="dark-cta compact" onClick={onStop}>
          Silent Mode
        </button>
      </div>
    </article>
  );
}
