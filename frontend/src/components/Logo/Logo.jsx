import logoImg from '../../assets/logo.png';
import { cn } from '../../utils/classNames';
import styles from './Logo.module.css'

export function Logo({ elementClass }) {
    const elementStyle = cn(styles.logo, elementClass);
    return (
        <div className={elementStyle}>
            <img src={logoImg} className={styles.logoImg} alt="Forkit Logo" />
        </div>
    );
}
