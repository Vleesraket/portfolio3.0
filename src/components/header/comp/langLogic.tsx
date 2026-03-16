import './button.css';
import langs from '../../../lang.json';

type LangKey = keyof typeof langs.languages;

function lang_button(lang: LangKey, toggleLang: () => void) {
    const langIcon: Record<LangKey, { src: string; alt: string }> = {
        en: {
            src: 'https://flagcdn.com/w20/gb.png',
            alt: 'English',
        },
        nl: {
            src: 'https://flagcdn.com/w20/nl.png',
            alt: 'Nederlands',
        },
    };

    return (
        <button id="lang-button" onClick={toggleLang}>
            <img
                className="lang-icon"
                src={langIcon[lang].src}
                alt={langIcon[lang].alt}
            />
        </button>
    )
}

export { lang_button };