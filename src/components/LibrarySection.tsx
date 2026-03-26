import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { BookOpen, Headphones, Bookmark, Search } from "lucide-react";

const books = [
  { title: "Physics of the Impossible", author: "Michio Kaku", category: "Science", pages: 352 },
  { title: "Sapiens", author: "Yuval Harari", category: "History", pages: 443 },
  { title: "The Art of Thinking Clearly", author: "Rolf Dobelli", category: "Self-help", pages: 384 },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "Psychology", pages: 499 },
  { title: "আমার দেশ", author: "Humayun Ahmed", category: "Literature", pages: 248 },
  { title: "A Short History of Nearly Everything", author: "Bill Bryson", category: "Science", pages: 544 },
];

const LibrarySection = () => {
  const [activeBook, setActiveBook] = useState(0);

  return (
    <section id="library" className="py-24 md:py-32 section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, hsl(var(--pathshala-gold) / 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase text-pathshala-gold mb-3">
              Digital Library
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
              Books that{" "}
              <span className="text-gradient-gold">breathe.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
              Every book is alive here — listen, read, annotate, and discuss.
              Your library grows with you. Infinite shelves, zero cost, zero ads.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Book list */}
          <ScrollReveal direction="left">
            <div className="space-y-3">
              {books.map((book, i) => (
                <motion.button
                  key={book.title}
                  onClick={() => setActiveBook(i)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    activeBook === i
                      ? "glass-card glow-green"
                      : "hover:bg-muted/60"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-14 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors duration-300 ${
                        activeBook === i
                          ? "bg-pathshala-green text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {book.pages}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate bengali-text">{book.title}</p>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                    <span className="ml-auto text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground shrink-0">
                      {book.category}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* Active book preview */}
          <ScrollReveal direction="right">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBook}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="feature-card min-h-[360px] flex flex-col"
              >
                <div className="flex-1">
                  <span className="text-xs font-semibold tracking-widest uppercase text-pathshala-gold">
                    {books[activeBook].category}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mt-2 bengali-text">
                    {books[activeBook].title}
                  </h3>
                  <p className="text-muted-foreground mt-1">by {books[activeBook].author}</p>

                  {/* Reading simulation */}
                  <div className="mt-6 p-4 rounded-xl bg-muted/50 space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-2.5 rounded-full bg-muted"
                        style={{ width: `${85 - i * 12}%` }}
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  {[
                    { icon: BookOpen, label: "Read" },
                    { icon: Headphones, label: "Listen" },
                    { icon: Bookmark, label: "Save" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted hover:bg-pathshala-green hover:text-primary-foreground text-sm font-medium transition-colors duration-200 active:scale-95"
                    >
                      <action.icon size={14} />
                      {action.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>
        </div>

        {/* Unique feature: Voice search */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 feature-card flex items-center gap-4 p-6">
            <div className="w-12 h-12 rounded-xl bg-pathshala-gold/20 flex items-center justify-center shrink-0">
              <Search size={20} className="text-pathshala-gold" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Search in any language</h4>
              <p className="text-sm text-muted-foreground">
                Type in বাংলা or English — find any book instantly. Our library understands you.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LibrarySection;
