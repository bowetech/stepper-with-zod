import StepForm from './onboarding/StepForm';
import Stepper, { StepType } from './onboarding/Stepper';

export default function HostOnboarding() {
    const steps: StepType[] = [
        { number: 1, title: 'Getting Started' },
        { number: 2, title: 'Property Type' },
        { number: 3, title: 'Privacy Option' },
        { number: 4, title: 'Location' },
        { number: 5, title: 'Amenities' },
    ];

    return (
        <div className="min-h-screen bg-sky-50 p-4">
            <div className="mx-auto grid min-h-screen w-full max-w-5xl grid-cols-12 gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow sm:p-4 md:p-6 dark:border-gray-700 dark:bg-gray-800">
                {/* Steps */}
                <Stepper steps={steps} />

                {/* Form  */}
                <div className="col-span-full rounded-lg md:col-span-8">
                    <StepForm />
                    {/* <Navigation /> */}
                </div>
            </div>
        </div>
    );
}
