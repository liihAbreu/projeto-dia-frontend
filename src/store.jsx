import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import userReducer from "./slices/userSlice"
import clientReducer from "./slices/clientSlice"
import serviceReducer from './slices/servClientSlice'
import historicReducer from './slices/historicSlice'

export const Store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        client: clientReducer,
        service: serviceReducer,
        historic: historicReducer,
    },
})