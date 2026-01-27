import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem('user');

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: !!user,
    }, 
    reducers: {
        login: (state) => {
            state.isLoggedIn = true,
            localStorage.setItem('user', 'loggedin');
        },
        logout: (state) => {
            state.isLoggedIn = false,
            localStorage.removeItem('user');
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;