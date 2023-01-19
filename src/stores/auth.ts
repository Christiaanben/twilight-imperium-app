import {defineStore} from 'pinia'
import * as webService from '../services/web-service'
import type {Register} from '../interfaces/register'
import type {Account} from "../interfaces/account";
import {SignIn} from "../interfaces/sign-in";
import {accountFactory} from "../services/web-service/factories";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        account: null as Account | null,
    }),
    actions: {

        async register(userName: string,
                       email: string,
                       password: string) {
            const data: Register = {
                display_name: userName,
                email: email,
                password: password,
            }
            await webService.registerAccount(data).then((response) => {
                if (response.status <= 300) {
                    this.account = accountFactory(response.data)
                }
                return response
            })
        },

        async signIn(email: string, password: string) {
            const data: SignIn = {
                email: email,
                password: password,
            }
            await webService.signInAccount(data).then((response) => {
                console.log(response)
                if (response.status <= 300) {
                    this.account = accountFactory(response.data)
                }
                return response
            })
        },

    },
    persist: true,
})
