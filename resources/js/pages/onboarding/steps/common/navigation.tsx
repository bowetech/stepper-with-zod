import { setCurrentStep } from '@/redux/slices/hostOnboardingSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

export default function Navigation() {
    const dispatch = useDispatch<AppDispatch>();
    const currentStep = useSelector((store: RootState) => store.hostOnboarding.currentStep);

    const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(setCurrentStep(currentStep - 1));
    };
    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(setCurrentStep(currentStep + 1));
    };
    return (
        <div className="flex items-center justify-between">
            {currentStep > 1 && (
                <button
                    onClick={handlePrevious}
                    type="submit"
                    className="mt-4 inline-flex items-center rounded-lg bg-slate-900 px-5 py-2 text-center text-sm font-medium text-white hover:bg-slate-800 focus:ring-4 focus:ring-blue-200 sm:mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    <span>Previous</span>
                </button>
            )}
            <button
                onClick={handleNext}
                type="submit"
                className="mt-4 inline-flex items-center rounded-lg bg-slate-900 px-5 py-2 text-center text-sm font-medium text-white hover:bg-slate-800 focus:ring-4 focus:ring-blue-200 sm:mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
            >
                <span>Next</span>
                <ChevronRight className="ml-2 h-5 w-5" />
            </button>
        </div>
    );
}
