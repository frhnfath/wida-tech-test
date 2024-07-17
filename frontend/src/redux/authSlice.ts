import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: String | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.isAuthenticated = true
        },
        logoutSuccess(state) {
            state.token = null;
            state.isAuthenticated = false;
        }
    }
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;