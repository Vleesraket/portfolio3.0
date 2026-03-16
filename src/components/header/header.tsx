import "./header.css"
import { useEffect, useState } from "react";
import langs from "../../lang.json"
import { lang_button } from "./comp/langLogic.tsx";
import { AnimatedText } from "../shared/AnimatedText.tsx";

type LangKey = keyof typeof langs.languages;

interface HeaderProps {
  lang: LangKey;
  toggleLang: () => void;
}

function Header({ lang, toggleLang }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10);

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <div id="header-shell" className={isScrolled ? "header-shell-scrolled" : ""}>
                <header id="header-container" className={isScrolled ? "header-scrolled" : ""}>
                <div id="header-title-wrapper">
                    <a className="hover-fill" id="header-title" href="#top">
                        <AnimatedText text={langs.languages[lang].header.title} triggerKey={lang} />
                    </a>
                </div>
                <p id="separator"> |  </p>
                <div id="nav-bar">
                    <a className="hover-fill" href="#about">
                        <AnimatedText text={langs.languages[lang].header.nav.about} triggerKey={lang} />
                    </a>
                    <a className="hover-fill" href="#projects">
                        <AnimatedText text={langs.languages[lang].header.nav.projects} triggerKey={lang} />
                    </a>
                    <a className="hover-fill" href="#contact">
                        <AnimatedText text={langs.languages[lang].header.nav.contact} triggerKey={lang} />
                    </a>
                </div>
                <div id="lang-selector">{lang_button(lang, toggleLang)}</div>
                </header>
            </div>
        </>
    )
}

export { Header, type LangKey };