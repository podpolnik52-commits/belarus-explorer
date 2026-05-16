import { useEffect, useState, useCallback } from "react";

const KEY = "by-favorites";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => { setIds(read()); }, []);

  useEffect(() => {
    const onStorage = () => setIds(read());
    window.addEventListener("storage", onStorage);
    window.addEventListener("favorites-changed", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("favorites-changed", onStorage);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const cur = read();
    const next = cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("favorites-changed"));
    setIds(next);
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, has };
}
