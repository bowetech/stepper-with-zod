import { nextStep, prevStep, updateFormData } from '@/redux/slices/hostOnboardingSlice'; // 👈 adjust path to your slice
import { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight, DoorClosed, Home, Users } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { privacyTypeSchema } from '../schemas/onboardingSchema';

type FormValues = z.infer<typeof privacyTypeSchema>;

type PrivacyType = 'entire' | 'room' | 'shared';

interface Option {
    value: PrivacyType;
    label: string;
    description: string;
    icon: React.ElementType;
}

const options: Option[] = [
    {
        value: 'entire',
        label: 'An entire place',
        description: 'Guests have the whole place to themselves',
        icon: Home,
    },
    {
        value: 'room',
        label: 'A room',
        description: 'Guests have their own room in a home, plus access to shared spaces',
        icon: DoorClosed,
    },
    {
        value: 'shared',
        label: 'A shared room in a hostel',
        description: 'Guests sleep in a shared room in a professionally managed hostel with staff on site 24/7',
        icon: Users,
    },
];

export default function PrivacyTypeForm() {
    const dispatch = useDispatch();
    const saveData = useSelector((store: RootState) => store.hostOnboarding.formData);

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver: zodResolver(privacyTypeSchema), defaultValues: saveData });

    const processForm: SubmitHandler<FormValues> = (data) => {
        // update the form data in redux and move next
        dispatch(updateFormData(data)); //propertyType: data.accommodation
        dispatch(nextStep());
    };

    const handlePrevious = () => {
        dispatch(prevStep());
    };

    const selected = watch('privacy');

    return (
        <div className="mx-4 flex flex-col gap-4">
            <h2 className="mb-4 text-3xl font-semibold"> What type of place will guests have?</h2>

            <pre className="mt-4 text-sm text-gray-600">Selected: {selected || 'none'}</pre>

            {errors.privacy && <p className="mt-1 text-sm text-red-600">{errors.privacy.message}</p>}

            <form onSubmit={handleSubmit(processForm)}>
                {options.map(({ value, label, description, icon: Icon }) => (
                    <label key={value} className="relative cursor-pointer">
                        <input type="radio" value={value} {...register('privacy')} className="peer hidden" />
                        <div className="mb-2 flex flex-row items-center justify-between rounded-lg border-2 border-gray-300 bg-white p-6 transition peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-400">
                            <div className="flex flex-col items-start">
                                <p className="font-medium">{label}</p>
                                <p className="text-sm text-gray-600">{description}</p>
                            </div>
                            <Icon className="h-8 w-8 text-gray-600 peer-checked:text-blue-500" />
                        </div>
                    </label>
                ))}

                <div className="mt-6 flex items-center justify-between">
                    <button
                        onClick={handlePrevious}
                        type="submit"
                        className="mt-4 inline-flex items-center rounded-lg bg-slate-900 px-5 py-2 text-center text-sm font-medium text-white hover:bg-slate-800 focus:ring-4 focus:ring-blue-200 sm:mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                    >
                        <ChevronLeft className="mr-2 h-5 w-5" />
                        <span>Previous</span>
                    </button>

                    <button
                        type="submit"
                        className="mt-4 inline-flex items-center rounded-lg bg-slate-900 px-5 py-2 text-center text-sm font-medium text-white hover:bg-slate-800 focus:ring-4 focus:ring-blue-200 sm:mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                    >
                        <span>Nextx</span>
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}
