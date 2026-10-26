"use client";

import { useEffect, useSyncExternalStore } from "react";
import { en } from "./dictionaries/en";
import { id } from "./dictionaries/id";

export type Lang = "id" | "en";

const dictionaries = { id, en };
const KEY = "farmlink-lang";
const EVENT = "farmlink-lang-change";

function read(): Lang {
  try {
    return localStorage.getItem(KEY) === "en" ? "en" : "id";
  } catch {
    return "id";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function setLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    // penyimpanan diblokir: bahasa tetap berlaku sampai halaman dimuat ulang
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Bahasa aktif (disimpan di browser) dan kamus teksnya. Server selalu merender Bahasa Indonesia. */
export function useLang() {
  const lang = useSyncExternalStore(subscribe, read, () => "id" as Lang);
  return { lang, t: dictionaries[lang], setLang };
}

/** Menyelaraskan atribut lang pada <html> dengan pilihan pengguna. */
export function HtmlLang() {
  const { lang } = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
