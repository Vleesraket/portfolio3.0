import "./header.css"
import langs from "../../lang.json"
import { lang_button } from "./comp/langLogic.tsx";

type LangKey = keyof typeof langs.languages;

interface HeaderProps {
  lang: LangKey;
  toggleLang: () => void;
}

function Header({ lang, toggleLang }: HeaderProps) {
    return (
        <>
            <header>
                <h1>{langs.languages[lang].header.title}</h1>
                {lang_button(lang, toggleLang)}
            </header>
        </>
    )
}

export { Header, type LangKey };