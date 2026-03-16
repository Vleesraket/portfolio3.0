import './button.css';
import langs from '../../../lang.json';

type LangKey = keyof typeof langs.languages;

function lang_button(lang: LangKey, toggleLang: () => void) {
    const langIcon: Record<LangKey, { src: string; alt: string }> = {
        en: {
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/960px-Flag_of_the_United_Kingdom_%283-5%29.svg.png',
            alt: 'English',
        },
        nl: {
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/960px-Flag_of_the_Netherlands.svg.png?_=20100406171959',
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