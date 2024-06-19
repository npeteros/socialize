"use client";

import { Account } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const formatUser = () => {
    if (typeof window !== "undefined") {
        const user = String(window.localStorage.getItem('user'));
        let account: Account = JSON.parse(user);
        return account;
    } else {
        return undefined;
    }
}

// Define a type for the slice state
export interface InitialState {
    user: Account | undefined,
    token: string | undefined,
    status?: string,
    error?: string | null;
}

// Define the initial state using that type
const initialState: InitialState = {
    user: formatUser(),
    token: typeof window !== "undefined" ? String(window.localStorage.getItem('token')) : undefined,
    status: 'idle',
    error: null
}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<InitialState>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;

            typeof window !== "undefined" ? window.localStorage.setItem('token', String(action.payload.token)) : null;
            typeof window !== "undefined" ? window.localStorage.setItem('user', JSON.stringify(action.payload.user)) : null;
        },
        signOut: (state) => {
            state.token = undefined;
            state.user = undefined;

            typeof window !== "undefined" ? window.localStorage.removeItem('token') : null;
            typeof window !== "undefined" ? window.localStorage.removeItem('user') : null;
        }
    }
})

export const { logIn, signOut } = userReducer.actions;

export default userReducer.reducer