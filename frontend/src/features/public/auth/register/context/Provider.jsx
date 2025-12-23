import { useState, useRef } from "react";
import Context from "./Context";
import { useAuth } from "../../../../../shared/hooks";
import { getRegistrationSteps } from "../constants";

const Provider = ({ children }) => {
    const { submitRegisterUserRequest } = useAuth();

    const REGISTRATION_STEPS = getRegistrationSteps();

    const [currStepIndex, setCurrStepIndex] = useState(0);
    const [canSubmit, setCanSubmit] = useState(false);

    const [inputValues, setInputValues] = useState({
        fName: "",
        lName: "",
        email: "",
        confEmail: "",
        password: "",
        confPassword: "",
    });

    const [inputErrorMsg, setInputErrorMsg] = useState({
        fName: "",
        lName: "",
        email: "",
        confEmail: "",
        password: "",
        confPassword: "",
    });

    const [hasInputError, setHasInputError] = useState({
        fName: false,
        lName: false,
        email: false,
        confEmail: false,
        password: false,
        confPassword: false,
    });


    const [isInputValid, setIsInputValid ] = useState({
        fName: false,
        lName: false,
        email: false,
        confEmail: false,
        confPassword: false
    });

    const inputRefs = {
        fName: useRef(),
        lName: useRef(),
        email: useRef(),
        confEmail: useRef(),
        password: useRef(),
        confPassword: useRef(),
    };

    const sectionRefs = {
        personalSection: useRef(),
        emailSection: useRef(),
        passwordSection: useRef(),
    };

    const [isSectionComplete, setIsSectionComplete] = useState({
        personalSection: false,
        emailSection: false,
        passwordSection: false,
    });

    const [hasSectionError, setHasSectionError] = useState({
        personalSection: false,
        emailSection: false,
        passwordSection: false,
    });

    const updateInputValues = (field, value) => {
        setInputValues((prev) => ({ ...prev, [field]: value }));
    };

    const updateInputErrorMsg = (field, value) => {
        setInputErrorMsg((prev) => ({ ...prev, [field]: value }));
    };

    const updateHasInputError = (field, value) => {
        setHasInputError((prev) => ({ ...prev, [field]: value }));
    };

    const updateIsInputValid = (field, value) => {
        setIsInputValid((prev) => ({ ...prev, [field]: value }));
    };

    const updateIsSectionComplete = (field, value) => {
        setIsSectionComplete((prev) => ({ ...prev, [field]: value }))
    }

    const updateHasSectionError = (field, value) => {
        setHasSectionError((prev) => ({ ...prev, [field]: value }))
    }

    const nextStep = () => {
        setCurrStepIndex((prev) => Math.min(prev + 1, REGISTRATION_STEPS.length - 1));
    };

    const previousStep = () => {
        setCurrStepIndex((prev) => Math.max(prev - 1, 0));
    };

    const setStep = (index) => {
        setCurrStepIndex(Math.min(REGISTRATION_STEPS.length - 1, Math.max(index, 0)));
    }

    const submitUserData = () => {
        console.log(inputValues);
    };

    return (
        <Context.Provider
            value={{
                currStepIndex,
                canSubmit,
                inputValues,
                inputErrorMsg,
                hasInputError,
                isInputValid,
                inputRefs,
                isSectionComplete,
                hasSectionError,
                sectionRefs,
                updateInputValues,
                updateInputErrorMsg,
                updateHasInputError,
                updateIsInputValid,
                updateIsSectionComplete,
                updateHasSectionError,
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
