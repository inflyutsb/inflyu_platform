import { configureStore } from '@reduxjs/toolkit';
import listReducer from './createSlice';
export const store = configureStore({
    reducer: {
        list: listReducer,
    },
});