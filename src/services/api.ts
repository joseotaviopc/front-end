const BASE_URL = "http://localhost:3333";

export async function authLogin() {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    return await data;
}