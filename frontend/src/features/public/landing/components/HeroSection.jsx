import langinPageHero from "../assets/landingPageTwo.jpg";
import logo from "../../../../assets/logo.png";
import { GridSection, GridItem, Button } from "../../../../shared/components";
import { cn } from "../../../../shared/utils";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const HeroLogo = () => {
    return (
        <div className={cn(styles.logoContainer)}>
            <img src={logo} alt="Forkit Logo" />
        </div>
    );
};

const HeroTitleText = () => {
    return (
        <h1 className="text-xl md:text-2xl text-neutral-50 lg:text-3xl flex items-center justify-center font-bold text-center">
            LEVEL UP YOUR COOKING
        </h1>
    );
};

const HeroSubtitleText = () => {
    return (
        <h2 className="mb-12 text-lg md:text-xl lg:text-2xl font-light text-center flex items-center justify-center text-neutral-200">
            Start for free
        </h2>
    );
};

const HeroActions = () => {
    return (
        <div className={cn(styles.btnContainer)}>
            <Button variant={"primary"} className={cn(styles.loginBtn)}>
                <Link to={"/login"}>Login</Link>
            </Button>
            <Button variant={"outlined"} className={cn(styles.signUpBtn)}>
                <Link to={"/register"}>Sign Up</Link>
            </Button>
            <Button variant={"ghost"} className={cn(styles.exploreBtn)}>
                <Link to={"#features"}>Explore Features</Link>
            </Button>
        </div>
    );
};

const HeroText = () => {
    return (
        <div className={cn(styles.textContainer)}>
            <HeroTitleText />
            <HeroSubtitleText />
            <HeroActions />
        </div>
    );
};

const HeroContent = () => {
    return (
        <GridItem colSpan="full" className={cn(styles.heroTextContainer)}>
            <HeroLogo />
            <HeroText />
        </GridItem>
    );
};

const HeroImage = () => {
    return (
        <GridItem colSpan="full" className={cn(styles.heroImgContainer)}>
            <img
                className={cn("w-full h-full object-center object-cover")}
                src={langinPageHero}
            />
        </GridItem>
    );
};

export const HeroSection = () => {
    return (
        <GridSection className={cn(styles.heroSection)}>
            <HeroContent />
            <HeroImage />
        </GridSection>
    );
};
