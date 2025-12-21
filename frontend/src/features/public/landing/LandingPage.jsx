import { HeroSection, FeaturesGridSection } from './components';
import { GridContainer } from '../../../shared/components';
import styles from './LandingPage.module.css';
import { LandingPageContext } from '../../../shared/context';

export const LandingPage = () => {
    return (
        <LandingPageContext.Provider>
            <GridContainer className={styles.landingPage}>
                <HeroSection />
                <FeaturesGridSection />
            </GridContainer>
        </LandingPageContext.Provider>
    );
}