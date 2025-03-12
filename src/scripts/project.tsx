import styles from "../styles/Project.module.css";

interface ProjectProps {
    name: string;
    skills: string | string[];
    description: string;
    link: string;
}

export function Project({name, skills, description, link} :ProjectProps) {
    return (
        <div className={styles.Project}>
            <div className={styles.TitleSection}>
                <a href={link} rel="noopener noreferrer" target="_blank" >
                    <span>{name}</span>
                    <img src="/icons/external-resource.svg" alt="Open External" />
                </a>
            </div>
            <div className={styles.SkillsSection}> 
                <span>{skills}</span>
            </div>
            <div className={styles.DescriptionSection}>
                <span>{description}</span>
            </div>
        </div>
    );
}