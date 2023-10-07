import { AuthLogin, RegisterUser } from "@/@types";

const BASE_URL = "http://localhost:8081/api/v1";

async function registerUser(data: RegisterUser) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }),
  });
  return await response.json();
}

async function authLogin(data: AuthLogin) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.email,
      password: data.password,
    }),
  });
  return await response.json();
}

export const api = {
  registerUser,
  authLogin,
};
