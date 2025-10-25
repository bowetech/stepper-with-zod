import { Step2Schema } from '@/pages/onboarding/schemas/onboardingSchema';
import { nextStep, updateFormData } from '@/redux/slices/hostOnboardingSlice'; // 👈 adjust path to your slice
import { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

type Inputs = z.infer<typeof Step2Schema>;

export default function LocationForm() {
    const dispatch = useDispatch();
    const savedData = useSelector((store: RootState) => store.hostOnboarding.formData);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(Step2Schema), defaultValues: savedData });

    const processForm: SubmitHandler<Inputs> = (data) => {
        // update the form data in redux and move next
        dispatch(updateFormData(data));
        dispatch(nextStep());
    };

    return (
        <div>
            <form className="mx-auto max-w-sm" onSubmit={handleSubmit(processForm)}>
                {/* Email */}
                <div className="mb-5">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                {/* Password */}
                <div className="mb-5">
                    <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Your Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        {...register('address')}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                </div>

                {/* Next button */}
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Next
                </button>
            </form>
        </div>
    );
}
