import type { CSSProperties } from "react";
import "./animatedText.css";

interface AnimatedTextProps {
    text: string;
    triggerKey: string;
    className?: string;
}

function AnimatedText({ text, triggerKey, className = "" }: AnimatedTextProps) {
    const words = text.split(" ");
    let charIndex = 0;

    return (
        <span className={`lang-text-fx ${className}`.trim()} key={`${triggerKey}-${text}`}>
            {words.map((word, wordIndex) => (
                <span className="lang-word" key={`${word}-${wordIndex}`}>
                    {[...word].map((char, i) => {
                        const index = charIndex;
                        charIndex += 1;

                        return (
                            <span
                                className="lang-char"
                                key={`${char}-${i}-${index}`}
                                style={{ "--char-index": index } as CSSProperties}
                            >
                                {char}
                            </span>
                        );
                    })}
                    {wordIndex < words.length - 1 ? <span className="lang-space"> </span> : null}
                </span>
            ))}
        </span>
    );
}

export { AnimatedText };