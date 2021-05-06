import Cookies from "js-cookie";

const token = "tokenAdmin";
const username = "username";
// token
export function setToken(params){ Cookies.set(token, params.token); }
export function getToken(){ return Cookies.get(token); }
export function removeToken(){ Cookies.removeToken(token); }
// 用户名
export function setUsername(params){ Cookies.set(username, params.value); }
export function getUsername(){ return Cookies.get(username); }
export function removetUsername(){ Cookies.revmoe(username); }