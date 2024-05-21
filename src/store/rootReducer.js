
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import fileReducer from './fileSlice.js';

const rootReducer = combineReducers({
    auth: authReducer,
    file: fileReducer
});

export default rootReducer;