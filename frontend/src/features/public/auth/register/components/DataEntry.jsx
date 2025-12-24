import { useRegister } from "../hooks";
import { getStepConfig } from "../constants";
import { AuthCard } from "../../components";
import {
    Input,
    InputGroup,
    InputError,
    Button,
    Alert
} from "../../../../../shared/components";
import styles from "./styles.module.css";
import { cn } from "../../../../../shared/utils";
import { getFieldConfig } from "../constants";

const FIELD_CONFIG = getFieldConfig();

const SEVERITY_KEYS = {
    mild: styles.mildAllergy,
    moderate: styles.moderateAllergy,
    severe: styles.severeAllergy,
    anaphylaxis: styles.anaphylaxisAllergy,
};

const SEVERITY_MAP = {
    0: styles.noAllergy,
    1: styles.mildAllergy,
    2: styles.moderateAllergy,
    3: styles.severeAllergy,
    4: styles.anaphylaxisAllergy,
};

const DataEntryInputGroup = ({
    type,
    fieldKey,
    placeholder,
    isValid,
    errorMsg,
    showError,
    value,
    updateFn,
    error,
}) => {
    return (
        <InputGroup>
            <Input
                type={type}
                value={value}
                onChange={({ currentTarget }) =>
                    updateFn(fieldKey, currentTarget.value)
                }
                placeholder={placeholder}
                className={cn(
                    isValid ? "success" : errorMsg && showError ? "error" : ""
                )}
            />
            {showError && <InputError>{errorMsg}</InputError>}
        </InputGroup>
    );
};

const DataEntryAllergyGroup = ({ id, name, lvl, cycleFn }) => {
    const allergyClass = SEVERITY_MAP[lvl];

    return (
        <InputGroup>
            <Button
                className={cn(styles.allergyIncrementBtn, allergyClass)}
                onClick={() => cycleFn(id)}
            >
                {name}
            </Button>
        </InputGroup>
    );
};

const DataEntryAllergyLegendBadge = ({ label, className }) => {
    return (
        <span
            className={cn(
                "text-xs flex items-center justify-center p-2 rounded-lg",
                className
            )}
        >
            {label}
        </span>
    );
};

const DataEntryAllergyLegend = () => {
    const { severityOptions } = useRegister();

    const badges = severityOptions.map(({ value, label }, index) => {
        const className = SEVERITY_KEYS[value];
        return (
            <DataEntryAllergyLegendBadge
                key={index}
                label={label}
                className={className}
            />
        );
    });

    return (
        <div className={"flex flex-wrap items-center justify-center gap-2"}>
            {badges}
        </div>
    );
};

export const DataEntry = ({ sectionKey }) => {
    const { header, fields } = getStepConfig(sectionKey);
    const {
        inputState,
        isTouched,
        updateInputState,
        allergensList,
        selectedAllergenRecords,
        cycleAllergenSeverity,
        resErrors,
        updateResErrors
    } = useRegister();

    const isAllergySection = sectionKey === "allergySection";
    const standardStatusReductionFn = (acc, fieldKey) => {
        const config = FIELD_CONFIG[fieldKey];
        const value = inputState[fieldKey];
        const error = config.validate(value) || resErrors[fieldKey];

        acc[fieldKey] = {
            isValid: !error,
            showError: isTouched[fieldKey] && error,
            errorMsg: error,
        };

        return acc;
    };

    let inputs = null;

    if (!isAllergySection) {
        const fieldStatus = fields.reduce(standardStatusReductionFn, {});

        const standardMappingFn = (fieldKey, index) => {
            const { type, placeholder } = FIELD_CONFIG[fieldKey];
            const value = inputState[fieldKey];
            const { isValid, showError, errorMsg } = fieldStatus[fieldKey];
            const resError = resErrors[fieldKey];

            return (
                <DataEntryInputGroup
                    key={index}
                    fieldKey={fieldKey}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    isValid={isValid}
                    showError={resError ? true: showError}
                    errorMsg={resError || errorMsg}
                    updateFn={updateInputState}
                />
            );
        };

        inputs = fields.map(standardMappingFn);
    } else {
        const allergenMappingFn = ({ id, name }, index) => {
            const lvl = selectedAllergenRecords[id] || 0;
            return (
                <DataEntryAllergyGroup
                    key={index}
                    id={id}
                    name={name}
                    lvl={lvl}
                    cycleFn={cycleAllergenSeverity}
                />
            );
        };

        inputs = allergensList.map(allergenMappingFn);
    }

    return (
        <>
            <AuthCard.Header>{header}</AuthCard.Header>
            <AuthCard.Inputs
                className={cn(isAllergySection ? styles.allergenGroup : "")}
            >
                {inputs}
            </AuthCard.Inputs>
            {isAllergySection && <DataEntryAllergyLegend />}
        </>
    );
};
