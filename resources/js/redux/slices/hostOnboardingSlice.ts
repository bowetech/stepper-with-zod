import { Inputs } from '@/pages/onboarding/schemas/onboardingSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HostOnboardingState  {
    currentStep: number;
    totalSteps: number;
    formData: Partial<Inputs>;
}

const initialState: HostOnboardingState  = {
    currentStep: 1,
    totalSteps: 8,
    formData: {},
};

const hostOnboardingSlice = createSlice({
    name: 'hostOnboarding',
    initialState,
    reducers: {
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },
        nextStep: (state) => {
            if (state.currentStep < state.totalSteps) {
                state.currentStep += 1;
            }
        },
        prevStep: (state) => {
            if (state.currentStep > 1) {
                state.currentStep -= 1;
            }
        },
        goToStep: (state, action: PayloadAction<number>) => {
            if (action.payload >= 1 && action.payload <= state.totalSteps) {
                state.currentStep = action.payload;
            }
        },
        updateFormData: (state, action: PayloadAction<Partial<Inputs>>) => {
            state.formData = {
                ...state.formData,
                ...action.payload,
            };
        },
        resetForm: (state) => {
            state.formData = {};
            state.currentStep = 1;
        },
    },
});

export const { setCurrentStep, updateFormData, nextStep, prevStep, goToStep, resetForm } = hostOnboardingSlice.actions;
export default hostOnboardingSlice.reducer;
