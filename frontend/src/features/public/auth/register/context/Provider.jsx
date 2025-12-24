import { useRef, useState } from "react";
import Context from "./Context";
import { useAuth } from "../../../../../shared/hooks";
import { useOptions } from "../hooks";
import {
    getRegistrationSteps,
    getCurrStepCount,
    getValidationRules,
    getSeverityMappings,
} from "../constants";
import {
    getStorageFirstNameKey,
    getStorageEmailKey,
    getStorageLastNameKey,
} from "../../constants";
import { storageService } from "../../../../../api";

const SEVERITY_MAPPING = getSeverityMappings();
const REGISTRATION_STEPS = getRegistrationSteps();
const VALIDATION_RULES = getValidationRules();
const MAX_STEP_COUNT = getCurrStepCount();

const Provider = ({ children }) => {
    const { getItemFromStorage, setItemToStorage } = storageService;

    const { submitRegister } = useAuth();
    const { data: options = [], isLoading: isLoadingOptions } = useOptions();
    const { allergens: allergensList, severity_options: severityOptions } =
        options;

    const [currStepIndex, setCurrStepIndex] = useState(0);
    const [inputState, setInputState] = useState({
        fName: getItemFromStorage(getStorageFirstNameKey()) || "",
        lName: getItemFromStorage(getStorageLastNameKey()) || "",
        email: getItemFromStorage(getStorageEmailKey()) || "",
        confEmail: "",
        password: "",
        confPassword: "",
    });

    const [isTouched, setIsTouched] = useState({});
    const [selectedAllergenRecords, setSelectedAllergenRecords] = useState({});
    const [resErrors, setResErrors] = useState({
        fName: null,
        lName: null,
        email: null,
        confEmail: null,
        password: null,
        confPassword: null,
    });

    const sectionRefs = {
        personalSection: useRef(),
        emailSection: useRef(),
        passwordSection: useRef(),
        allergenSection: useRef(),
    };

    const stepStatus = REGISTRATION_STEPS.reduce((acc, step) => {
        const { fields, id } = step;
        if (id === "allergySection") {
            acc[id] = { isComplete: false, hasError: false };
            return acc;
        }

        const isComplete = fields.every((key) => {
            const rule = VALIDATION_RULES[key];
            const error = resErrors[key];

            return error
                ? false
                : rule
                ? rule(inputState[key], inputState)
                : true;
        });

        const hasError = !isComplete && fields.some((key) => isTouched[key]);

        acc[id] = { isComplete, hasError };

        return acc;
    }, {});

    const cycleAllergenSeverity = (id) => {
        setSelectedAllergenRecords((prev) => {
            const currLvl = prev[id] || 0;
            const nextLvl = (currLvl + 1) % (severityOptions.length + 1);

            if (nextLvl === 0) {
                const newState = { ...prev };
                delete newState[id];
                return newState;
            }

            return { ...prev, [id]: nextLvl };
        });
    };

    const canSubmit = REGISTRATION_STEPS.every((step) => {
        const { id } = step;
        if (id === "allergySection") return true;
        const { isComplete } = stepStatus[id];
        return isComplete;
    });

    const updateInputState = (field, newVal) => {
        setInputState((prev) => ({ ...prev, [field]: newVal }));
        setIsTouched((prev) => ({ ...prev, [field]: true }));
        setResErrors((prev) => ({ ...prev, [field]: null }));
    };

    const updateResErrors = (field, error) => {
        setResErrors((prev) => ({ ...prev, [field]: error }));
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

    const submitUserData = async () => {
        if (!canSubmit) return;
        const allergyIds = Object.entries(selectedAllergenRecords)
            .filter(([k, v]) => (v ? k : false))
            .map(([k, v]) => ({ id: k, severity: SEVERITY_MAPPING[v] }));

        const payload = {
            first_name: inputState.fName,
            last_name: inputState.lName,
            email: inputState.email,
            confirm_email: inputState.confEmail,
            password: inputState.password,
            confirm_password: inputState.confPassword,
            allergy_ids: allergyIds,
        };

        setItemToStorage(getStorageFirstNameKey(), payload.first_name);
        setItemToStorage(getStorageLastNameKey(), payload.last_name);
        setItemToStorage(getStorageEmailKey(), payload.email);

        try {
            await submitRegister(payload);
        } catch (err) {
            const { response } = err;
            const { data } = response;
            for (const [key, val] of Object.entries(data)) {
                updateResErrors(key, val)
            }
        }
    };

    return (
        <Context.Provider
            value={{
                resErrors,
                allergensList,
                currStepIndex,
                canSubmit,
                inputState,
                isTouched,
                stepStatus,
                sectionRefs,
                selectedAllergenRecords,
                severityOptions,
                updateInputState,
                cycleAllergenSeverity,
                nextStep,
                previousStep,
                setStep,
                submitUserData,
                updateResErrors
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default Provider;
