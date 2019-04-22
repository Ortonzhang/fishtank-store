import Cookies from "js-cookie";

const TokenKey = "X-token";

const IDKey = "X-ui";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export const setUid = uid => Cookies.set(IDKey, uid);

export const getUid = () => Cookies.get(IDKey);

export function removeToken() {
  return Cookies.remove(TokenKey);
}
