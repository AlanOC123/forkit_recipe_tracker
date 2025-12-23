import styles from './styles.module.css'
import { cn } from '../../../../shared/utils';
import { Button } from '../../../../shared/components';
import { useAuth } from '../../../../shared/hooks';


export const HeaderSection = () => {
    const { submitLogout } = useAuth();

    return (
        <header className={cn(styles.mainHeader)}>
            <Button onClick={submitLogout}>Log Out</Button>
        </header>
    );
}