import {defineStore} from 'pinia'
import * as webService from '../services/web-service'
import type {Register} from '../interfaces/register'
import type {Account} from "../interfaces/account";
import {SignIn} from "../interfaces/sign-in";
import {accountFactory} from "../services/web-service/factories";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        account: null as Account | null,
        error_message: {status: '', message: ''},
        token: null as string | null,
    }),
    actions: {

        clearErrors() {
          this.error_message.message = ''
          this.error_message.status = ''
        },

        async register(displayName: string,
                       email: string,
                       password: string): Promise<boolean>{
            const data: Register = {
                display_name: displayName,
                email: email,
                password: password,
            }
            return webService.registerAccount(data).then((response) => {
                this.token = response.data.key
                return true
            }).catch(reason => {
                if(Object.keys(reason.response.data)[0] === 'email'){
                    this.error_message.status = Object.keys(reason.response.data)[0]
                    this.error_message.message = reason.response.data.email[0]
                }else{
                    this.error_message.message = reason.message
                    this.error_message.status = reason.status
                }
                return false
            })
        },

        async signIn(email: string, password: string): Promise<boolean>{
            const data: SignIn = {
                email: email,
                password: password,
            }
            return webService.signInAccount(data).then((response) => {
                this.token = response.data.key
                return true
            }).catch(reason => {
                if(reason.response.status < 500){
                    this.error_message.status = Object.keys(reason.response.data)[0]
                    this.error_message.message = Object.values(reason.response.data)[0] as string
                }else {
                    this.error_message.message = "Something went wrong. Monkey is working on it."
                }
                console.error(reason)
                return false
            })
        },

        hydrateUser(): Promise<boolean>{
            if(this.token !== null){
                return webService.getUser(this.token).then((response) => {
                    this.account = accountFactory(response.data)
                    return true
                }).catch(reason => {
                    this.error_message.message = reason.message
                    this.error_message.status = reason.status
                    console.error(reason)
                    return false
                })
            }
            return new Promise(resolve => resolve(false))
        }

    },
    persist: true,
})
