// ------------------------------------------
// Environment Variables
// ------------------------------------------

// APP
export const APP_BUILD = import.meta.env.VITE_APP_BUILD;
export const APP_VERSION = import.meta.env.VITE_APP_VERSION;
export const APP_COPYRIGHT = import.meta.env.VITE_APP_COPYRIGHT;

// API
export const API_KEY = import.meta.env.VITE_API_KEY;
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const UI_API_URL = BASE_URL + import.meta.env.VITE_UI_API;
export const AUTH_API_URL = BASE_URL + import.meta.env.VITE_AUTH_API;
export const USER_API_URL = BASE_URL + import.meta.env.VITE_USER_API;

// SOCKET
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

// ------------------------------------------
// Global Variable
// ------------------------------------------

// Route
export const DEFAULT_ROUTE = "/dashboard";

// SESSION
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

// ------------------------------------------
// PAths
// ------------------------------------------
export const ICON_PATH = BASE_URL + "/icons/";
