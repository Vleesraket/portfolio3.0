import "./header.css"
import { useEffect, useState } from "react";
import langs from "../../lang.json"
import { lang_button } from "./comp/langLogic.tsx";

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
            <header id="header-container" className={isScrolled ? "header-scrolled" : ""}>
                <div id="header-title-wrapper">
                    <a className="hover-fill" id="header-title" href="#top">{langs.languages[lang].header.title}</a>
                </div>
                <p id="separator"> |  </p>
                <div id="nav-bar">
                    <a className="hover-fill" href="#about">{langs.languages[lang].header.nav.about}</a>
                    <a className="hover-fill" href="#projects">{langs.languages[lang].header.nav.projects}</a>
                    <a className="hover-fill" href="#contact">{langs.languages[lang].header.nav.contact}</a>
                </div>
                <div id="lang-selector">{lang_button(lang, toggleLang)}</div>
            </header>
        </>
    )
}

export { Header, type LangKey };