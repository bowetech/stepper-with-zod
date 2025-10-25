import { propertyTypeSchema } from '@/pages/onboarding/schemas/onboardingSchema';
import { nextStep, prevStep, updateFormData } from '@/redux/slices/hostOnboardingSlice'; // 👈 adjust path to your slice
import { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    BedDouble,
    Building,
    Castle,
    ChevronLeft,
    ChevronRight,
    Factory,
    Home,
    Hotel,
    House,
    Landmark,
    Sailboat,
    Tent,
    TreePine,
    Warehouse,
} from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

type FormValues = z.infer<typeof propertyTypeSchema>;

// type FormValues = {
//     accommodation: string;
// };

const options = [
    { value: 'house', label: 'House', icon: House },
    { value: 'apartment', label: 'Apartment', icon: Building },
    { value: 'bed_breakfast', label: 'Bed & Breakfast', icon: BedDouble },
    { value: 'farm', label: 'Farm', icon: Factory },
    { value: 'guesthouse', label: 'Guesthouse', icon: Landmark },
    { value: 'hotel', label: 'Hotel', icon: Hotel },
    { value: 'villa', label: 'Villa', icon: Castle },
    { value: 'tent', label: 'Tent', icon: Tent },
    { value: 'tiny_home', label: 'Tiny Home', icon: Warehouse },
    { value: 'treehouse', label: 'Treehouse', icon: TreePine },
    { value: 'boat', label: 'Boat', icon: Sailboat },
    { value: 'airbnb', label: 'Home / Airbnb', icon: Home },
];

export default function ProperyTypeForm() {
    const dispatch = useDispatch();
    const savedData = useSelector((store: RootState) => store.hostOnboarding.formData);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormValues>({ resolver: zodResolver(propertyTypeSchema), defaultValues: savedData });

    const processForm: SubmitHandler<FormValues> = (data) => {
        // update the form data in redux and move next
        dispatch(updateFormData(data)); //propertyType: data.accommodation
        dispatch(nextStep());
    };

    const handlePrevious = () => {
        dispatch(prevStep());
    };

    // { resolver: zodResolver(Step1Schema), defaultValues: savedData }

    const selected = watch('accommodation');

    // const onSubmit = (data: FormValues) => {
    //     console.log('Selected accommodation:', data);
    // };

    return (
        <form className="mx-4 max-w-3xl" onSubmit={handleSubmit(processForm)}>
            <h2 className="mb-4 text-3xl font-semibold"> How would you best describes your place?</h2>
            <pre className="mt-4 text-sm text-gray-600">Selected: {selected || 'none'}</pre>
            {errors.accommodation && <p className="mt-1 text-sm text-red-600">{errors.accommodation.message}</p>}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {options.map(({ value, label, icon: Icon }) => (
                    <label key={value} className="relative cursor-pointer">
                        <input type="radio" value={value} {...register('accommodation')} className="peer hidden" />
                        <div className="flex flex-row items-center justify-start gap-3 rounded-lg border-2 border-gray-300 bg-white px-4 py-6 transition peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-400">
                            <Icon className="h-8 w-8 text-gray-600 peer-checked:text-blue-500" />
                            <p className="font-medium">{label}</p>
                        </div>
                    </label>
                ))}
            </div>

            <button type="submit" className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Continue
            </button>

            {/* Debug selection */}
            <pre className="mt-4 text-sm text-gray-600">Selected: {selected || 'none'}</pre>

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
    );
}
