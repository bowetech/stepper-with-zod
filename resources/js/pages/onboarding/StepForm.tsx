import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { AmenitiesForm, IntroForm, PhotosForm, PrivacyTypeForm } from './steps/common';
import ConfirmationForm from './steps/Confirmation';
import ProperyTypeForm from './steps/ProperyTypeForm';
export default function StepForm() {
    const currentStep = useSelector((store: RootState) => store.hostOnboarding.currentStep);

    const displayStep = (step: number) => {
        switch (step) {
            case 1:
                return <IntroForm />;
            case 2:
                return <ProperyTypeForm />;
            case 3:
                return <PrivacyTypeForm />;
            // case 4:
            //     return <SpaceForm />;
            case 4:
                return <PhotosForm />;
            case 5:
                return <AmenitiesForm />;
            // case 5:
            //     return <PersonalInfoForm />;
            case 6:
                return <AmenitiesForm />;
            case 7:
                return <ConfirmationForm />;

            default:
        }
    };

    return <>{displayStep(currentStep)}</>;
}
