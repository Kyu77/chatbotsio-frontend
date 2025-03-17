import { defineStore } from 'pinia'
import {useAuthStore} from "./authStore.ts";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        // @ts-ignore
        thumbnail : localStorage.getItem('thumbnail') || useAuthStore().user.thumbnail ? import.meta.env.VITE_BASE_URL + `/${useAuthStore().user.thumbnail}` : '',
        // @ts-ignore
        username: localStorage.getItem('username') || useAuthStore().user.usrename,
    }),
    getters: {},

    actions: {
        setThumbnail (thumbnail: string) {
            localStorage.setItem("thumbnail", thumbnail)
            this.thumbnail = thumbnail
        },
        setUsername (name: string) {
            localStorage.setItem("username", name)
            this.username = name
        }
    }
})