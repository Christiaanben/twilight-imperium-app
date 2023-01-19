import type {Account} from "../../interfaces/account";
import {AuthResponse} from "./interfaces";

export function accountFactory(response: AuthResponse):Account {
    return {
        token: response.token,
        email: response.email,
        displayName: response.display_name
    }
}