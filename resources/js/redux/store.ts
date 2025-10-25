import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Example reducer (replace with your own)
import hostOnboardingSlice from './slices/hostOnboardingSlice';

export const store = configureStore({
    reducer: {
        hostOnboarding: hostOnboardingSlice, // 👈 add more slices here
    },
});

// Types for dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for usage in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
