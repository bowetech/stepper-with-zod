import { Step1Schema } from '@/pages/onboarding/schemas/onboardingSchema';
import { nextStep, prevStep, updateFormData } from '@/redux/slices/hostOnboardingSlice'; // 👈 adjust path to your slice
import { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

type Inputs = z.infer<typeof Step1Schema>;

export default function PersonalInfoForm() {
    const dispatch = useDispatch();
    const savedData = useSelector((store: RootState) => store.hostOnboarding.formData);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(Step1Schema), defaultValues: savedData });

    const processForm: SubmitHandler<Inputs> = (data) => {
        // update the form data in redux and move next
        dispatch(updateFormData(data));
        dispatch(nextStep());
    };

    const handlePrevious = () => {
        dispatch(prevStep());
    };

    return (
        <div>
            <form className="mx-auto max-w-md">
                <div className="flex-grow">
                    {/* Email */}onSubmit={handleSubmit(processForm)}
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            Your email
                        </label>
                        <input
                            type="text"
                            id="email"
                            {...register('email')}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                    {/* Email */}
                    <div className="mb-5">
                        <label htmlFor="test" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            Your test
                        </label>
                        <input
                            type="text"
                            id="test"
                            {...register('test')}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                        {errors.test && <p className="mt-1 text-sm text-red-600">{errors.test.message}</p>}
                    </div>
                    {/* Password */}
                    <div className="mb-5">
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            Your password
                        </label>
                        <input
                            type="text"
                            id="password"
                            {...register('password')}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                    </div>
                    {/* Remember me */}
                    <div className="mb-5 flex items-start">
                        <div className="flex h-5 items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                {...register('remember')}
                                className="h-4 w-4 rounded-sm border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                            />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Remember me
                        </label>
                    </div>
                    {/* Next button
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Next
                </button> */}
                </div>

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

                <div>
                    {/* Option 1 */}
                    <label className="relative cursor-pointer">
                        <input type="radio" value="hotel" {...register('propertyType')} className="peer hidden" />
                        <div className="rounded-lg border-2 border-gray-300 bg-white p-2 transition peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-400">
                            <img src="https://picsum.photos/20/30" className="h-32 w-full rounded-md object-cover" />
                            <p className="mt-2 text-center font-medium">Hotel</p>
                        </div>
                    </label>

                    {/* Option 2 */}
                    <label className="relative cursor-pointer">
                        <input type="radio" value="airbnb" {...register('propertyType')} className="peer hidden" />
                        <div className="rounded-lg border-2 border-gray-300 bg-white p-2 transition peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-400">
                            <img src="https://source.unsplash.com/300x200/?apartment" alt="Airbnb" className="h-32 w-full rounded-md object-cover" />
                            <p className="mt-2 text-center font-medium">Airbnb</p>
                        </div>
                    </label>

                    {/* Option 3 */}
                    <label className="relative cursor-pointer">
                        <input type="radio" value="villa" {...register('propertyType')} className="peer hidden" />
                        <div className="rounded-lg border-2 border-gray-300 bg-white p-2 transition peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-400">
                            <img src="https://source.unsplash.com/300x200/?villa" alt="Villa" className="h-32 w-full rounded-md object-cover" />
                            <p className="mt-2 text-center font-medium">Villa</p>
                        </div>
                    </label>

                    {/* Option 4 */}
                    <label className="relative cursor-pointer">
                        <input type="radio" value="hostel" {...register('propertyType')} className="peer hidden" />
                        <div className="rounded-lg border-2 border-gray-300 bg-white p-2 transition peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-400">
                            <img src="https://source.unsplash.com/300x200/?hostel" alt="Hostel" className="h-32 w-full rounded-md object-cover" />
                            <p className="mt-2 text-center font-medium">Hostel</p>
                        </div>
                    </label>
                </div>
            </form>
        </div>
    );
}
