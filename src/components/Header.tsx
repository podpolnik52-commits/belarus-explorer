import { Link } from "@tanstack/react-router";
import { Mountain } from "lucide-react";
import { ThemeToggle } from "@/lib/theme";

const links = [
  { to: "/", label: "Главная" },
  { to: "/places", label: "Направления" },
  { to: "/routes", label: "Маршруты" },
  { to: "/favorites", label: "Избранное" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center h-9 w-9 rounded-xl bg-primary text-primary-foreground shadow-sm group-hover:scale-105 transition">
            <Mountain className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-semibold">Беларусь.Travel</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary bg-secondary" }}
              className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
      <nav className="md:hidden flex items-center justify-around border-t border-border py-2">
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: l.to === "/" }}
            activeProps={{ className: "text-primary" }}
            className="text-xs font-medium text-muted-foreground"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
