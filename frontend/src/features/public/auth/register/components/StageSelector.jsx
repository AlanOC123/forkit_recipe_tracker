import { useRegister } from "../hooks";
import styles from "./styles.module.css";
import { cn } from "../../../../../shared/utils";
import { Button } from "../../../../../shared/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { AuthCard } from "../../components";

const StageControlButton = ({ isLeft }) => {
    const { nextStep, previousStep } = useRegister();

    return (
        <Button
        variant="outlined"
            className={cn(styles.stageControlBtn)}
            onClick={isLeft ? previousStep : nextStep}
        >
            <FontAwesomeIcon icon={isLeft ? faArrowLeft : faArrowRight} />
        </Button>
    );
};

const StageSelectorButton = ({ stageKey, index }) => {
    const {
        currStepIndex,
        stepStatus,
        setStep
    } = useRegister();

    const { isComplete, hasError } = stepStatus[stageKey];

    return (
        <Button
            className={cn(
                styles.stageSelectBtn,
                currStepIndex === index ? styles.isActive : "",
                isComplete && !hasError ? styles.success : '',
                hasError ? styles.error : ""
            )}
            onClick={() => setStep(index)}
        />
    );
};

const StageSelectorGroup = ({ children }) => {
    return (
        <div
            className={cn(
                "inline-flex flex-1 shrink-0 items-center justify-center gap-4",
                styles.stageSelectorGroup
            )}
        >
            {children}
        </div>
    );
};

export const StageSelector = ({ stepsConfig }) => {
    return (
        <AuthCard.AdditionalInputs className={cn(styles.registerStageSelector)}>
            <StageControlButton isLeft={true} />
            <StageSelectorGroup>
                {stepsConfig.map(({ id }, index) => (
                    <StageSelectorButton
                        stageKey={id}
                        key={index}
                        index={index}
                    />
                ))}
            </StageSelectorGroup>
            <StageControlButton isLeft={false} />
        </AuthCard.AdditionalInputs>
    );
};
