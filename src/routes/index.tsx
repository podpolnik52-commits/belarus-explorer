import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Landmark, Trees, Baby, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PLACES } from "@/data/places";
import { PlaceCard } from "@/components/PlaceCard";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Беларусь.Travel — открой для себя Беларусь" },
      { name: "description", content: "Путешествуй по местам, которые трогают душу: замки, озёра, древние леса." },
    ],
  }),
});

function Index() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const featured = PLACES.slice(0, 6);

  const cats = [
    { name: "Архитектура", icon: Landmark, color: "from-[oklch(0.45_0.11_150)] to-[oklch(0.55_0.12_180)]" },
    { name: "Природа", icon: Trees, color: "from-[oklch(0.55_0.14_150)] to-[oklch(0.65_0.13_180)]" },
    { name: "Отдых с детьми", icon: Baby, color: "from-[oklch(0.65_0.16_255)] to-[oklch(0.7_0.13_250)]" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Пейзаж Беларуси"
            className="w-full h-full object-cover animate-float-slow"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-20 text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-sm border border-white/20"
          >
            Путеводитель по Беларуси
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl font-semibold mt-6 leading-[1.05]"
          >
            Открой для себя <br />
            <span className="italic text-[oklch(0.85_0.12_85)]">Беларусь</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-5 text-lg sm:text-xl text-white/85 max-w-2xl mx-auto"
          >
            Путешествуй по местам, которые трогают душу.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/places", search: { q } as never }); }}
            className="mt-10 max-w-2xl mx-auto flex gap-2 bg-background/95 backdrop-blur p-2 rounded-2xl shadow-2xl"
          >
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Например: Мирский замок, Браславские озёра..."
                className="border-0 shadow-none focus-visible:ring-0 text-foreground text-base"
              />
            </div>
            <Button type="submit" size="lg" className="rounded-xl">Искать</Button>
          </motion.form>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {cats.map((c, i) => (
              <motion.button
                key={c.name}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.08 }}
                onClick={() => navigate({ to: "/places", search: { cat: c.name } as never })}
                className={`group relative overflow-hidden rounded-2xl p-5 text-left bg-gradient-to-br ${c.color} hover:scale-[1.03] transition`}
              >
                <c.icon className="h-7 w-7 mb-3" />
                <div className="font-semibold text-lg">{c.name}</div>
                <ArrowRight className="absolute top-5 right-5 h-5 w-5 opacity-60 group-hover:translate-x-1 transition" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm text-primary font-medium uppercase tracking-wider">Популярное</p>
            <h2 className="font-display text-4xl sm:text-5xl mt-2">Места, в которые влюбляются</h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/places">Все направления <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => <PlaceCard key={p.id} place={p} index={i} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.55_0.12_180)] text-primary-foreground p-10 sm:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-4xl sm:text-5xl">Построй идеальную поездку за минуту</h2>
            <p className="mt-4 text-lg opacity-90">Выбирай область и стиль отдыха — мы соберём маршрут на день.</p>
            <Button asChild size="lg" variant="secondary" className="mt-6">
              <Link to="/routes">Открыть конструктор <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
