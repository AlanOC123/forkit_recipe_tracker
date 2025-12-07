import { Page } from "../../../../components/Page/Page";
import { Section } from '../../../../components/Section/Section';
import { HeroImage } from "../HeroImage/HeroImage";
import { Form } from "../../../../components/Form/Form";
import { Card } from "../../../../components/Card/Card";
import { cn } from "../../../../utils/classNames";
import { Logo } from "../../../../components/Logo/Logo";
import styles from './AuthPage.module.css';

function HeroSection({ src }) {
    return (
        <Section elementClass={cn(styles.heroSection)}>
            <Logo elementClass={cn(styles.authLogo)}/>
            <HeroImage src={src} />
        </Section>
    )
}

function FormSection({ headerText, children, controls, inputs }) {
    return (
        <Section elementClass={cn(styles.formSection)}>
            <Section.Header>{headerText}</Section.Header>
            <Form>
                <Card>
                    <Card.Body elementClass={styles.authCardBody}>
                        {inputs}
                    </Card.Body>
                    .<Card.Footer>{controls}</Card.Footer>
                    {children}
                </Card>
            </Form>
        </Section>
    );
}

function AuthPage({ heroSection, formSection, elementClass, ...props }) {
    return (
        <Page elementClass={cn(styles.authPage, elementClass)} {...props}>
            {heroSection}
            {formSection}
        </Page>
    )
}

AuthPage.HeroSection = HeroSection;
AuthPage.FormSection = FormSection;

export { AuthPage }