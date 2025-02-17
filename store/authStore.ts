
import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', {

    state: () => ({
        token: localStorage.getItem('token') || null, // Initialize token from localStorage
        user: null, // Store user information if needed
    }),


    getters: {
        isAuthenticated: (state) => !!state.token, // Check if the user is authenticated
    },

    actions : {
        setToken(token : string) {
            this.token = token;
            localStorage.setItem('token', token); // Save token to localStorage
        },

        clearToken() {
            this.token = null;
            localStorage.removeItem('token'); // Remove token from localStorage
        },

        async logout() {

            this.clearToken(); // Clear the token
            this.user = null; // Clear user data

        },
    }
})