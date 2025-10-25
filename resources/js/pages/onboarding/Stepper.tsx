import Step from './Step';

export type StepType = {
    number: number;
    title: string;
};

type StepperProps = {
    steps: StepType[];
};

export default function Stepper({ steps }: StepperProps) {
    return (
        <div className="col-span-full flex flex-row flex-wrap justify-between gap-6 rounded-lg bg-sky-600 px-6 py-10 md:col-span-4 md:flex-col md:justify-start">
            {steps.map((step, i) => {
                return <Step key={i} step={step} />;
            })}
        </div>
    );
}
