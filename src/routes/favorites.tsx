import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLACES } from "@/data/places";
import { PlaceCard } from "@/components/PlaceCard";
import { useFavorites } from "@/lib/favorites";

export const Route = createFileRoute("/favorites")({
  component: Favorites,
  head: () => ({ meta: [{ title: "Избранное — Беларусь.Travel" }] }),
});

function Favorites() {
  const { ids } = useFavorites();
  const list = PLACES.filter(p => ids.includes(p.id));

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-7 w-7 text-destructive fill-destructive" />
        <h1 className="font-display text-4xl sm:text-5xl">Избранное</h1>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-20 bg-secondary/40 rounded-3xl">
          <p className="text-muted-foreground">Пока пусто. Сохраняйте места, которые хотели бы посетить.</p>
          <Button asChild className="mt-6"><Link to="/places">К направлениям</Link></Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p, i) => <PlaceCard key={p.id} place={p} index={i} />)}
        </div>
      )}
    </section>
  );
}
