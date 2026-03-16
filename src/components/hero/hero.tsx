import "./hero.css"
import { useEffect, useState } from "react";
import langs from "../../lang.json"
import { AnimatedText } from "../shared/AnimatedText.tsx";

type LangKey = keyof typeof langs.languages;

interface HeroProps {
    lang: LangKey;
}

const AMSTERDAM_TIMEZONE = "Europe/Amsterdam";
const WORK_HOURS_START_AMSTERDAM = 8;
const WORK_HOURS_END_AMSTERDAM = 23;

const amsterdamClockFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZone: AMSTERDAM_TIMEZONE
});

const amsterdamZoneFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: AMSTERDAM_TIMEZONE,
    timeZoneName: "short"
});

const amsterdamWeekdayFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: AMSTERDAM_TIMEZONE,
    weekday: "short"
});

const amsterdamHourFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: AMSTERDAM_TIMEZONE,
    hour: "2-digit",
    hourCycle: "h23"
});

function getAmsterdamTimeZoneAbbreviation(date: Date): string {
    const part = amsterdamZoneFormatter.formatToParts(date).find((item) => item.type === "timeZoneName");

    return part?.value ?? "Amsterdam";
}

function isWorkHoursAmsterdam(date: Date): boolean {
    const weekday = amsterdamWeekdayFormatter.format(date);
    const weekdayMap: Record<string, number> = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6
    };
    const day = weekdayMap[weekday] ?? 0;
    const hour = Number.parseInt(amsterdamHourFormatter.format(date), 10);
    const isWeekday = day >= 1 && day <= 5;

    return isWeekday && hour >= WORK_HOURS_START_AMSTERDAM && hour < WORK_HOURS_END_AMSTERDAM;
}

function Hero({ lang }: HeroProps) {
    const heroContent = langs.languages[lang].hero as typeof langs.languages.en.hero & {
        activeStatus: string;
        status: string;
        nowLabel: string;
        description: string;
        primaryAction: string;
        secondaryAction: string;
    };
    const [amsterdamTime, setAmsterdamTime] = useState("");
    const [timeZoneAbbreviation, setTimeZoneAbbreviation] = useState("Amsterdam");
    const [liveStatus, setLiveStatus] = useState(() => isWorkHoursAmsterdam(new Date()) ? heroContent.activeStatus : heroContent.status);
    const isPresenceActive = liveStatus !== "Offline";

    useEffect(() => {
        const getAmsterdamClock = () => {
            const now = new Date();

            return {
                time: amsterdamClockFormatter.format(now),
                zone: getAmsterdamTimeZoneAbbreviation(now)
            };
        };

        const syncClock = () => {
            const clock = getAmsterdamClock();
            setAmsterdamTime(clock.time);
            setTimeZoneAbbreviation(clock.zone);
        };

        syncClock();

        const timer = window.setInterval(() => {
            syncClock();
        }, 1000);

        return () => window.clearInterval(timer);
    }, []);

    useEffect(() => {
        const syncStatus = () => {
            setLiveStatus(isWorkHoursAmsterdam(new Date()) ? heroContent.activeStatus : heroContent.status);
        };

        syncStatus();

        const refreshTimer = window.setInterval(() => {
            syncStatus();
        }, 60000);

        return () => window.clearInterval(refreshTimer);
    }, [heroContent.activeStatus, heroContent.status]);

    return (
        <section id="hero-container">
            <p className="hero-kicker">
                <AnimatedText text={heroContent.kicker} triggerKey={lang} />
            </p>

            <h1 className="hero-title">
                <AnimatedText text={heroContent.title} triggerKey={lang} />
            </h1>

            <div className="hero-intro-card" aria-label="Current status and primary actions">
                <p className="hero-intro-meta">
                    <span className={`hero-intro-status ${isPresenceActive ? "is-active" : ""}`}>({liveStatus})</span>
                    <span className="hero-intro-time">{heroContent.nowLabel}, {amsterdamTime} {timeZoneAbbreviation}</span>
                </p>

                <p className="hero-intro-description">{heroContent.description}</p>

                <div className="hero-intro-actions">
                    <a className="hero-intro-btn hero-intro-btn--light" href="#contact">
                        ↘ {heroContent.primaryAction}
                    </a>
                    <a className="hero-intro-btn hero-intro-btn--dark" href="#projects">
                        ↘ {heroContent.secondaryAction}
                    </a>
                </div>
            </div>
        </section>
    )
}

export { Hero };