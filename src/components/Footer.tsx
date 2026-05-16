import { Instagram, Facebook, Send, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl mb-2">Беларусь.Travel</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Откройте для себя страну замков, озёр и древних лесов.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="h-9 w-9 grid place-items-center rounded-full bg-background border border-border hover:text-primary transition"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="h-9 w-9 grid place-items-center rounded-full bg-background border border-border hover:text-primary transition"><Facebook className="h-4 w-4" /></a>
            <a href="#" className="h-9 w-9 grid place-items-center rounded-full bg-background border border-border hover:text-primary transition"><Send className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Контакты</h4>
          <p className="text-sm text-muted-foreground flex items-center gap-2"><Mail className="h-4 w-4" /> hello@belarus.travel</p>
          <p className="text-sm text-muted-foreground mt-1">Минск, пр. Независимости 1</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Подписка</h4>
          <p className="text-sm text-muted-foreground mb-3">Лучшие маршруты раз в неделю.</p>
          {sent ? (
            <p className="text-sm text-primary">Спасибо! Скоро напишем.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }} className="flex gap-2">
              <Input type="email" required placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button type="submit">OK</Button>
            </form>
          )}
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground py-4 border-t border-border">
        © {new Date().getFullYear()} Беларусь.Travel — путеводитель по душе.
      </div>
    </footer>
  );
}
