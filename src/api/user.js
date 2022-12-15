import { setUserData } from "../utils.js";
import { post } from "./api.js";

export async function login(email, password){

    const response = await post("/users/login",{email,password});
    setUserData(response);
}

export async function register(email, password){

    const response = await post("/users/register",{email,password});
    setUserData(response);
}