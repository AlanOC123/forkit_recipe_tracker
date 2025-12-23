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
];

const CURR_STEP_COUNT = REGISTRATION_STEPS.length;

const INITIAL_INPUT_STATE = {
    fName: "",
    lName: "",
    email: "",
    confEmail: "",
    password: "",
    confPassword: "",
};

export const VALIDATION_RULES = {
    fName: (val) => val?.length > 2,
    lName: (val) => val?.length > 2,
    email: (val) => val?.includes("@") && val?.length > 3,
    confEmail: (val, allValues) => val === allValues.email && val?.length > 0,
    password: (val) => val?.length >= 8,
    confPassword: (val, allValues) =>
        val === allValues.password && val?.length > 0,
};

export const getRegistrationSteps = () => [...REGISTRATION_STEPS];
export const getStepConfig = (configKey) => ({
    ...REGISTRATION_STEPS.find(({ id }) => id === configKey),
});
export const getInitialInputState = () => ({ ...INITIAL_INPUT_STATE });
export const getCurrStepCount = () => CURR_STEP_COUNT;
export const getValidationRules = () => ({ ...VALIDATION_RULES });
