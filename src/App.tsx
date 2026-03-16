import { useState } from 'react';
import { Header } from './components/header/header.tsx'
import type { LangKey } from './components/header/header.tsx';

function App() {
  const [lang, setLang] = useState<LangKey>("en");

  const toggleLang = () => {
    setLang(lang === "en" ? "nl" : "en");
    console.log(`Language switched to: ${lang === "en" ? "nl" : "en"}`);
  };

  return (
    <>
      <Header lang={lang} toggleLang={toggleLang} />
    </>
  )
}

export { App, type LangKey };