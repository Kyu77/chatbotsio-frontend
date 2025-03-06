import { defineStore } from 'pinia'
export const useUserStore = defineStore('userStore', {
    state: () => ({
        thumbnail : localStorage.getItem('thumbnail') || '',
        username: localStorage.getItem('username') || '',
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