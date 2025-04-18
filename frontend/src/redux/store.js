import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"
import opportunitySlice from "./opportunitySlice"
import unitSlice from "./unitSlice"
import applicationSlice from "./applicationSlice"
// import bookmarkSlice from "./bookmarkSlice"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    auth: authSlice,
    opportunity: opportunitySlice,
    unit: unitSlice,
    application: applicationSlice,
    // bookmark: bookmarkSlice,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;