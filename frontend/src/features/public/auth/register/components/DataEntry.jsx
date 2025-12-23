import useRegister from "../useRegister";
import { getStepConfig } from "../constants";
import { AuthCard } from "../../components";
import {
    Input,
    InputGroup,
    InputError,
} from "../../../../../shared/components";
import styles from "./styles.module.css";
import { cn } from "../../../../../shared/utils";

const FIELD_CONFIG = {
    fName: {
        type: "text",
        placeholder: "First Name",
        validate: (val) => (val.length > 2 ? null : "First Name Too Short"),
    },
    lName: {
        type: "text",
        placeholder: "Last Name",
        validate: (val) => (val.length > 2 ? null : "First Name Too Short"),
    },
    email: {
        type: "email",
        placeholder: "Email",
        validate: (val) =>
            val.length > 2 && val.includes("@")
                ? null
                : val.includes("@")
                ? "Enter Your Email"
                : "Email Must Include @",
    },
    confEmail: {
        type: "email",
        placeholder: "Confirm Email",
        validate: (val) =>
            val.length > 2 && val.includes("@")
                ? null
                : val.includes("@")
                ? "Enter Your Email"
                : "Email Must Include @",
    },
    password: {
        type: "password",
        placeholder: "Password",
        validate: (val) => (val.length >= 8 ? null : "Password Too Short"),
    },
    confPassword: {
        type: "password",
        placeholder: "Confirm Password",
        validate: (val) => (val.length >= 8 ? null : "Password Too Short"),
    },
};

export const DataEntry = ({ sectionKey }) => {
    const { header, fields } = getStepConfig(sectionKey);
    const {
        inputState,
        isTouched,
        updateInputState,
        updateIsSectionComplete,
        updateHasSectionErrors,
    } = useRegister();

    const fieldStatus = fields.reduce((acc, fieldKey) => {
        const config = FIELD_CONFIG[fieldKey];
        const value = inputState[fieldKey];
        const error = config.validate(value);

        acc[fieldKey] = {
            isValid: !error,
            showError: isTouched[fieldKey] && error,
            errorMsg: error,
        };

        return acc;
    }, {});

    return (
        <>
            <AuthCard.Header>{header}</AuthCard.Header>
            <AuthCard.Inputs>
                {fields.map((fieldKey, index) => {
                    const { type, placeholder } = FIELD_CONFIG[fieldKey];
                    const value = inputState[fieldKey];
                    const { isValid, showError, errorMsg } =
                        fieldStatus[fieldKey];

                    return (
                        <InputGroup>
                            <Input
                                key={index}
                                type={type}
                                value={value}
                                onChange={({ currentTarget }) =>
                                    updateInputState(
                                        fieldKey,
                                        currentTarget.value
                                    )
                                }
                                placeholder={placeholder}
                                className={cn(
                                    isValid
                                        ? 'success'
                                        : (errorMsg && showError)
                                        ? 'error'
                                        : ""
                                )}
                            />
                            {showError && <InputError>{errorMsg}</InputError>}
                        </InputGroup>
                    );
                })}
            </AuthCard.Inputs>
        </>
    );
};
