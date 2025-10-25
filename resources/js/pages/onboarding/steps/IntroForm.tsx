import { nextStep, prevStep } from '@/redux/slices/hostOnboardingSlice'; // 👈 adjust path to your slice
import { RootState } from '@/redux/store';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

export default function IntroStep() {
    const dispatch = useDispatch();
    const currentStep = useSelector((store: RootState) => store.hostOnboarding.currentStep);
    //dispatch(nextStep());

    const handlePrev = () => {
        dispatch(prevStep());
    };

    const handleClick = () => {
        dispatch(nextStep());
    };

    return (
        <>
            <form>
                <div className="m-10 flex flex-col justify-between">
                    <div>
                        <h1 className="mb-15 text-4xl font-bold"> It's easy to get started on Dominica Booking</h1>
                    </div>

                    <div className="mb-10 flex flex-row border-b-2 border-slate-200 pb-10">
                        <div className="mr-4 text-xl font-bold"> </div>
                        <div>
                            <h2 className="text- mb-1 text-xl font-bold text-gray-700"> Tell use about your place </h2>
                            <h3 className="text-xl text-gray-700">
                                In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room.
                                Then let us know the location and how many guests can stay.
                            </h3>
                        </div>

                        <div>
                            <img className="w-30" src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg" />
                        </div>
                    </div>
                    <div className="mb-10 flex flex-row border-b-2 border-slate-200 pb-10">
                        <div className="mr-4 text-xl font-bold"> {1}</div>
                        <div>
                            <h2 className="text- mb-1 text-xl font-bold text-gray-700"> Tell use about your place </h2>
                            <h3 className="text-xl text-gray-700"> Share some basic info, like where it is and how many guests can stay </h3>
                        </div>

                        <div>
                            <img className="w-30" src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg" />
                        </div>
                    </div>

                    <div className="mb-10 flex flex-row border-b-2 border-slate-200 pb-10">
                        <div className="mr-4 text-xl font-bold"> 2 </div>
                        <div>
                            <h2 className="text- mb-1 text-xl font-bold text-gray-700"> Make it stand out</h2>
                            <h3 className="text-xl text-gray-700"> Add 5 or more photos plus a title and description—we’ll help you out.</h3>
                        </div>

                        <div>
                            <img className="w-30" src=" https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg" />
                        </div>
                    </div>

                    <div className="mb-10 flex flex-row border-b-2 border-slate-200 pb-10">
                        <div className="mr-4 text-xl font-bold"> {3}</div>
                        <div>
                            <h2 className="text- mb-1 text-xl font-bold text-gray-700"> Finish up and publish</h2>
                            <h3 className="text-xl text-gray-700"> Choose a starting price, verify a few details, then publish your listing </h3>
                        </div>

                        <div>
                            <img className="w-30" src=" https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        onClick={handlePrev}
                        type="submit"
                        className="mt-4 inline-flex items-center rounded-lg bg-slate-900 px-5 py-2 text-center text-sm font-medium text-white hover:bg-slate-800 focus:ring-4 focus:ring-blue-200 sm:mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                    >
                        <ChevronLeft className="mr-2 h-5 w-5" />
                        <span>Previous</span>
                    </button>

                    <button
                        onClick={handleClick}
                        type="submit"
                        className="mt-4 inline-flex items-center rounded-lg bg-slate-900 px-5 py-2 text-center text-sm font-medium text-white hover:bg-slate-800 focus:ring-4 focus:ring-blue-200 sm:mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                    >
                        <span>Nextx</span>
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </form>
        </>
    );
}
