import { useRef, useState } from "react";
import Context from "./Context";
import { useAuth } from "../../../../../shared/hooks";
import {
    getRegistrationSteps,
    getInitialInputState,
    getCurrStepCount,
    getValidationRules
} from "../constants";

const Provider = ({ children }) => {
    const { submitRegisterUserRequest } = useAuth();

    const REGISTRATION_STEPS = getRegistrationSteps();
    const VALIDATION_RULES = getValidationRules();

    const MAX_STEP_COUNT = getCurrStepCount();
    const INITIAL_INPUT_STATE = getInitialInputState();

    const [currStepIndex, setCurrStepIndex] = useState(0);
    const [inputState, setInputState] = useState(INITIAL_INPUT_STATE);
    const [isTouched, setIsTouched] = useState({});

    const sectionRefs = {
        personalSection: useRef(),
        emailSection: useRef(),
        passwordSection: useRef(),
    }

    const stepStatus = REGISTRATION_STEPS.reduce((acc, step) => {
        const { fields, id } = step;

        const isComplete = fields.every(key => {
            const rule = VALIDATION_RULES[key];
            return rule ? rule(inputState[key], inputState) : true
        })

        const hasError = !isComplete && fields.some(key => isTouched[key]);

        acc[id] = { isComplete, hasError };

        return acc
    }, {});

    const canSubmit = REGISTRATION_STEPS.every(step => {
        const { id } = step;
        const { isComplete } = stepStatus[id];
        return isComplete
    })

    const updateInputState = (field, newVal) => {
        setInputState((prev) => ({ ...prev, [field]: newVal }));
        setIsTouched((prev) => ({ ...prev, [field]: true }));
    };

    const nextStep = () => {
        setCurrStepIndex((prev) => Math.min(prev + 1, MAX_STEP_COUNT - 1));
    };

    const previousStep = () => {
        setCurrStepIndex((prev) => Math.max(prev - 1, 0));
    };

    const setStep = (index) => {
        setCurrStepIndex(Math.min(MAX_STEP_COUNT - 1, Math.max(index, 0)));
    };

    const submitUserData = () => {
        console.log(values);
    };

    return (
        <Context.Provider
            value={{
                currStepIndex,
                canSubmit,
                inputState,
                isTouched,
                stepStatus,
                sectionRefs,
                canSubmit,
                updateInputState,
                nextStep,
                previousStep,
                setStep,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default Provider;
