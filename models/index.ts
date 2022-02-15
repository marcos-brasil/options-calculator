import { configureStore } from "@reduxjs/toolkit";

import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import optionReducer from "./options";
import optionGreeksReducer from "./options-greeks";

const store = configureStore({
  reducer: {
    option: optionReducer,
    optionGreeks: optionGreeksReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

export {option as optionsSchema} from './yup-schemas'
