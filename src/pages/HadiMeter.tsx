import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, ChevronRight, Share2, Download, Facebook, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import html2canvas from "html2canvas";

// ── Question Bank ──
const ALL_QUESTIONS = [
  {
    id: 1,
    text: "আপনার চোখের সামনে প্রভাবশালী এবং সশস্ত্র একটি মহল সাধারণ ছাত্রদের ওপর হামলা করতে আসছে। সবাই পালাচ্ছে। আপনি কী করবেন?",
    options: [
      { text: "নিজের নিরাপত্তার জন্য সবার সাথে নিরাপদ স্থানে চলে যাব।", weight: 0 },
      { text: "দূর থেকে ভিডিও করে সোশ্যাল মিডিয়ায় লাইভ করব।", weight: 3 },
      { text: "পুলিশ বা প্রশাসনকে দ্রুত খবর দেওয়ার চেষ্টা করব।", weight: 6 },
      { text: "\"যা হওয়ার হবে\"— এই ভেবে যারা পালাচ্ছে তাদের একত্রিত করে বুক চিতিয়ে সামনে দাঁড়াব।", weight: 10 },
    ],
  },
  {
    id: 2,
    text: "একটি বিদেশি রাষ্ট্র নানাভাবে আপনার দেশের অভ্যন্তরীণ রাজনীতি ও অর্থনীতিতে হস্তক্ষেপ করছে এবং সাংস্কৃতিক আগ্রাসন চালাচ্ছে।",
    options: [
      { text: "এগুলো পলিটিকাল বিষয়, আমার ব্যক্তিগত জীবনে এর কোনো প্রভাব নেই।", weight: 0 },
      { text: "বন্ধুদের সাথে আড্ডায় এ নিয়ে বিরক্তি প্রকাশ করব।", weight: 3 },
      { text: "অনলাইনে এর বিরুদ্ধে জনমত গড়ে তোলার জন্য লেখালেখি করব।", weight: 6 },
      { text: "রাস্তায় নেমে যেকোনো গণ-আন্দোলনে প্রথম সারিতে থেকে এর প্রতিবাদ করব এবং বিদেশি পণ্য বয়কটের ডাক দেব।", weight: 10 },
    ],
  },
  {
    id: 3,
    text: "আপনি একটি যৌক্তিক আন্দোলনের মিছিলে আছেন। হঠাৎ করে পরিস্থিতি উত্তপ্ত হয়ে গেল এবং নেতৃত্ব দেওয়ার মতো কেউ নেই।",
    options: [
      { text: "ঝামেলা বুঝে সেখান থেকে সরে পড়ব।", weight: 0 },
      { text: "পরিচিত কাউকে খুঁজব যে নেতৃত্ব দিতে পারবে।", weight: 3 },
      { text: "সবাইকে শান্ত থাকার পরামর্শ দিয়ে পেছনের সারিতে অবস্থান নেব।", weight: 6 },
      { text: "নিজে সামনে গিয়ে মেগাফোন হাতে নেব এবং সবাইকে সুসংগঠিত করে নির্দেশ দেব।", weight: 10 },
    ],
  },
  {
    id: 4,
    text: "সোশ্যাল মিডিয়ায় একটি খবর খুব ভাইরাল হয়েছে, যা সাধারণ মানুষকে খেপিয়ে তুলছে, কিন্তু আপনার মনে হচ্ছে খবরটি ফেক বা প্রোপাগান্ডা।",
    options: [
      { text: "সবাই যা শেয়ার করছে, আমিও তা শেয়ার করব।", weight: 0 },
      { text: "চুপ থাকব, কারণ সত্যি-মিথ্যা যাচাই করার সময় নেই।", weight: 3 },
      { text: "নিজের টাইমলাইনে লিখব যে খবরটি যাচাই করা প্রয়োজন।", weight: 6 },
      { text: "নিজে ফ্যাক্ট-চেক করে সঠিক তথ্য প্রমাণসহ তুলে ধরব এবং প্রোপাগান্ডার বিরুদ্ধে শক্ত অবস্থান নেব।", weight: 10 },
    ],
  },
  {
    id: 5,
    text: "রাস্তায় একজন অজ্ঞাত মানুষ রক্তাক্ত অবস্থায় পড়ে আছে। তাকে হাসপাতালে নিলে আপনাকে পুলিশের জেরার মুখে পড়তে হতে পারে।",
    options: [
      { text: "এড়িয়ে যাব, নিজের বিপদে পড়ার দরকার নেই।", weight: 0 },
      { text: "অন্য কাউকে সাহায্য করার জন্য ডেকে নিজে চলে যাব।", weight: 3 },
      { text: "ইমার্জেন্সি নাম্বারে কল করে অ্যাম্বুলেন্স ডাকব।", weight: 6 },
      { text: "পুলিশের জেরার পরোয়া না করে নিজে তাকে কাঁধে করে দ্রুত হাসপাতালে নিয়ে যাব।", weight: 10 },
    ],
  },
  {
    id: 6,
    text: "আপনি অন্যায়ের প্রতিবাদ করে একটি পোস্ট দিয়েছেন। এরপর আপনার কাছে একটি বেনামি হুমকি আসলো পোস্ট মুছে ফেলার জন্য।",
    options: [
      { text: "ভয় পেয়ে সাথে সাথে পোস্ট মুছে ফেলব।", weight: 0 },
      { text: "পোস্ট অনলি মি (Only Me) করে দেব।", weight: 3 },
      { text: "থানায় গিয়ে সাধারণ ডায়েরি (GD) করব।", weight: 6 },
      { text: "হুমকির স্ক্রিনশট দিয়ে আরও কড়া ভাষায় আরেকটি পোস্ট দেব এবং বলব \"গুলির মুখে কথা কবো\"।", weight: 10 },
    ],
  },
  {
    id: 7,
    text: "আপনাকে একটি লোভনীয় চাকরি বা স্কলারশিপের অফার দেওয়া হলো, কিন্তু শর্ত হলো আপনাকে আপনার বর্তমান প্রতিবাদী রাজনৈতিক আদর্শ থেকে সরে আসতে হবে।",
    options: [
      { text: "ক্যারিয়ার সবার আগে, তাই শর্ত মেনে নেব।", weight: 0 },
      { text: "শর্ত মানব, তবে ভেতরে ভেতরে নিজের আদর্শ লালন করব।", weight: 3 },
      { text: "অফারটি ভদ্রভাবে প্রত্যাখ্যান করব।", weight: 6 },
      { text: "তাদের মুখের ওপর অফারটি ছুড়ে মারব এবং এই শর্ত দেওয়ার স্পর্ধা নিয়ে প্রশ্ন তুলব।", weight: 10 },
    ],
  },
  {
    id: 8,
    text: "আপনার একজন সহযোদ্ধাকে প্রশাসন অন্যায়ভাবে তুলে নিয়ে যাচ্ছে।",
    options: [
      { text: "নিজের নাম যেন না আসে তাই লুকিয়ে থাকব।", weight: 0 },
      { text: "আইনজীবীর সাথে পরামর্শ করে আইনি পথে লড়ার চেষ্টা করব।", weight: 3 },
      { text: "সোশ্যাল মিডিয়ায় হ্যাশট্যাগ ট্রেন্ড শুরু করব।", weight: 6 },
      { text: "নিজে গিয়ে তাদের গাড়ির সামনে পথ আটকে দাঁড়াব, \"ওকে নিলে আমাকেও নিতে হবে\"।", weight: 10 },
    ],
  },
  {
    id: 9,
    text: "আপনার কাছে দেশের বাইরে সেটেল হওয়ার সুযোগ এসেছে। এদিকে দেশে একটি বড় গণঅভ্যুত্থান চলছে।",
    options: [
      { text: "দেশ নিয়ে ভেবে লাভ নেই, নিজের ভবিষ্যৎ গড়তে চলে যাব।", weight: 0 },
      { text: "বাইরে গিয়ে রেমিট্যান্স পাঠিয়ে দেশের উপকার করব।", weight: 3 },
      { text: "বাইরে গিয়ে আন্তর্জাতিক মিডিয়াতে দেশের পক্ষে কথা বলব।", weight: 6 },
      { text: "সব সুযোগ বাতিল করে দেশের এই গুরুত্বপূর্ণ সময়ে রাজপথে থেকে লড়াই করব।", weight: 10 },
    ],
  },
  {
    id: 10,
    text: "আপনার সামনে বন্দুক তাক করা আছে। আপনাকে বলা হলো, \"একটি শব্দ উচ্চারণ করলে গুলি করা হবে। শুধু মাথা নিচু করে চলে যাও।\"",
    options: [
      { text: "প্রাণের ভয়ে মাথা নিচু করে চলে যাব।", weight: 0 },
      { text: "চুপ করে চলে যাব, তবে পরে সুযোগ বুঝে বদলা নেব।", weight: 3 },
      { text: "তর্ক না করে কৌশলে স্থান ত্যাগ করব।", weight: 6 },
      { text: "চোখের দিকে তাকিয়ে স্পষ্ট স্বরে বলব, \"গুলি কর, তবু মাথা নোয়াবো না।\"", weight: 10 },
    ],
  },
];

const RESULT_TIERS = [
  {
    min: 0, max: 39,
    label: "সতর্ক যাত্রী",
    message: "আপনাকে আরও সাহসী হতে হবে। হাদি ভাইয়ের আদর্শ বুঝতে হলে নিজের ভয়ের দেয়াল ভাঙুন।",
    color: "hsl(0 60% 50%)",
    bg: "hsl(0 40% 96%)",
  },
  {
    min: 40, max: 69,
    label: "সচেতন পর্যবেক্ষক",
    message: "আপনি সচেতন, কিন্তু নিরাপদ দূরত্বে থাকতে পছন্দ করেন। আদর্শের পথে আরও এক ধাপ এগিয়ে আসুন।",
    color: "hsl(42 85% 55%)",
    bg: "hsl(42 60% 96%)",
  },
  {
    min: 70, max: 89,
    label: "ইনকিলাবি যোদ্ধা",
    message: "আপনার ভেতরে ইনকিলাবি সত্তা প্রবল! আপনি অন্যায়ের বিরুদ্ধে লড়তে জানেন।",
    color: "hsl(162 100% 21%)",
    bg: "hsl(162 40% 96%)",
  },
  {
    min: 90, max: 100,
    label: "আমিই হাদি",
    message: "অভিনন্দন! আপনার চিন্তা, সাহস এবং আপসহীন মানসিকতা শহীদ ওসমান হাদির আদর্শের এক নিখুঁত প্রতিচ্ছবি। আপনি আসলেই বুক চিতিয়ে বলতে পারেন— 'আমিই হাদি'।",
    color: "hsl(42 90% 45%)",
    bg: "hsl(42 50% 96%)",
  },
];

const PENALTY_TIME = 20; // seconds
const PENALTY_PERCENT = 0.10;
const TOTAL_TIME = 300; // 5 minutes

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = "intro" | "quiz" | "result";

const HadiMeter = () => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState(ALL_QUESTIONS);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [questionTimer, setQuestionTimer] = useState(0);
  const [globalTimer, setGlobalTimer] = useState(TOTAL_TIME);
  const [showingFeedback, setShowingFeedback] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const questionStartRef = useRef(0);

  // Start quiz
  const startQuiz = useCallback(() => {
    setQuestions(shuffleArray(ALL_QUESTIONS));
    setCurrentQ(0);
    setSelectedAnswer(null);
    setScores([]);
    setGlobalTimer(TOTAL_TIME);
    setQuestionTimer(0);
    questionStartRef.current = Date.now();
    setPhase("quiz");
  }, []);

  // Global timer
  useEffect(() => {
    if (phase !== "quiz") return;
    const iv = setInterval(() => {
      setGlobalTimer((t) => {
        if (t <= 1) {
          // time up — auto-finish
          clearInterval(iv);
          setPhase("result");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [phase]);

  // Per-question timer
  useEffect(() => {
    if (phase !== "quiz" || showingFeedback) return;
    questionStartRef.current = Date.now();
    setQuestionTimer(0);
    const iv = setInterval(() => {
      setQuestionTimer(Math.floor((Date.now() - questionStartRef.current) / 1000));
    }, 200);
    return () => clearInterval(iv);
  }, [currentQ, phase, showingFeedback]);

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setShowingFeedback(true);

    const elapsed = Math.floor((Date.now() - questionStartRef.current) / 1000);
    let rawScore = questions[currentQ].options[idx].weight;
    if (elapsed > PENALTY_TIME) {
      rawScore = rawScore * (1 - PENALTY_PERCENT);
    }
    setScores((prev) => [...prev, rawScore]);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
        setSelectedAnswer(null);
        setShowingFeedback(false);
      } else {
        setPhase("result");
      }
    }, 1200);
  };

  // Result calculation
  const totalScore = scores.reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 10;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const tier = RESULT_TIERS.find((t) => percentage >= t.min && percentage <= t.max) || RESULT_TIERS[0];

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const downloadResult = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current, {
      backgroundColor: "#fafaf7",
      scale: 2,
    });
    const link = document.createElement("a");
    link.download = "hadi-meter-result.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      `আমি The Hadi Meter-এ ${percentage}% স্কোর পেয়েছি! আমার ক্যাটাগরি: "${tier.label}" 🔥 তোমার ঔকাত কতটুকু? পরীক্ষা দাও এখনই!`
    );
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, "_blank");
  };

  const currentQuestion = questions[currentQ];
  const isPenalty = questionTimer > PENALTY_TIME;

  return (
    <div className="min-h-screen bg-background">
      {/* ── INTRO ── */}
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center section-padding text-center"
          >
            <Link
              to="/"
              className="absolute top-6 left-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} /> ফিরে যান
            </Link>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <div className="w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl"
                style={{ background: "hsl(var(--pathshala-green) / 0.1)" }}>
                ⚖️
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mb-4">
                <span className="bengali-text">The Hadi Meter</span>
              </h1>
              <p className="bengali-text text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                তোমার ঔকাত কতটুকু? <br />
                <span className="text-sm">শহীদ ওসমান হাদির আদর্শে তুমি কতটুকু অবিচল — ৫ মিনিটে জেনে নাও।</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground bengali-text mb-6">
                <span className="px-3 py-1.5 rounded-lg bg-muted">🕐 ৫ মিনিট</span>
                <span className="px-3 py-1.5 rounded-lg bg-muted">📝 ১০টি প্রশ্ন</span>
                <span className="px-3 py-1.5 rounded-lg bg-muted">⚡ দ্রুত সিদ্ধান্ত = বেশি নম্বর</span>
              </div>

              <Button
                onClick={startQuiz}
                size="lg"
                className="text-base font-bold px-10 py-6 rounded-xl bengali-text active:scale-[0.97] transition-transform"
                style={{
                  background: "hsl(var(--pathshala-green))",
                  color: "hsl(var(--pathshala-cream))",
                }}
              >
                পরীক্ষা শুরু করো
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* ── QUIZ ── */}
        {phase === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col section-padding py-6"
          >
            {/* Top bar */}
            <div className="max-w-2xl mx-auto w-full mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-mono text-muted-foreground tabular-nums">
                  {currentQ + 1}/{questions.length}
                </span>
                <div className="flex items-center gap-2">
                  <Clock size={14} className={isPenalty ? "text-destructive" : "text-muted-foreground"} />
                  <span className={`text-sm font-mono tabular-nums ${isPenalty ? "text-destructive font-bold" : "text-muted-foreground"}`}>
                    {questionTimer}s
                    {isPenalty && " ⚠️"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-muted-foreground" />
                  <span className={`text-sm font-mono tabular-nums ${globalTimer < 60 ? "text-destructive font-bold" : "text-muted-foreground"}`}>
                    {formatTime(globalTimer)}
                  </span>
                </div>
              </div>
              <Progress value={((currentQ + 1) / questions.length) * 100} className="h-2" />
            </div>

            {/* Question */}
            <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQ}
                  initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -24, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="bengali-text text-lg md:text-xl font-semibold text-foreground leading-relaxed mb-8">
                    {currentQuestion.text}
                  </p>

                  <div className="space-y-3">
                    {currentQuestion.options.map((opt, idx) => {
                      const isSelected = selectedAnswer === idx;
                      const optionLabel = String.fromCharCode(2453 + idx); // ক, খ, গ, ঘ
                      return (
                        <motion.button
                          key={idx}
                          onClick={() => handleAnswer(idx)}
                          disabled={selectedAnswer !== null}
                          whileTap={{ scale: 0.97 }}
                          className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 bengali-text ${
                            isSelected
                              ? "border-foreground bg-foreground/5 shadow-md"
                              : "border-border hover:border-foreground/30 hover:bg-muted/50"
                          } ${selectedAnswer !== null && !isSelected ? "opacity-50" : ""}`}
                        >
                          <div className="flex items-start gap-3">
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                              isSelected
                                ? "bg-foreground text-background"
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-sm md:text-base leading-relaxed">{opt.text}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {isPenalty && !showingFeedback && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bengali-text text-xs text-destructive mt-4 text-center"
                    >
                      ⚠️ ২০ সেকেন্ডের বেশি সময় নিচ্ছেন — ১০% নম্বর কাটা যাবে!
                    </motion.p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ── RESULT ── */}
        {phase === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex flex-col items-center justify-center section-padding py-12"
          >
            {/* Shareable result card */}
            <div
              ref={resultRef}
              className="max-w-md w-full rounded-2xl p-8 md:p-10 text-center"
              style={{
                background: tier.bg,
                border: `2px solid ${tier.color}30`,
              }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: tier.color }}>
                The Hadi Meter — Result
              </p>

              {/* Score circle */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{
                  background: `conic-gradient(${tier.color} ${percentage * 3.6}deg, hsl(var(--muted)) ${percentage * 3.6}deg)`,
                }}
              >
                <div className="w-[104px] h-[104px] rounded-full flex flex-col items-center justify-center"
                  style={{ background: tier.bg }}>
                  <span className="text-3xl font-bold" style={{ color: tier.color }}>
                    {percentage}%
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h2 className="bengali-text text-2xl font-bold mb-3" style={{ color: tier.color }}>
                  {tier.label}
                </h2>
                <p className="bengali-text text-sm leading-relaxed text-foreground/80">
                  {tier.message}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {totalScore.toFixed(1)} / {maxScore} নম্বর
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">GURU'sphere Lab</p>
              </motion.div>
            </div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              <Button
                onClick={downloadResult}
                variant="outline"
                className="gap-2 rounded-xl active:scale-[0.97]"
              >
                <Download size={16} /> ডাউনলোড
              </Button>
              <Button
                onClick={shareToFacebook}
                className="gap-2 rounded-xl active:scale-[0.97]"
                style={{
                  background: "#1877F2",
                  color: "#fff",
                }}
              >
                <Facebook size={16} /> Facebook-এ শেয়ার
              </Button>
              <Button
                onClick={() => { setPhase("intro"); setScores([]); }}
                variant="ghost"
                className="gap-2 rounded-xl active:scale-[0.97]"
              >
                <RotateCcw size={16} /> আবার দাও
              </Button>
            </motion.div>

            <Link
              to="/"
              className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={14} /> হোম পেজে ফিরে যান
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HadiMeter;
