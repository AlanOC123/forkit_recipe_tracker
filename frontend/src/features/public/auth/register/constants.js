const REGISTRATION_STEPS = [
    { id: 'personalSection', header: 'Personal Information', fields: ['fName', 'lName'] },
    { id: 'emailSection', header: 'Email Confirmation', fields: ['email', 'confEmail'] },
    { id: 'passwordSection', header: 'Password Confirmation', fields: ['password', 'confPassword'] },
]

export const getRegistrationSteps = () => [...REGISTRATION_STEPS]
export const getStepConfig = (configKey) => ({ ...REGISTRATION_STEPS.find(({ id }) => id === configKey ) })