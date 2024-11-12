import { LOCAL_STORAGE_KEYS } from "shared/constants/config";
const { TOKEN_KEY, REFRESH_TOKEN_KEY } = LOCAL_STORAGE_KEYS;

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveAccessToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function deleteAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function saveRefreshToken(token: string): void {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function deleteRefreshToken(): void {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
