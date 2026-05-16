import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Clock, Ticket, Heart, Star, ChevronLeft, ChevronRight, Cloud, Umbrella, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLACES } from "@/data/places";
import { useFavorites } from "@/lib/favorites";

export const Route = createFileRoute("/places/$id")({
  component: PlaceDetail,
  loader: ({ params }) => {
    const place = PLACES.find(p => p.id === params.id);
    if (!place) throw notFound();
    return place;
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="font-display text-4xl">Место не найдено</h1>
      <Button asChild className="mt-6"><Link to="/places">Все направления</Link></Button>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.name} — Беларусь.Travel` },
      { name: "description", content: loaderData.short },
      { property: "og:title", content: loaderData.name },
      { property: "og:description", content: loaderData.short },
      { property: "og:image", content: loaderData.image },
    ] : [],
  }),
});

function PlaceDetail() {
  const place = Route.useLoaderData() as (typeof PLACES)[number];
  const { has, toggle } = useFavorites();
  const fav = has(place.id);
  const [slide, setSlide] = useState(0);
  const next = () => setSlide((s) => (s + 1) % place.gallery.length);
  const prev = () => setSlide((s) => (s - 1 + place.gallery.length) % place.gallery.length);

  return (
    <article>
      <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[70vh] overflow-hidden bg-muted">
        {place.gallery.map((src, i) => (
          <img key={src} src={src} alt={`${place.name} ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === slide ? "opacity-100" : "opacity-0"}`} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Button asChild variant="secondary" size="sm" className="absolute top-4 left-4">
          <Link to="/places"><ArrowLeft className="h-4 w-4 mr-1" /> Назад</Link>
        </Button>
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-background/80 hover:bg-background"><ChevronLeft className="h-5 w-5" /></button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-background/80 hover:bg-background"><ChevronRight className="h-5 w-5" /></button>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
          {place.gallery.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className={`h-1.5 rounded-full transition-all ${i === slide ? "w-6 bg-white" : "w-1.5 bg-white/50"}`} />
          ))}
        </div>
        <div className="absolute bottom-6 left-6 right-6 text-white max-w-5xl">
          <Badge className="bg-white/20 backdrop-blur text-white border-0">{place.category}</Badge>
          <h1 className="font-display text-4xl sm:text-6xl mt-2">{place.name}</h1>
          <p className="mt-1 flex items-center gap-1 text-white/85"><MapPin className="h-4 w-4" /> {place.city}, {place.region} область</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid lg:grid-cols-[1fr,360px] gap-10">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-[oklch(0.78_0.16_85)] text-[oklch(0.78_0.16_85)]" />
              <span className="font-semibold">{place.rating}</span>
              <span className="text-muted-foreground text-sm">/ 5</span>
            </div>
            <Button onClick={() => toggle(place.id)} variant={fav ? "default" : "outline"} size="sm">
              <Heart className={`h-4 w-4 mr-2 ${fav ? "fill-current" : ""}`} />
              {fav ? "В избранном" : "Добавить в избранное"}
            </Button>
          </div>
          <h2 className="font-display text-2xl mb-3">Об этом месте</h2>
          <p className="text-muted-foreground leading-relaxed">{place.description}</p>

          <h2 className="font-display text-2xl mt-10 mb-3">На карте</h2>
          <div className="rounded-2xl overflow-hidden border border-border aspect-[16/10]">
            <iframe
              title="Карта"
              className="w-full h-full"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${place.lng - 0.05}%2C${place.lat - 0.03}%2C${place.lng + 0.05}%2C${place.lat + 0.03}&layer=mapnik&marker=${place.lat}%2C${place.lng}`}
            />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <InfoRow icon={MapPin} label="Адрес" value={place.address} />
            <InfoRow icon={Clock} label="Время работы" value={place.hours} />
            <InfoRow icon={Ticket} label="Стоимость" value={place.price} />
          </div>
          <div className="rounded-2xl border border-border bg-gradient-to-br from-[oklch(0.92_0.05_250)] to-[oklch(0.95_0.03_85)] dark:from-[oklch(0.3_0.05_250)] dark:to-[oklch(0.28_0.03_150)] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold mb-3"><Cloud className="h-4 w-4" /> Погода сейчас</div>
            <div className="flex items-end gap-3">
              <Sun className="h-12 w-12 text-[oklch(0.78_0.16_85)]" />
              <div>
                <div className="text-3xl font-semibold">+18°</div>
                <div className="text-xs text-muted-foreground">Лёгкая облачность</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground flex items-center gap-1"><Umbrella className="h-3.5 w-3.5" /> Возьмите кофту — к вечеру прохладно.</p>
          </div>
        </aside>
      </div>
    </article>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 mt-0.5 text-primary shrink-0" />
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
