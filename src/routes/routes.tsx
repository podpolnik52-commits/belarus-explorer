import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sparkles, Share2, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLACES, REGIONS, LEISURES, type Region, type LeisureType } from "@/data/places";

interface RoutesSearch { region?: string; leisure?: string }

export const Route = createFileRoute("/routes")({
  component: TripBuilder,
  validateSearch: (s: Record<string, unknown>): RoutesSearch => ({
    region: typeof s.region === "string" ? s.region : undefined,
    leisure: typeof s.leisure === "string" ? s.leisure : undefined,
  }),
  head: () => ({ meta: [{ title: "Конструктор поездки — Беларусь.Travel" }] }),
});

function TripBuilder() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const region = (search.region as Region | undefined);
  const leisure = (search.leisure as LeisureType | undefined);
  const [copied, setCopied] = useState(false);

  const itinerary = useMemo(() => {
    if (!region) return [];
    let list = PLACES.filter(p => p.region === region);
    if (leisure) {
      const matched = list.filter(p => p.leisure === leisure);
      if (matched.length) list = matched;
    }
    return list.slice(0, 4);
  }, [region, leisure]);

  const share = async () => {
    const url = window.location.href;
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-sm">
          <Sparkles className="h-4 w-4 text-primary" /> Конструктор поездки
        </div>
        <h1 className="font-display text-4xl sm:text-5xl mt-4">Соберём ваш идеальный день</h1>
        <p className="text-muted-foreground mt-3">Выберите область и стиль отдыха — мы предложим маршрут.</p>
      </div>

      <div className="mt-10 rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground mb-3">1. Область</p>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map(r => (
              <button key={r} onClick={() => navigate({ search: { ...search, region: r } })}
                className={`px-4 py-2 rounded-full text-sm border transition ${region === r ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}>{r}</button>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase text-muted-foreground mb-3">2. Тип отдыха</p>
          <div className="flex flex-wrap gap-2">
            {LEISURES.map(l => (
              <button key={l} onClick={() => navigate({ search: { ...search, leisure: l } })}
                className={`px-4 py-2 rounded-full text-sm border transition ${leisure === l ? "bg-accent text-accent-foreground border-accent" : "border-border hover:border-accent/40"}`}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      {region && itinerary.length > 0 && (
        <div className="mt-10 rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.55_0.12_180)] text-primary-foreground p-8 sm:p-10">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm opacity-80">Ваш идеальный день</p>
              <h2 className="font-display text-3xl sm:text-4xl mt-1">{region} область{leisure ? ` · ${leisure}` : ""}</h2>
            </div>
            <Button onClick={share} variant="secondary" size="sm">
              {copied ? <><Check className="h-4 w-4 mr-2" /> Скопировано</> : <><Share2 className="h-4 w-4 mr-2" /> Поделиться</>}
            </Button>
          </div>

          <ol className="mt-8 space-y-3">
            {itinerary.map((p, i) => (
              <li key={p.id}>
                <Link to="/places/$id" params={{ id: p.id }}
                  className="flex items-center gap-4 bg-background/10 backdrop-blur hover:bg-background/20 rounded-2xl p-3 transition group">
                  <span className="h-12 w-12 grid place-items-center rounded-full bg-white/15 font-semibold text-lg shrink-0">{i + 1}</span>
                  <img src={p.image} alt="" className="h-16 w-20 object-cover rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{p.name}</div>
                    <div className="text-xs opacity-80 flex items-center gap-1"><MapPin className="h-3 w-3" /> {p.city}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-sm opacity-80">
            Совет: начинайте утром, между точками — 30–60 минут пути. Возьмите термос и удобную обувь.
          </p>
        </div>
      )}

      {region && itinerary.length === 0 && (
        <p className="text-center text-muted-foreground mt-10">Для этой комбинации нет мест в нашем каталоге. Попробуйте другой тип отдыха.</p>
      )}

      {!region && (
        <p className="text-center text-muted-foreground mt-10">Выберите область, чтобы увидеть маршрут.</p>
      )}
    </section>
  );
}
