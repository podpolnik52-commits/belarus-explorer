import { Link } from "@tanstack/react-router";
import { Star, MapPin, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Place } from "@/data/places";
import { useFavorites } from "@/lib/favorites";

export function PlaceCard({ place, index = 0 }: { place: Place; index?: number }) {
  const { has, toggle } = useFavorites();
  const fav = has(place.id);
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={place.image} alt={place.name} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <button
          onClick={(e) => { e.preventDefault(); toggle(place.id); }}
          className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-background transition"
          aria-label="В избранное"
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-destructive text-destructive" : "text-foreground"}`} />
        </button>
        <Badge className="absolute top-3 left-3 bg-background/85 text-foreground hover:bg-background">{place.category}</Badge>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight">{place.name}</h3>
          <div className="flex items-center gap-1 text-sm shrink-0">
            <Star className="h-4 w-4 fill-[oklch(0.78_0.16_85)] text-[oklch(0.78_0.16_85)]" />
            {place.rating}
          </div>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <MapPin className="h-3 w-3" /> {place.city}, {place.region} обл.
        </p>
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{place.short}</p>
        <Button asChild variant="secondary" className="mt-4 w-full">
          <Link to="/places/$id" params={{ id: place.id }}>Подробнее</Link>
        </Button>
      </div>
    </motion.article>
  );
}
