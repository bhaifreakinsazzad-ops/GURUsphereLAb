import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { Trophy, Award, BarChart3, FileCheck2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const leaderboard = [
  { rank: 1, name: "Rafiq Hasan", score: 2847, badge: "🥇" },
  { rank: 2, name: "Ayesha Siddiqua", score: 2631, badge: "🥈" },
  { rank: 3, name: "Nusrat Jahan", score: 2510, badge: "🥉" },
  { rank: 4, name: "Karim Uddin", score: 2398, badge: "" },
  { rank: 5, name: "Fatima Begum", score: 2245, badge: "" },
];

const ExamSection = () => {
  return (
    <section id="exams" className="py-24 md:py-32 section-padding relative">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse at 70% 40%, hsl(var(--pathshala-green) / 0.1) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase text-pathshala-gold mb-3">
              Exam Arena
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
              Prove it.{" "}
              <span className="text-gradient-green">Earn it.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
              Take exams live or anytime. Get ranked globally, earn certificates, 
              and watch yourself climb the Knowledge Tree.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <ScrollReveal direction="left">
            <div className="feature-card">
              <div className="flex items-center gap-2 mb-6">
                <Trophy size={18} className="text-pathshala-gold" />
                <h3 className="font-semibold text-foreground">Live Rankings</h3>
              </div>

              <div className="space-y-3">
                {leaderboard.map((student, i) => (
                  <motion.div
                    key={student.name}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/60 transition-colors"
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                      student.rank <= 3
                        ? "bg-pathshala-gold/20 text-pathshala-gold"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {student.badge || student.rank}
                    </span>
                    <span className="font-medium text-foreground flex-1">{student.name}</span>
                    <span className="text-sm font-mono text-muted-foreground tabular-nums">
                      {student.score.toLocaleString()}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Certificate + Features */}
          <ScrollReveal direction="right">
            <div className="space-y-4">
              {/* Certificate preview */}
              <div className="feature-card relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10"
                  style={{ background: "hsl(var(--pathshala-gold))" }}
                />
                <Award size={32} className="text-pathshala-gold mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Digital Certificates</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Every milestone earns you a verified certificate. Share on social media, 
                  add to your portfolio — proof of your dedication, recognized everywhere.
                </p>
                <div className="mt-4 px-4 py-3 rounded-xl border-2 border-dashed border-pathshala-gold/30 text-center">
                  <p className="bengali-text text-sm text-pathshala-gold font-medium">
                    সার্টিফিকেট — Certificate of Excellence
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="feature-card p-6">
                  <BarChart3 size={20} className="text-pathshala-emerald mb-3" />
                  <p className="font-semibold text-foreground text-sm">Progress Analytics</p>
                  <p className="text-xs text-muted-foreground mt-1">Track every step</p>
                </div>
                <div className="feature-card p-6">
                  <FileCheck2 size={20} className="text-pathshala-emerald mb-3" />
                  <p className="font-semibold text-foreground text-sm">Smart Exams</p>
                  <p className="text-xs text-muted-foreground mt-1">Adaptive difficulty</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-10">
              <Link
                to="/exam-arena"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.97]"
                style={{
                  background: "hsl(var(--pathshala-gold))",
                  color: "hsl(var(--pathshala-deep))",
                }}
              >
                Enter the Arena <ChevronRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ExamSection;
