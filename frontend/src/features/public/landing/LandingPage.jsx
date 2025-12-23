import { HeroSection, FeaturesGridSection } from './components';
import { GridContainer } from '../../../shared/components';
import styles from './LandingPage.module.css';
import { Provider } from './context';

export const LandingPage = () => {
    return (
        <Provider>
            <GridContainer className={styles.landingPage}>
                <HeroSection />
                <FeaturesGridSection />
            </GridContainer>
        </Provider>
    );
}