import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PLACES, REGIONS, LEISURES } from "@/data/places";
import { PlaceCard } from "@/components/PlaceCard";

interface PlacesSearch { q?: string; cat?: string; region?: string; leisure?: string }

export const Route = createFileRoute("/places")({
  component: Places,
  validateSearch: (s: Record<string, unknown>): PlacesSearch => ({
    q: typeof s.q === "string" ? s.q : undefined,
    cat: typeof s.cat === "string" ? s.cat : undefined,
    region: typeof s.region === "string" ? s.region : undefined,
    leisure: typeof s.leisure === "string" ? s.leisure : undefined,
  }),
  head: () => ({ meta: [{ title: "Направления — Беларусь.Travel" }, { name: "description", content: "Каталог туристических мест Беларуси." }] }),
});

function Places() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const [region, setRegion] = useState<string | null>(search.region ?? null);
  const [leisure, setLeisure] = useState<string | null>(search.leisure ?? null);
  const cat = search.cat ?? null;

  useEffect(() => { setQ(search.q ?? ""); }, [search.q]);

  const filtered = useMemo(() => PLACES.filter(p =>
    (!q || (p.name + p.city + p.short).toLowerCase().includes(q.toLowerCase())) &&
    (!region || p.region === region) &&
    (!leisure || p.leisure === leisure) &&
    (!cat || p.category === cat)
  ), [q, region, leisure, cat]);

  return (
    <>
      <section className="bg-secondary/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <h1 className="font-display text-4xl sm:text-5xl">Направления</h1>
          <p className="text-muted-foreground mt-2">Все туристические места Беларуси в одном месте.</p>
          <div className="mt-6 flex items-center gap-2 bg-background rounded-xl border border-border px-3 py-2 max-w-xl shadow-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск по названию или городу..." className="border-0 shadow-none focus-visible:ring-0" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="space-y-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Область</p>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={!region} onClick={() => setRegion(null)}>Все</FilterChip>
              {REGIONS.map(r => (
                <FilterChip key={r} active={region === r} onClick={() => setRegion(r)}>{r}</FilterChip>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Тип отдыха</p>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={!leisure} onClick={() => setLeisure(null)}>Все</FilterChip>
              {LEISURES.map(l => (
                <FilterChip key={l} active={leisure === l} onClick={() => setLeisure(l)}>{l}</FilterChip>
              ))}
            </div>
          </div>
          {cat && <Badge variant="secondary">Категория: {cat}</Badge>}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center py-20 text-muted-foreground">Ничего не нашлось. Попробуйте сбросить фильтры.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => <PlaceCard key={p.id} place={p} index={i} />)}
          </div>
        )}
      </section>
    </>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-sm border transition ${active ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/40"}`}>
      {children}
    </button>
  );
}
