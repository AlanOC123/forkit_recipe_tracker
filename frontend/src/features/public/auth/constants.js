import { getAuthEndpoints } from "../../../api/constants";

const STORAGE_EMAIL_KEY = "lastSubmittedEmail";
const STORAGE_FIRST_NAME_KEY = "lastSubmittedFirstName";
const STORAGE_LAST_NAME_KEY = "lastSubmittedLastName";
const AUTH_ENDPOINTS = getAuthEndpoints();

export const getStorageEmailKey = () => STORAGE_EMAIL_KEY;
export const getStorageFirstNameKey = () => STORAGE_FIRST_NAME_KEY;
export const getStorageLastNameKey = () => STORAGE_LAST_NAME_KEY;
export const getEndpoints = () => AUTH_ENDPOINTS;