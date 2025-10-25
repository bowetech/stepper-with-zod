import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { StepType } from './Stepper';

export default function Step({ step }: { step: StepType }) {
    const { number, title } = step;
    const currentStep = useSelector((store: RootState) => store.hostOnboarding.currentStep);

    return (
        <div className="flex flex-col items-center gap-3 md:flex-row">
            <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-slate-50 font-bold text-slate-50 md:h-12 md:w-12 ${number == currentStep ? 'border-0 bg-blue-300' : ''} `}
            >
                {number}
            </div>
            <div className="flex flex-col justify-center">
                <h4 className="text-sm text-slate-200 uppercase"> Step {number}</h4>
                <h4 className="md:text-md text-sm font-bold text-white uppercase"> {title}</h4>
            </div>
        </div>
    );
}
