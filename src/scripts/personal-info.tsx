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
            <a href={link} rel="noopener noreferrer" target="_blank" >
                <div className={styles.PersonalInfo}>
                    <img src={icon} alt={alt|| "Icon"} />
                    <span>{info}</span>
                </div>
            </a>
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

// Returns just personal info on large screens; returns a toggle button for the info on small screens
export function AmiahInfoDynamic() {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1023);
    const {visible, toggleVisibility} = useInfoToggle();
    useEffect(() => {
        const isScreenSizeSmall = () => setIsSmallScreen(window.innerWidth <= 1023);
        window.addEventListener("resize", isScreenSizeSmall);
        return () => window.removeEventListener("resize", isScreenSizeSmall);
    }, [])

    return (
        <aside>
            <div class={styles.ProfilePictureName}>
                <img class={styles.ProfilePicture} src="/images/profile-picture.png" alt="Amiah's Profile" />
                <div class={styles.NameTitle}>
                    <span>Amiah Raine</span>
                    <small>Computer Science, BS</small>
                </div>
                <span class={styles.Spacer} />
                {isSmallScreen && <button onClick={toggleVisibility}>
                        <img class={styles.ToggleArrow} src={visible ? "/icons/up.svg" : "/icons/down.svg"} alt={visible ? "▲" : "▼"} />
                    </button> 
                }
            </div>
            {visible && isSmallScreen && <AmiahPersonalInfo />}
            {!isSmallScreen && <AmiahPersonalInfo />}
        </aside>
    );
}

// Used for button to toggle visibility of personal info on small screens
function useInfoToggle() {
    const [visible, setVisible] = useState(false);
    const toggleVisibility = useCallback(() => {
        setVisible((prev) => !prev)
    }, []);
    return { visible, toggleVisibility };
}

// My info to be displayed
function AmiahPersonalInfo() {
    return (
        // My Personal Info
        <div className={styles.Info}>
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
