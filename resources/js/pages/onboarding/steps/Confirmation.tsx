import { FormDataSchema, Step3Schema } from '@/pages/onboarding/schemas/onboardingSchema';
import { resetForm, updateFormData } from '@/redux/slices/hostOnboardingSlice'; // 👈 adjust path to your slice
import { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

type Inputs = z.infer<typeof Step3Schema>;

export default function ConfirmationForm() {
    const dispatch = useDispatch();
    const savedData = useSelector((store: RootState) => store.hostOnboarding.formData);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(Step3Schema), defaultValues: savedData });

    const processForm: SubmitHandler<Inputs> = async (data) => {
        //Merge new dat with old saved data
        const mergedData = { ...savedData, ...data }; //✋🧪  experimental

        // update the form data in redux and move next
        await dispatch(updateFormData(data));
        //dispatch(nextStep());

        const result = FormDataSchema.safeParse(mergedData);
        if (!result.success) {
            console.log('❌ Final validation failed:', result.error.format());
        } else {
            console.log('✅ Final valid data:', result.data);
        }

        // clears form in redux store and locally
        dispatch(resetForm());
        reset();
    };

    return (
        <div>
            <form className="mx-auto max-w-sm" onSubmit={handleSubmit(processForm)}>
                {/* Email */}
                <div className="mb-5">
                    <label htmlFor="country" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Your County
                    </label>
                    <input
                        type="text"
                        id="country"
                        {...register('country')}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                    {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>}
                </div>

                {/* Next button */}
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Next
                </button>
            </form>
        </div>
    );
}
