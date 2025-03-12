import { useCallback, useEffect, useState } from 'preact/hooks';
import styles from "../styles/PersonalInfo.module.css";

interface PersonalInfoProps {
    link?: string;
    icon?: string;
    alt?: string;
    info: string;
}

export function PersonalInfo({info, icon, alt, link}: PersonalInfoProps) {
    // If PersonalInfo comes with a link
    if (link) {
        return ( 
            <div className={styles.PersonalInfo}>
                <img src={icon} alt={alt|| "Icon"} />
                <a href={link} rel="noopener noreferrer" target="_blank" >{info}</a>
            </div>
        );
    }
    // If no link
    return (
        <div className={styles.PersonalInfo}>
            <img src={icon} alt={alt || "Icon"} />
            <span>{info}</span>
        </div>
    );
}

// Returns just personal info on large screens; returns a toggle button with info for small screens
export function AmiahInfoDynamic() {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1023);
    useEffect(() => {
        const isScreenSizeSmall = () => setIsSmallScreen(window.innerWidth <= 1023);
        window.addEventListener("resize", isScreenSizeSmall);
        return () => window.removeEventListener("resize", isScreenSizeSmall);
    }, [])

    if (isSmallScreen) {
        return <PersonalInfoToggle />;
    }
    return <AmiahPersonalInfo />;

}

// Used for button to toggle visibility of personal info on small screens
function useInfoToggle() {
    const [visible, setVisible] = useState(false);
    const toggleVisibility = useCallback(() => {
        setVisible((prev) => !prev)
    }, []);
    return { visible, toggleVisibility };
}

// Element containing toggle and info for small screens
function PersonalInfoToggle() {
    const {visible, toggleVisibility} = useInfoToggle();

    return (
        <div>
            {visible ? (
                <div>
                    <button onClick={toggleVisibility}><img src="/icons/up.svg" alt="▲" /></button>
                    <AmiahPersonalInfo />
                </div>
            ) : (
                <div>
                    <button onClick={toggleVisibility}><img src="/icons/down.svg" alt="▼" /></button>
                </div>
            )}
        </div>
    );
}

// My info to be displayed
function AmiahPersonalInfo() {
    return (
        // My Personal Info
        <div className="Info">
            <PersonalInfo 
                info="Minnesota, USA"
                icon="/icons/location-pointer.svg"
            />
            <PersonalInfo 
                info="AmiahR@amiah.dev"
                icon="/icons/email.svg"
                link="mailto:amiahr@amiah.dev"
            />
            <PersonalInfo 
                info="GitHub"
                icon="/icons/code.svg"
                link="https://github.com/AmiahRaine"
            />
        </div>
    );
}
