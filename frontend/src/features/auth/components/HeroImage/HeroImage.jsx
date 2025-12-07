import styles from './HeroImage.module.css';

export function HeroImage ({ src }) {
    return <div className={styles.heroImage} style={{ backgroundImage: `url(${src})` }} />
} 