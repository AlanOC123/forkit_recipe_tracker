import useRegister from "../useRegister";
import { getStepConfig } from "../constants";
import { AuthCard } from "../../components";
import {
    Input,
    InputGroup,
    InputError,
} from "../../../../../shared/components";
import { useEffect } from "react";
import styles from "./styles.module.css";
import { cn } from "../../../../../shared/utils";

const removeFieldClasses = (ref) => {
    ["error", "success"].forEach((cls) => ref.current.classList.remove(cls));
};

const inputConstructorMapping = {
    fName: {
        type: "text",
        placeholder: "First Name",
        onChange: (formFn, successFn, errorFn, ref, value) => {
            formFn("fName", ref);

            if (!value) {
                successFn("fName", false);
                errorFn("fName", "", false);
                return;
            }

            if (value.length > 2) {
                successFn("fName", true);
                errorFn("fName", "", false);
                return;
            }

            if (value.length <= 2) {
                successFn("fName", false);
                errorFn("fName", "Enter a valid first name", true);
                return;
            }
        },
    },
    lName: {
        type: "text",
        placeholder: "Last Name",
        onChange: (formFn, successFn, errorFn, ref, value) => {
            formFn("lName", ref);

            if (!value) {
                successFn("lName", false);
                errorFn("lName", "", false);
                return;
            }

            if (value.length > 2) {
                successFn("lName", true);
                errorFn("lName", "", false);
                return;
            }

            if (value.length <= 2) {
                successFn("lName", false);
                errorFn("lName", "Enter a valid last name", true);
                return;
            }
        },
    },
    email: {
        type: "email",
        placeholder: "Email",
        onChange: (formFn, successFn, errorFn, ref, value) => {
            formFn("email", ref);

            if (!value) {
                successFn("email", false);
                errorFn("email", "", false);
                return;
            }

            if (value.length > 2 && value.includes("@")) {
                successFn("email", true);
                errorFn("email", "", false);
                return;
            }

            if (!value.includes("@") && value.length > 2) {
                successFn("email", false);
                errorFn("email", "Emails must include @", true);
                return;
            }

            if (value.length > 2) {
                successFn("email", false);
                errorFn("email", "Enter your email...", true);
                return;
            }
        },
    },
    confEmail: {
        type: "email",
        placeholder: "Confirm Email",
        onChange: (formFn, successFn, errorFn, ref, value) => {
            formFn("confEmail", ref);

            if (!value) {
                successFn("confEmail", false);
                errorFn("confEmail", "", false);
                return;
            }

            if (value.length > 2 && value.includes("@")) {
                successFn("confEmail", true);
                errorFn("confEmail", "", false);
                return;
            }

            if (!value.includes("@") && value.length > 2) {
                successFn("confEmail", false);
                errorFn("confEmail", "Emails must include @", true);
                return;
            }

            if (value.length > 2) {
                successFn("confEmail", false);
                errorFn("confEmail", "Confirm your email...", true);
                return;
            }
        },
    },
    password: {
        type: "password",
        placeholder: "Password",
        onChange: (formFn, successFn, errorFn, ref, value) => {
            formFn("password", ref);

            if (!value) {
                successFn("password", false);
                errorFn("password", "", false);
                return;
            }

            if (value.length >= 8) {
                successFn("password", true);
                errorFn("password", "", false);
                return;
            }

            if (!value.length >= 8) {
                successFn("password", false);
                errorFn("password", "Passwords must be 8 characters long...", true);
                return;
            }

            if (value.length > 2) {
                successFn("password", false);
                errorFn("password", "Create a strong password...", true);
                return;
            }
        },
    },
    confPassword: {
        type: "password",
        placeholder: "Confirm Password",
        onChange: (formFn, successFn, errorFn, ref, value) => {
            formFn("confPassword", ref);

            if (!value) {
                successFn("confPassword", false);
                errorFn("confPassword", "", false);
                return;
            }

            if (value.length >= 8) {
                successFn("confPassword", true);
                errorFn("confPassword", "", false);
                return;
            }

            if (!value.length >= 8) {
                successFn("confPassword", false);
                errorFn(
                    "confPassword",
                    "Passwords must be 8 characters long...",
                    true
                );
                return;
            }

            if (value.length > 2) {
                successFn("confPassword", false);
                errorFn("confPassword", "Confirm your password...", true);
                return;
            }
        },
    },
};

const RegisterInputGroup = ({ inputKey }) => {
    const {
        inputValues,
        inputErrorMsg,
        isInputValid,
        hasInputError,
        inputRefs,
        updateInputValues,
        updateInputErrorMsg,
        updateHasInputError,
        updateIsInputValid,
    } = useRegister();

    const value = inputValues[inputKey];
    const errorMsg = inputErrorMsg[inputKey];
    const hasError = hasInputError[inputKey];
    const isComplete = isInputValid[inputKey];

    const ref = inputRefs[inputKey];

    const { type, placeholder, onChange } = inputConstructorMapping[inputKey];

    const errorFn = (inputKey, msg, hasError) => {
        updateInputErrorMsg(inputKey, msg);
        updateHasInputError(inputKey, hasError)
    };

    const successFn = (inputKey, value) => {
        updateIsInputValid(inputKey, value);
    };

    const valueFn = (inputKey, ref) => {
        updateInputValues(inputKey, ref.current.value);
    }

    return (
        <InputGroup>
            <Input
                type={type}
                value={value}
                onChange={() =>
                    onChange(valueFn, successFn, errorFn, ref, value)
                }
                placeholder={placeholder}
                ref={ref}
                className={cn(
                    isComplete && !hasError ? "success" : "",
                    hasError ? "error" : ""
                )}
            />
            {hasError && <InputError>{errorMsg}</InputError>}
        </InputGroup>
    );
};

export const DataEntry = ({ sectionKey }) => {
    const { header, fields } = getStepConfig(sectionKey);

    const { hasInputError, isInputValid, updateIsSectionComplete, updateHasSectionError, isSectionComplete } =
        useRegister();

    const dependentInputCompletion = Object.fromEntries(
        Object.entries(isInputValid).filter(([k]) => fields.includes(k))
    );

    const dependentInputErrors = Object.fromEntries(
        Object.entries(hasInputError).filter(([k]) => fields.includes(k))
    );

    useEffect(() => {
        console.log(isSectionComplete);

        const checkSectionCompletion = () => {
            if (Object.values(dependentInputCompletion).every((v) => v)) {
                updateIsSectionComplete(sectionKey, true);
                updateHasSectionError(sectionKey, false);
                return;
            }

            if (Object.values(dependentInputErrors).some((v) => v)) {
                updateIsSectionComplete(sectionKey, false);
                updateHasSectionError(sectionKey, true);
                return
            }

            updateIsSectionComplete(sectionKey, false);
            updateHasSectionError(sectionKey, false);
        }

        checkSectionCompletion();

    }, [isInputValid, hasInputError]);

    const inputs = fields.map((field, index) => (
        <RegisterInputGroup key={index} inputKey={field} />
    ));

    return (
        <>
            <AuthCard.Header>{header}</AuthCard.Header>
            <AuthCard.Inputs>{inputs}</AuthCard.Inputs>
        </>
    );
};
