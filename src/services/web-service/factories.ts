import type {Account} from "../../interfaces/account";
import {UserResponse} from "./interfaces";

export function accountFactory(response: UserResponse):Account {
    return {
        id: response.id,
        email: response.email,
        displayName: response.display_name
    }
}
