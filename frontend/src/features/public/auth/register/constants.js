import { getEndpoints } from '../constants';

const REGISTRATION_STEPS = [
    {
        id: "personalSection",
        header: "Personal Information",
        fields: ["fName", "lName"],
    },
    {
        id: "emailSection",
        header: "Email Confirmation",
        fields: ["email", "confEmail"],
    },
    {
        id: "passwordSection",
        header: "Password Confirmation",
        fields: ["password", "confPassword"],
    },
    {
        id: "allergySection",
        header: "Any Allergies?",
        fields: ['allergies']
    }
];

const CURR_STEP_COUNT = REGISTRATION_STEPS.length;
const { REGISTER: REGISTER_ENDPOINT, REGISTRATION_OPTIONS: OPTIONS_ENDPOINT } = getEndpoints();

export const VALIDATION_RULES = {
    fName: (val) => val?.length > 2,
    lName: (val) => val?.length > 2,
    email: (val) => val?.includes("@") && val?.length > 3,
    confEmail: (val, allValues) => val === allValues.email && val?.length > 0,
    password: (val) => val?.length >= 8,
    confPassword: (val, allValues) =>
        val === allValues.password && val?.length > 0,
    allergies: () => true,
};

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

const SEVERITY_MAPPINGS = {
    1: "mild",
    2: "moderate",
    3: "severe",
    4: "anaphylaxis",
};

export const getRegistrationSteps = () => [...REGISTRATION_STEPS];
export const getStepConfig = (configKey) => ({
    ...REGISTRATION_STEPS.find(({ id }) => id === configKey),
});
export const getCurrStepCount = () => CURR_STEP_COUNT;
export const getValidationRules = () => ({ ...VALIDATION_RULES });
export const getOptionsEndpoint = () => OPTIONS_ENDPOINT;
export const getFieldConfig = () => ({ ...FIELD_CONFIG });
export const getSeverityMappings = () => ({ ...SEVERITY_MAPPINGS });