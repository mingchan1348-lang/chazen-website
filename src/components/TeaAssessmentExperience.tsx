"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Download, Loader2, Lock, RotateCcw } from "lucide-react";
import { buildInquiryPath } from "@/lib/inquiry";
import { useLanguage } from "@/lib/language";

// Set this once the Chazen Shopify store is connected: the checkout URL for
// the First Pack (A$25) product, which is what unlocking the full Tea-Mind
// report is bundled with. Until it's set, the unlock button falls back to
// the same email-inquiry flow already used elsewhere on the site.
const UNLOCK_CHECKOUT_URL = "";
const UNLOCK_STORAGE_KEY = "chazen-tea-mind-report-unlocked";

// Set this to a real form endpoint (Formspree, or any service that accepts a
// plain POST) once one is set up, and this actually starts building an email
// list. Until then, the email step still gates the result — it just doesn't
// save the address anywhere.
const EMAIL_CAPTURE_ENDPOINT = "";
const EMAIL_STORAGE_KEY = "chazen-tea-mind-email-captured";

type ResultKey = "qixu" | "yinxu" | "qiyu" | "tanshi";

type AssessmentOption = {
  label: string;
  labelZh: string;
  result: ResultKey;
};

type AssessmentQuestion = {
  id: string;
  question: string;
  questionZh: string;
  // Short, optional "why we ask this" line shown under a question — used
  // sparingly, only where a question might otherwise feel like it's probing
  // something clinical rather than a lifestyle reflection.
  context?: string;
  contextZh?: string;
  options: AssessmentOption[];
};

type ResultProfile = {
  key: ResultKey;
  character: string;
  chineseName: string;
  pinyin: string;
  englishName: string;
  need: string;
  needZh: string;
  quickRead: string;
  quickReadZh: string;
  interpretation: string;
  interpretationZh: string;
  teaFeeling: string;
  teaFeelingZh: string;
  currentState: string;
  currentStateZh: string;
  strengths: string[];
  strengthsZh: string[];
  watchOuts: string[];
  watchOutsZh: string[];
  teas: string[];
  teasZh: string[];
  ritualName: string;
  ritualNameZh: string;
  ritualSteps: string[];
  ritualStepsZh: string[];
  product: string;
  productZh: string;
};

// Inspired by simplified Traditional Chinese Medicine body-constitution
// patterns (體質). Framed for reflection and lifestyle inspiration, not
// medical diagnosis — see the disclaimer shown alongside every result.
const resultOrder: ResultKey[] = ["qixu", "yinxu", "qiyu", "tanshi"];

const resultProfiles: Record<ResultKey, ResultProfile> = {
  qixu: {
    key: "qixu",
    character: "虛",
    chineseName: "氣虛",
    pinyin: "qì xū",
    englishName: "Running Low",
    need: "Rebuilding energy, gently.",
    needZh: "溫和地重建能量。",
    quickRead: "You're not lazy — you're running on a reserve tank.",
    quickReadZh: "你不是懶惰——你正在用儲備的油箱撐著。",
    interpretation:
      "In traditional Chinese wellness terms, this pattern is close to 氣虛 (qì xū), or qi deficiency — when the body's working energy runs low and even ordinary things start to feel effortful. This isn't a diagnosis; it's a familiar pattern for anyone stretched thin for too long. A warming, easily-digested tea can help rebuild reserves rather than spend more of what's left.",
    interpretationZh:
      "以傳統中式養生的角度來說，這個模式接近「氣虛」——當身體運作的能量變低，連平常的小事也開始覺得吃力。這不是診斷，而是任何被拉得太緊太久的人都會熟悉的狀態。一杯溫和、容易入口的茶，能幫助重建儲備，而不是再消耗所剩無幾的能量。",
    teaFeeling: "Warm brown, soft steam, an easy first sip.",
    teaFeelingZh: "溫暖的棕色、柔和的茶煙，以及容易入口的第一口。",
    currentState:
      "You may tire more easily than usual, catch colds more often, or feel your motivation thinning by late afternoon.",
    currentStateZh: "你可能比平常更容易疲累、更常感冒，或是到了下午動力就開始變薄弱。",
    strengths: ["Deeply attuned to your own limits", "Careful and considered rather than reckless", "Good at conserving what matters, once you notice the pattern"],
    strengthsZh: ["對自己的極限有深刻的覺察", "謹慎周到，而非魯莽行事", "一旦察覺模式，就懂得保存真正重要的東西"],
    watchOuts: ["Pushing through tiredness instead of resting early", "Skipping meals when busy, which drains reserves further", "Mistaking rest for laziness"],
    watchOutsZh: ["硬撐著疲累，而不是提早休息", "忙碌時跳過正餐，進一步耗損儲備", "把休息誤認為懶惰"],
    teas: ["Roasted oolong", "Aged white tea", "Ripe pu-erh", "Red date and longan blend"],
    teasZh: ["焙火烏龍", "陳年白茶", "熟普洱", "紅棗桂圓茶"],
    ritualName: "Rebuild Ritual",
    ritualNameZh: "重建儀式",
    ritualSteps: [
      "Warm the cup before pouring — let your hands feel it first.",
      "Drink slowly, in a seated, unhurried posture.",
      "After the last sip, name one thing you'll do less of today."
    ],
    ritualStepsZh: [
      "倒茶前先溫杯——讓雙手先感受溫度。",
      "坐著，以不急促的姿態慢慢喝。",
      "喝完最後一口後，說出今天你要少做的一件事。"
    ],
    product: "Starter Tea Box",
    productZh: "入門茶盒"
  },
  yinxu: {
    key: "yinxu",
    character: "陰",
    chineseName: "陰虛",
    pinyin: "yīn xū",
    englishName: "Tired but Wired",
    need: "Cooling down a mind that won't switch off.",
    needZh: "為一顆停不下來的心降溫。",
    quickRead: "Your body's tired, but nobody told your mind to stop.",
    quickReadZh: "你的身體累了，但沒有人告訴你的腦袋要停下來。",
    interpretation:
      "This pattern is close to what's traditionally called 陰虛 (yīn xū), or yin deficiency — a kind of depleted restlessness, where the body wants rest but runs a little hot and wired instead of settling. It often shows up as difficulty winding down at night even when you're exhausted. A cooling, low-caffeine tea can support the transition into rest instead of fighting it.",
    interpretationZh:
      "這個模式接近傳統所說的「陰虛」——一種耗竭中的不安，身體想要休息，卻偏向燥熱與亢奮，而不是安定下來。它常常表現為即使已經很疲累，晚上還是難以放鬆。一杯清涼、低咖啡因的茶，能支持你過渡到休息，而不是與之對抗。",
    teaFeeling: "Pale gold, cool steam, a quiet aftertaste.",
    teaFeelingZh: "淡金色、清涼的茶煙，以及安靜的回味。",
    currentState:
      "You may feel warm or restless in the evening, wake up during the night, or notice your thoughts speeding up right when your body wants to slow down.",
    currentStateZh: "你可能在晚上感到燥熱或不安、半夜醒來，或是在身體想要慢下來時，思緒反而加快。",
    strengths: ["Responsible and rarely lets things drop", "Sensitive to your own internal signals, even if you override them", "Capable of real stillness once you actually arrive there"],
    strengthsZh: ["負責任，很少讓事情脫落", "對自己內在的訊號敏感，即使常常忽略它們", "一旦真正抵達，就能有真實的靜定"],
    watchOuts: ["Scrolling through the transition into night instead of winding down", "Caffeine or stimulation too late in the day", "Treating rest as another thing to optimize"],
    watchOutsZh: ["在該放鬆的過渡時刻仍在滑手機", "太晚攝取咖啡因或刺激性飲品", "把休息也當成另一件要優化的事"],
    teas: ["White tea", "Aged white tea", "Low-caffeine herbal blend", "Chrysanthemum white tea"],
    teasZh: ["白茶", "陳年白茶", "低咖啡因花草茶", "菊花白茶"],
    ritualName: "Evening Cooling Ritual",
    ritualNameZh: "夜間降溫儀式",
    ritualSteps: [
      "Thirty minutes before bed, put the phone in another room.",
      "Prepare a low-caffeine or herbal tea.",
      "Drink slowly in dim light, and let your exhale get longer than your inhale."
    ],
    ritualStepsZh: [
      "睡前三十分鐘，把手機放到另一個房間。",
      "準備一杯低咖啡因或花草茶。",
      "在昏黃的燈光下慢慢喝，讓呼氣比吸氣更長。"
    ],
    product: "Evening Calm Tea Box",
    productZh: "夜間安神茶盒"
  },
  qiyu: {
    key: "qiyu",
    character: "鬱",
    chineseName: "氣鬱",
    pinyin: "qì yù",
    englishName: "Held Tension",
    need: "Releasing what's being held instead of said.",
    needZh: "釋放那些被壓抑而未說出口的情緒。",
    quickRead: "You're still functioning well — but your body's been holding tension your schedule hasn't had room for.",
    quickReadZh: "你仍然運作良好——但你的身體一直在承受著行程裡沒有空間安放的緊繃。",
    interpretation:
      "This pattern echoes 氣鬱 (qì yù), or qi stagnation — where emotional or physical tension gets held rather than moved through, often while you're still outwardly coping fine. It can show up as tightness in the chest or shoulders, a shorter temper, or a sigh you don't notice you're making. A floral, aromatic tea can support release by making it feel natural rather than forced.",
    interpretationZh:
      "這個模式呼應「氣鬱」——情緒或身體的緊繃被壓抑，而不是被疏通，即使外表看起來仍應付自如。它可能表現為胸口或肩膀的緊繃、脾氣變得急躁，或是自己都沒察覺的嘆氣。一杯花香、芬芳的茶，能讓釋放感覺自然，而不是刻意勉強。",
    teaFeeling: "Soft amber, floral lift, an open exhale.",
    teaFeelingZh: "柔和的琥珀色、揚起的花香，以及舒展的呼氣。",
    currentState:
      "You may notice tension in your shoulders or jaw, feel more irritable than usual, or catch yourself sighing without meaning to.",
    currentStateZh: "你可能注意到肩膀或下顎的緊繃、比平常更容易煩躁，或是不自覺地嘆氣。",
    strengths: ["Expressive once given the room", "Sensitive to what needs to shift, even before you can name it", "Able to move tension out through the body, not just the mind"],
    strengthsZh: ["一旦有空間，就能表達自己", "對於需要改變的事情敏感，即使尚未能說清楚", "能透過身體，而不只是思緒，把緊繃釋放出來"],
    watchOuts: ["Holding pressure until it sharpens into irritation", "Skipping movement or fresh air when busy", "Trying to think your way through what the body needs to release"],
    watchOutsZh: ["把壓力一直壓著，直到變成尖銳的煩躁", "忙碌時省略運動或呼吸新鮮空氣", "試圖用思考解決身體需要釋放的東西"],
    teas: ["Jasmine green tea", "Phoenix dancong", "Floral oolong", "Osmanthus oolong"],
    teasZh: ["茉莉綠茶", "鳳凰單叢", "花香烏龍", "桂花烏龍"],
    ritualName: "Breathe and Release Ritual",
    ritualNameZh: "呼吸與釋放儀式",
    ritualSteps: [
      "Inhale slowly with the aroma before the first sip.",
      "Exhale fully after each sip — longer than the inhale.",
      "Roll your shoulders back once, and let your jaw unclench."
    ],
    ritualStepsZh: [
      "第一口之前，隨著香氣緩緩吸氣。",
      "每一口之後完全呼氣——比吸氣更長。",
      "把肩膀往後轉一次，讓下顎放鬆。"
    ],
    product: "Relaxation Tea Ritual Box",
    productZh: "放鬆茶儀式盒"
  },
  tanshi: {
    key: "tanshi",
    character: "濕",
    chineseName: "痰濕",
    pinyin: "tán shī",
    englishName: "Foggy & Heavy",
    need: "Clearing fog, lifting weight.",
    needZh: "撥開迷霧，卸下重量。",
    quickRead: "Nothing's technically wrong — you're just moving through fog today.",
    quickReadZh: "其實沒有什麼問題——你今天只是在霧中前行。",
    interpretation:
      "This pattern is close to 痰濕 (tán shī), sometimes translated as dampness — a heavy, sluggish quality where the body and mind feel weighed down and motivation is hard to locate. It's common after too many disrupted routines or too little movement. A bright, clean tea can help cut through the fog rather than add to the heaviness.",
    interpretationZh:
      "這個模式接近「痰濕」——一種沉重、遲緩的特質，身體與心靈都感覺被壓著，難以找到動力。這在生活作息紊亂或運動不足之後很常見。一杯明亮、乾淨的茶，能幫助撥開迷霧，而不是增添沉重感。",
    teaFeeling: "Bright green, clean lift, a light finish.",
    teaFeelingZh: "明亮的綠色、乾淨的揚升感，以及輕盈的尾韻。",
    currentState:
      "You may feel physically heavy, mentally cloudy, or find it hard to start things even when you have the time.",
    currentStateZh: "你可能感到身體沉重、思緒模糊，或是即使有時間也難以開始做事。",
    strengths: ["Steady and low-drama under the surface", "Good at noticing when something needs to change, even if starting is hard", "Capable of real clarity once the fog lifts"],
    strengthsZh: ["表面平穩、不喜張揚", "擅長察覺什麼時候該改變，即使開始很難", "一旦霧散開，就能擁有真正的清晰"],
    watchOuts: ["Staying still when movement is what would actually help", "Heavy meals or screens instead of fresh air", "Waiting to feel motivated before starting anything"],
    watchOutsZh: ["明明運動才有幫助，卻選擇靜止不動", "以豐盛餐點或螢幕時間取代新鮮空氣", "等到有動力才願意開始任何事"],
    teas: ["High mountain oolong", "Longjing", "Raw pu-erh", "Green tea"],
    teasZh: ["高山烏龍", "龍井", "生普洱", "綠茶"],
    ritualName: "Clear the Fog Ritual",
    ritualNameZh: "撥霧儀式",
    ritualSteps: [
      "Open a window or step outside before your first sip.",
      "Drink standing or walking, not sitting still.",
      "Notice one small thing you can start today — not finish, just start."
    ],
    ritualStepsZh: [
      "喝第一口之前，先開窗或走到戶外。",
      "站著或走動著喝，而不是靜坐不動。",
      "留意今天可以開始的一件小事——不必完成，只需開始。"
    ],
    product: "Focus Tea Set",
    productZh: "專注茶組"
  }
};

// Free quick-read: 6 plain body-signal questions (energy, temperature,
// sleep, stress response, digestion, and today's need), scored into four
// simplified TCM-inspired patterns. Deliberately not poetic or mystical —
// these read like a short wellness check-in, not a personality quiz.
const questions: AssessmentQuestion[] = [
  {
    id: "energy",
    question: "How's your energy level most days lately?",
    questionZh: "最近大部分日子，你的精力水平如何？",
    options: [
      { label: "Low — I tire quickly", labelZh: "偏低——我很容易疲累", result: "qixu" },
      { label: "Fine in the day, but I can't wind down at night", labelZh: "白天還好，但晚上無法放鬆", result: "yinxu" },
      { label: "Okay, but I feel tight or on edge", labelZh: "還可以，但感覺緊繃或焦躁", result: "qiyu" },
      { label: "Sluggish and foggy — hard to get going", labelZh: "遲緩又昏沉——很難提起勁", result: "tanshi" }
    ]
  },
  {
    id: "temperature",
    question: "Do you run hot or cold?",
    questionZh: "你比較容易怕冷還是怕熱？",
    options: [
      { label: "I get cold easily, especially hands and feet", labelZh: "很容易怕冷，尤其手腳", result: "qixu" },
      { label: "I run warm at night and sleep restlessly", labelZh: "晚上容易燥熱，睡不安穩", result: "yinxu" },
      { label: "Depends on my stress levels that day", labelZh: "視乎當天的壓力程度", result: "qiyu" },
      { label: "Neither — I feel heavy and damp more than hot or cold", labelZh: "都不是——比起冷熱，更覺得沉重潮濕", result: "tanshi" }
    ]
  },
  {
    id: "sleep",
    question: "How's your sleep been?",
    questionZh: "你最近的睡眠狀況如何？",
    options: [
      { label: "I fall asleep fine but wake up tired", labelZh: "入睡沒問題，但醒來仍然疲累", result: "qixu" },
      { label: "Hard to switch my mind off at night", labelZh: "晚上很難讓腦袋停下來", result: "yinxu" },
      { label: "I lie there thinking about everything I'm holding onto", labelZh: "躺著時想著所有放不下的事", result: "qiyu" },
      { label: "I sleep plenty but never feel rested", labelZh: "睡了很久，但從未感覺充分休息", result: "tanshi" }
    ]
  },
  {
    id: "stress-response",
    question: "When you're stressed, what happens in your body?",
    questionZh: "當你感到壓力時，身體會有什麼反應？",
    options: [
      { label: "I just feel drained, like I have nothing left", labelZh: "只覺得被掏空，好像什麼都不剩", result: "qixu" },
      { label: "I feel wired and restless, can't settle", labelZh: "感覺亢奮不安，無法安定", result: "yinxu" },
      { label: "Tightness in my chest or shoulders, sometimes a sigh", labelZh: "胸口或肩膀緊繃，有時會嘆氣", result: "qiyu" },
      { label: "I want to shut down and do nothing", labelZh: "只想關機，什麼都不做", result: "tanshi" }
    ]
  },
  {
    id: "digestion",
    question: "How's your appetite and digestion lately?",
    questionZh: "你最近的食慾與消化狀況如何？",
    options: [
      { label: "Small appetite, low energy after eating", labelZh: "食慾不佳，飯後沒精神", result: "qixu" },
      { label: "Fine, but I get thirsty and crave cool drinks", labelZh: "還好，但容易口渴、想喝涼的", result: "yinxu" },
      { label: "Comes and goes with my stress levels", labelZh: "隨壓力程度時好時壞", result: "qiyu" },
      { label: "Heavy and bloated after meals", labelZh: "飯後感覺沉重、脹氣", result: "tanshi" }
    ]
  },
  {
    id: "thirst",
    question: "How thirsty do you feel through the day?",
    questionZh: "你白天的口渴程度如何？",
    options: [
      { label: "Not very thirsty — I forget to drink water", labelZh: "不太渴——我常常忘記喝水", result: "qixu" },
      { label: "Thirsty especially at night, with a dry mouth", labelZh: "特別是晚上容易口渴、口乾", result: "yinxu" },
      { label: "Depends on my mood or stress that day", labelZh: "視乎當天的心情或壓力", result: "qiyu" },
      { label: "Not thirsty, but my mouth feels sticky or heavy", labelZh: "不太渴，但口腔感覺黏膩沉重", result: "tanshi" }
    ]
  },
  {
    id: "mood",
    question: "Which feels closer to how your days have been?",
    questionZh: "哪一個比較接近你最近的日子？",
    context: "Asking about mood as an everyday feeling, not a mental-health check.",
    contextZh: "這裡問的是日常的感覺，而非心理健康檢測。",
    options: [
      { label: "Low on drive, easily discouraged — I run out of steam", labelZh: "動力不足，容易氣餒——很快就沒力氣", result: "qixu" },
      { label: "Restless or wired by evening, hard to switch off", labelZh: "傍晚後不安或亢奮，難以放鬆", result: "yinxu" },
      { label: "Tense, and quicker to snap when things pile up", labelZh: "緊繃，事情一多就容易發脾氣", result: "qiyu" },
      { label: "Flat and hard to motivate — things roll off me", labelZh: "情緒平淡、提不起勁——什麼都無感", result: "tanshi" }
    ]
  },
  {
    id: "focus",
    question: "How's your focus during the day?",
    questionZh: "你白天的專注力如何？",
    options: [
      { label: "I start strong but fade fast", labelZh: "一開始很好，但很快就沒力", result: "qixu" },
      { label: "Sharp, but overactive — hard to switch off", labelZh: "清晰但過度活躍——很難停下來", result: "yinxu" },
      { label: "Distracted by whatever's bothering me", labelZh: "容易被煩心事分心", result: "qiyu" },
      { label: "Slow to start, foggy most of the day", labelZh: "很難開始，一整天都昏沉", result: "tanshi" }
    ]
  },
  {
    id: "today-needs",
    question: "What does today actually need from you?",
    questionZh: "今天，你真正需要的是什麼？",
    options: [
      { label: "Permission to rest without guilt", labelZh: "允許自己休息而不內疚", result: "qixu" },
      { label: "A way to actually switch off", labelZh: "一個真正能關機的方法", result: "yinxu" },
      { label: "Somewhere to put this tension", labelZh: "一個安放這份緊繃的地方", result: "qiyu" },
      { label: "A clear head and a reason to move", labelZh: "清晰的頭腦與行動的理由", result: "tanshi" }
    ]
  }
];

type QuizPhase = "intro" | "question" | "loading" | "email" | "result";

type QuizResult = {
  scores: Record<ResultKey, number>;
  primary: ResultProfile;
  secondary: ResultProfile;
  blended: boolean;
};

function calculateResult(answers: ResultKey[]): QuizResult {
  const scores = resultOrder.reduce(
    (current, key) => ({ ...current, [key]: 0 }),
    {} as Record<ResultKey, number>
  );

  answers.forEach((answer) => {
    scores[answer] += 2;
  });

  const [primaryKey, secondaryKey] = [...resultOrder].sort((a, b) => scores[b] - scores[a]);

  return {
    scores,
    primary: resultProfiles[primaryKey],
    secondary: resultProfiles[secondaryKey],
    blended: scores[primaryKey] - scores[secondaryKey] <= 2
  };
}

function formatProfileName(profile: ResultProfile) {
  return `${profile.chineseName} (${profile.pinyin}) | ${profile.englishName}`;
}

export function TeaAssessmentExperience({ basePath }: { basePath: string }) {
  const { t, language } = useLanguage();
  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<ResultKey[]>([]);
  const [saveState, setSaveState] = useState<"idle" | "saved">("idle");
  const [unlocked, setUnlocked] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const currentQuestion = questions[currentIndex];
  const progress = phase === "intro" ? 0 : Math.min((answers.length / questions.length) * 100, 100);
  const result = useMemo(() => calculateResult(answers), [answers]);

  useEffect(() => {
    try {
      setEmailCaptured(window.localStorage.getItem(EMAIL_STORAGE_KEY) === "true");
    } catch {
      // Private browsing or storage disabled: default to not-yet-captured.
    }
  }, []);

  useEffect(() => {
    if (phase !== "loading") {
      return;
    }

    const loadingTimer = window.setTimeout(() => {
      // Returning visitors who already gave an email skip straight to the result.
      setPhase(emailCaptured ? "result" : "email");
    }, 1200);

    return () => window.clearTimeout(loadingTimer);
  }, [phase, emailCaptured]);

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!isValid) {
      setEmailError(t("Enter a valid email to see your reading.", "請輸入有效的電郵地址以查看你的結果。"));
      return;
    }

    setEmailError("");

    if (EMAIL_CAPTURE_ENDPOINT) {
      try {
        await fetch(EMAIL_CAPTURE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed, source: "Chazen wellness check-in" })
        });
      } catch {
        // Don't block the result if the capture request fails.
      }
    }

    try {
      window.localStorage.setItem(EMAIL_STORAGE_KEY, "true");
    } catch {
      // Private browsing or storage disabled: the gate still passes this session.
    }

    setEmailCaptured(true);
    setPhase("result");
  }

  // A visitor is "unlocked" if they've paid before (flagged in localStorage)
  // or if they've just returned from checkout with ?unlocked=true in the URL
  // (set this as the Shopify order-status redirect once the store is connected).
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromCheckout = params.get("unlocked") === "true";
      const stored = window.localStorage.getItem(UNLOCK_STORAGE_KEY) === "true";

      if (fromCheckout) {
        window.localStorage.setItem(UNLOCK_STORAGE_KEY, "true");
      }

      setUnlocked(fromCheckout || stored);
    } catch {
      // Private browsing or storage disabled: default to locked, no crash.
    }
  }, []);

  function handleStart() {
    setAnswers([]);
    setCurrentIndex(0);
    setSaveState("idle");
    setPhase("question");
  }

  function handleAnswer(resultKey: ResultKey) {
    setSaveState("idle");
    const nextAnswers = [...answers.slice(0, currentIndex), resultKey];
    setAnswers(nextAnswers);

    if (currentIndex >= questions.length - 1) {
      setPhase("loading");
      return;
    }

    window.setTimeout(() => {
      setCurrentIndex((index) => index + 1);
    }, 180);
  }

  function handleBack() {
    if (currentIndex === 0) return;
    setSaveState("idle");
    setCurrentIndex((index) => index - 1);
  }

  function handleRestart() {
    setAnswers([]);
    setCurrentIndex(0);
    setSaveState("idle");
    setPhase("intro");
  }

  async function handleSaveResult() {
    const scoreLines = resultOrder
      .map((key) => `${resultProfiles[key].character} ${resultProfiles[key].chineseName}: ${result.scores[key]}`)
      .join("\n");
    const resultText = [
      `Chazen Tea-Mind Personality: ${formatProfileName(result.primary)}`,
      `${t("Secondary rhythm", "次要傾向")}: ${formatProfileName(result.secondary)}`,
      "",
      t(result.primary.interpretation, result.primary.interpretationZh),
      "",
      `${t("Current state", "目前狀態")}: ${t(result.primary.currentState, result.primary.currentStateZh)}`,
      `${t("Recommended teas", "建議茶款")}: ${(language === "zh" ? result.primary.teasZh : result.primary.teas).join(", ")}`,
      `${t("Recommended Chazen product", "建議 Chazen 產品")}: ${t(result.primary.product, result.primary.productZh)}`,
      "",
      t("Score distribution:", "分數分布："),
      scoreLines
    ].join("\n");

    try {
      const blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `chazen-tea-mind-result-${result.primary.key}.txt`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      // Fall back to clipboard below if a file download isn't available in this environment.
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(resultText);
      }
    } catch {
      // The result remains visible even if clipboard permissions are unavailable.
    }

    setSaveState("saved");
  }

  const ctaHref = buildInquiryPath({
    basePath,
    type: "Tea recommendation",
    message: `I completed the Chazen AI Tea Test. My Tea-Mind Personality is ${formatProfileName(
      result.primary
    )}. I would like to learn more about the ${result.primary.product}.`,
    source: "Chazen AI Tea Test"
  });
  // Once UNLOCK_CHECKOUT_URL is set to a real Shopify checkout link, the unlock
  // button charges A$25 and bundles the First Pack tea. Until then it falls back
  // to the same working email-inquiry flow used by the rest of the site.
  const unlockHref =
    UNLOCK_CHECKOUT_URL ||
    buildInquiryPath({
      basePath,
      type: "Tea recommendation",
      message: `I completed the Chazen AI Tea Test. My quick read is ${formatProfileName(
        result.primary
      )}. I'd like to unlock my full Tea-Mind report and get the First Pack (A$25).`,
      source: "Chazen AI Tea Test — report unlock"
    });
  const routeHref = (path: string) => `${basePath}${path}`;

  return (
    <main className="assessment-page tea-mind-page">
      <section className="assessment-hero tea-mind-hero" aria-labelledby="assessment-title">
        <Image
          src={`${basePath}/images/chazen-hero-gongfu-room-v3.png`}
          alt="A quiet Chinese tea room prepared for a reflective tea assessment."
          fill
          priority
          sizes="100vw"
        />
        <div className="assessment-hero-shade tea-mind-hero-shade" />
        <div className="assessment-hero-inner tea-mind-hero-inner">
          <p className="museum-kicker">Chazen AI Tea Test / 茶心測試</p>
          <h1 id="assessment-title">{t("How are you, right now?", "此刻的你，感覺如何？")}</h1>
          <p>
            {t(
              "Nine plain questions about your energy, sleep, and tension today — inspired by traditional Chinese wellness patterns, not a personality quiz. Free instantly: your pattern and the tea suited to tonight. Unlock the full report for the rest.",
              "九個關於今天精力、睡眠與緊繃程度的簡單問題——靈感來自傳統中式養生模式，而不是性格測驗。立即免費獲得：你的模式，以及今晚適合你的茶。解鎖完整報告，看見其餘的一切。"
            )}
          </p>
          <div className="tea-mind-character-rail" aria-label="Tea-Mind result types">
            {resultOrder.map((key) => (
              <span key={key}>
                <strong>{resultProfiles[key].character}</strong>
                <em>{resultProfiles[key].englishName}</em>
              </span>
            ))}
          </div>
          <p className="tea-mind-disclaimer">
            {t(
              "Inspired by traditional Chinese wellness philosophy, for reflection and lifestyle inspiration — not a medical diagnosis.",
              "靈感來自傳統中式養生哲學，僅供反思與生活方式參考——並非醫療診斷。"
            )}
          </p>
          <div className="assessment-hero-meta">
            <span>{t("9 Questions · 3 Minutes", "九道問題 · 三分鐘")}</span>
            <span>{t("Free Quick Read", "免費速讀")}</span>
            <span>{t("A$25 Full Report + Tea", "A$25 完整報告 + 茶葉")}</span>
          </div>
          <button type="button" className="tea-mind-start-button" onClick={handleStart}>
            {t("Start My Tea Test", "開始我的茶心測試")}
          </button>
        </div>
      </section>

      <section className="museum-section tea-mind-room" aria-label="Tea-Mind assessment">
        <div className="museum-container tea-mind-shell">
          <div className="tea-mind-progress" aria-label="Assessment progress">
            <div>
              <span>
                {phase === "intro"
                  ? t("Before first sip", "第一口之前")
                  : `${Math.min(answers.length + 1, questions.length)} / ${questions.length}`}
              </span>
              <strong>
                {phase === "result"
                  ? t("Result revealed", "結果已揭曉")
                  : phase === "email"
                    ? t("Almost there", "快好了")
                    : phase === "loading"
                      ? t("Reading your pattern", "正在解讀你的模式")
                      : t("Wellness Check-In", "身心狀態check-in")}
              </strong>
            </div>
            <div className="assessment-progress-track tea-mind-progress-track" aria-hidden="true">
              <span style={{ width: `${phase === "result" || phase === "email" ? 100 : progress}%` }} />
            </div>
          </div>

          {phase === "intro" && (
            <section className="tea-mind-intro-panel" aria-label="Assessment introduction">
              <div className="tea-mind-oracle-character" aria-hidden="true">
                茶
              </div>
              <p className="museum-kicker">{t("A quiet check-in, not a quick quiz", "一場安靜的自我檢視，而非快速測驗")}</p>
              <h2>{t("Begin with how your body feels today.", "從今天身體的感覺開始。")}</h2>
              <p>
                {t(
                  "Nine plain questions on energy, sleep, and tension — no poetry, just how you actually feel. Your answers map to a simplified pattern from traditional Chinese wellness philosophy: 氣虛 running low, 陰虛 tired but wired, 氣鬱 held tension, or 痰濕 foggy and heavy. You'll get your pattern and a tea suited to tonight for free — unlock the full report for strengths, watch-outs, and a personal ritual.",
                  "九道關於精力、睡眠與緊繃程度的簡單問題——沒有詩意的包裝，只有你真實的感覺。你的答案會對應到一個簡化的傳統中式養生模式：氣虛（精力不足）、陰虛（累但停不下來）、氣鬱（壓抑的緊繃）、或痰濕（昏沉又沉重）。你將免費獲得你的模式，以及今晚適合你的茶——解鎖完整報告即可看見優勢、注意事項與專屬儀式。"
                )}
              </p>
              <div className="tea-mind-type-grid" aria-label="Four wellness patterns">
                {resultOrder.map((key) => (
                  <article key={key}>
                    <strong>{resultProfiles[key].character}</strong>
                    <span>{resultProfiles[key].chineseName}</span>
                    <em>{t(resultProfiles[key].need, resultProfiles[key].needZh)}</em>
                  </article>
                ))}
              </div>
              <button type="button" className="tea-mind-primary-action" onClick={handleStart}>
                {t("Start My Tea Test", "開始我的茶心測試")}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </section>
          )}

          {phase === "question" && (
            <fieldset key={currentQuestion.id} className="tea-mind-question-panel">
              <legend>
                <span>{t("Question", "問題")} {currentIndex + 1}</span>
                <strong>{t(currentQuestion.question, currentQuestion.questionZh)}</strong>
                {currentQuestion.context ? (
                  <em className="tea-mind-question-context">
                    {t(currentQuestion.context, currentQuestion.contextZh ?? currentQuestion.context)}
                  </em>
                ) : null}
              </legend>
              <div className="tea-mind-options" role="radiogroup" aria-label={t(currentQuestion.question, currentQuestion.questionZh)}>
                {currentQuestion.options.map((option) => {
                  const selected = answers[currentIndex] === option.result;

                  return (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      aria-pressed={selected}
                      key={`${currentQuestion.id}-${option.result}`}
                      className={selected ? "is-selected" : ""}
                      onClick={() => handleAnswer(option.result)}
                    >
                      <span className="tea-mind-option-mark">{resultProfiles[option.result].character}</span>
                      <span>{t(option.label, option.labelZh)}</span>
                    </button>
                  );
                })}
              </div>
              {currentIndex > 0 ? (
                <button type="button" className="tea-mind-back-button" onClick={handleBack}>
                  {t("Back", "上一題")}
                </button>
              ) : null}
            </fieldset>
          )}

          {phase === "loading" && (
            <section className="tea-mind-loading" aria-live="polite">
              <div className="tea-mind-loading-cup" aria-hidden="true">
                <Loader2 size={28} />
                <span />
              </div>
              <span lang={language === "zh" ? "zh-Hant" : undefined}>
                {t("The tea liquor is settling — your result is emerging.", "茶湯漸定，你的結果正在浮現。")}
              </span>
              <h2>{t("Reading your pattern...", "正在解讀你的模式……")}</h2>
              <p>{t("Almost there.", "快好了。")}</p>
            </section>
          )}

          {phase === "email" && (
            <section className="tea-mind-email-gate" aria-label="Email to reveal your result">
              <p className="museum-kicker">{t("One last thing", "最後一步")}</p>
              <h2>{t("Where should we send your reading?", "我們該把結果送到哪裡？")}</h2>
              <p>
                {t(
                  "Your pattern is ready. Leave your email to reveal it — we'll also use it to send tea notes and the occasional offer. No spam, unsubscribe any time.",
                  "你的模式已經準備好了。留下電郵以查看結果——我們也會用它寄送茶語與偶爾的優惠。不會有垃圾郵件，隨時可以取消訂閱。"
                )}
              </p>
              <form onSubmit={handleEmailSubmit} className="tea-mind-email-form" noValidate>
                <label htmlFor="tea-mind-email">
                  {t("Email", "電郵")}
                  <input
                    id="tea-mind-email"
                    type="email"
                    value={email}
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(emailError)}
                    aria-describedby={emailError ? "tea-mind-email-error" : undefined}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (emailError) setEmailError("");
                    }}
                  />
                </label>
                {emailError && (
                  <span id="tea-mind-email-error" className="tea-mind-email-error">
                    {emailError}
                  </span>
                )}
                <button type="submit" className="tea-mind-primary-action">
                  {t("Reveal my reading", "揭曉我的結果")}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </form>
            </section>
          )}

          {phase === "result" && (
            <section className={`tea-mind-result tea-mind-tone-${result.primary.key}`} aria-live="polite">
              <div className="tea-mind-result-hero">
                <span className="tea-mind-result-character" aria-hidden="true">
                  {result.primary.character}
                </span>
                <div>
                  <p className="museum-kicker">{t("Your quick read · free", "你的速讀結果 · 免費")}</p>
                  <h2>
                    {result.primary.chineseName} <small>({result.primary.pinyin})</small>
                  </h2>
                  <h3>{result.primary.englishName}</h3>
                  <p>{t(result.primary.quickRead, result.primary.quickReadZh)}</p>
                  <p className="tea-mind-tone-line">{t(result.primary.teaFeeling, result.primary.teaFeelingZh)}</p>
                </div>
              </div>

              <article className="tea-mind-quick-tea">
                <span>{t("Suited to you right now", "現在最適合你的")}</span>
                <strong>{t(result.primary.teas[0], result.primary.teasZh[0])}</strong>
              </article>

              {unlocked ? (
                <>
                  <p className="tea-mind-full-interpretation">
                    {t(result.primary.interpretation, result.primary.interpretationZh)}
                  </p>

                  {result.blended && (
                    <p className="tea-mind-blend-note">
                      {t(
                        `Your result shows a blended pattern. Your primary reading is ${result.primary.chineseName} (${result.primary.pinyin}), but ${result.secondary.chineseName} (${result.secondary.pinyin}) is also strongly present.`,
                        `你的結果呈現混合模式。主要傾向是${result.primary.chineseName}（${result.primary.pinyin}），但${result.secondary.chineseName}（${result.secondary.pinyin}）的特質也同樣明顯。`
                      )}
                    </p>
                  )}

                  <div className="tea-mind-result-grid">
                    <article>
                      <span>{t("Current State", "目前狀態")}</span>
                      <p>{t(result.primary.currentState, result.primary.currentStateZh)}</p>
                    </article>
                    <article>
                      <span>{t("Core Need", "核心需求")}</span>
                      <p>{t(result.primary.need, result.primary.needZh)}</p>
                    </article>
                    <article>
                      <span>{t("Secondary Personality", "次要傾向")}</span>
                      <p>{formatProfileName(result.secondary)}</p>
                    </article>
                  </div>

                  <div className="tea-mind-detail-grid">
                    <article>
                      <h4>{t("Strengths", "優勢")}</h4>
                      <ul>
                        {(language === "zh" ? result.primary.strengthsZh : result.primary.strengths).map(
                          (strength) => (
                            <li key={strength}>{strength}</li>
                          )
                        )}
                      </ul>
                    </article>
                    <article>
                      <h4>{t("Watch-Out Points", "注意事項")}</h4>
                      <ul>
                        {(language === "zh" ? result.primary.watchOutsZh : result.primary.watchOuts).map(
                          (watchOut) => (
                            <li key={watchOut}>{watchOut}</li>
                          )
                        )}
                      </ul>
                    </article>
                    <article>
                      <h4>{t("Recommended Teas", "建議茶款")}</h4>
                      <ul>
                        {(language === "zh" ? result.primary.teasZh : result.primary.teas).map((tea) => (
                          <li key={tea}>{tea}</li>
                        ))}
                      </ul>
                    </article>
                    <article>
                      <h4>{t(result.primary.ritualName, result.primary.ritualNameZh)}</h4>
                      <ol>
                        {(language === "zh" ? result.primary.ritualStepsZh : result.primary.ritualSteps).map(
                          (step) => (
                            <li key={step}>{step}</li>
                          )
                        )}
                      </ol>
                    </article>
                  </div>

                  <article className="tea-mind-score-panel">
                    <h4>{t("Score Distribution", "分數分布")}</h4>
                    <div className="tea-mind-score-list">
                      {resultOrder.map((key) => {
                        const profile = resultProfiles[key];
                        const score = result.scores[key];

                        return (
                          <div key={key} className="tea-mind-score-row">
                            <span>
                              {profile.character} {profile.chineseName}
                            </span>
                            <div className="tea-mind-score-track" aria-hidden="true">
                              <span style={{ width: `${(score / (questions.length * 2)) * 100}%` }} />
                            </div>
                            <strong>{score}</strong>
                          </div>
                        );
                      })}
                    </div>
                  </article>
                </>
              ) : (
                <div className="tea-mind-locked" aria-label="Full Tea-Mind report, locked">
                  <div className="tea-mind-locked-preview" aria-hidden="true">
                    <p>{t("Your full Tea-Mind report", "你的完整茶心報告")}</p>
                    <div className="tea-mind-locked-grid">
                      <span>{t("Strengths", "優勢")}</span>
                      <span>{t("Watch-out points", "注意事項")}</span>
                      <span>{t(result.primary.ritualName, result.primary.ritualNameZh)}</span>
                      <span>{t("Score breakdown", "分數分布")}</span>
                    </div>
                  </div>
                  <div className="tea-mind-locked-overlay">
                    <Lock size={20} aria-hidden="true" />
                    <p>
                      {t(
                        `Unlock your full report, strengths, ${result.primary.ritualName.toLowerCase()}, and a starter tea matched to tonight.`,
                        `解鎖你的完整報告、優勢、${result.primary.ritualNameZh}，以及一款配合今晚的入門茶。`
                      )}
                    </p>
                    <span>{t("A$25 · includes First Pack tea", "A$25 · 含初次體驗包茶葉")}</span>
                    <a href={unlockHref} className="tea-mind-unlock-button">
                      {t("Unlock my report", "解鎖我的報告")}
                    </a>
                  </div>
                </div>
              )}

              <div className="tea-mind-product-panel">
                <div>
                  <span>{t("Recommended Chazen Product", "建議 Chazen 產品")}</span>
                  <strong>{t(result.primary.product, result.primary.productZh)}</strong>
                  <p>
                    {t(
                      "Based on your Tea-Mind result, this tea box may support your current rhythm.",
                      "根據你的茶心測試結果，這款茶盒或許能支持你目前的節奏。"
                    )}
                  </p>
                </div>
                <div className="tea-mind-result-actions">
                  <a href={ctaHref}>
                    {t("Explore My Recommended Tea Box", "探索我的建議茶盒")}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <button type="button" onClick={handleSaveResult}>
                    {saveState === "saved" ? <Check size={16} aria-hidden="true" /> : <Download size={16} aria-hidden="true" />}
                    {saveState === "saved" ? t("Result Saved", "結果已儲存") : t("Save My Result", "儲存我的結果")}
                  </button>
                  <button type="button" onClick={handleRestart}>
                    <RotateCcw size={16} aria-hidden="true" />
                    {t("Restart Test", "重新測試")}
                  </button>
                </div>
              </div>

              {unlocked && (
                <div className="tea-mind-membership-upsell">
                  <div>
                    <span>{t("Keep your rhythm going", "延續你的節奏")}</span>
                    <strong>{t("Chazen Membership", "Chazen 會員")}</strong>
                    <p>
                      {t(
                        "Monthly tea prompts and rituals matched to how you're doing, not just a one-off box.",
                        "每月配合你狀態的茶語與儀式提示，而不只是一次性的茶盒。"
                      )}
                    </p>
                  </div>
                  <a href={routeHref("/#membership")}>
                    {t("See membership options", "查看會員方案")}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              )}
            </section>
          )}
        </div>
      </section>

      <section className="chazen-subpage-cta">
        <div className="chazen-subpage-container">
          <div>
            <p className="chazen-subpage-eyebrow">{t("Next step", "下一步")}</p>
            {language === "zh" ? (
              <h2 lang="zh-Hant">讓茶測試成為旅程的起點</h2>
            ) : (
              <h2>Let the Tea Test Be Where Your Journey Begins</h2>
            )}
            <p>
              {t(
                "Start with your current state, then continue into ritual and the box that fits your rhythm.",
                "從你目前的狀態開始，再延續到儀式與符合你節奏的茶盒。"
              )}
            </p>
          </div>
          <div className="chazen-subpage-actions">
            <a href={routeHref("/tea-test")} className="chazen-subpage-button chazen-subpage-button-primary">
              {t("Start My Tea Test", "開始我的茶心測試")} <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href={routeHref("/tea-ritual")} className="chazen-subpage-button">
              {t("Explore Tea Ritual", "探索茶儀式")}
            </a>
            <a href={routeHref("/tea-boxes")} className="chazen-subpage-button">
              {t("Tea Boxes", "茶盒")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
