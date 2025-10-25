import {
    AlarmSmoke,
    Bath,
    Briefcase,
    Car,
    Dumbbell,
    FireExtinguisher,
    // FirstAid,
    Flame,
    // Grill,
    PanelsTopLeft,
    ShieldAlert,
    ShowerHead,
    Trees,
    Tv,
    Umbrella,
    Utensils,
    WashingMachine,
    Waves,
    Wifi,
    Wind,
} from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Amenity =
    | 'wifi'
    | 'tv'
    | 'kitchen'
    | 'washer'
    | 'parking'
    | 'ac'
    | 'workspace'
    | 'pool'
    | 'hot_tub'
    | 'patio'
    | 'bbq'
    | 'outdoor_dining'
    | 'fire_pit'
    | 'pool_table'
    | 'exercise'
    | 'beach_access'
    | 'outdoor_shower'
    | 'smoke_alarm'
    | 'first_aid'
    | 'fire_extinguisher'
    | 'co_alarm';

interface AmenityOption {
    value: Amenity;
    label: string;
    icon: React.ElementType;
}

const amenities: AmenityOption[] = [
    { value: 'wifi', label: 'Wi-Fi', icon: Wifi },
    { value: 'tv', label: 'TV', icon: Tv },
    { value: 'kitchen', label: 'Kitchen', icon: Utensils },
    { value: 'washer', label: 'Washer', icon: WashingMachine },
    { value: 'parking', label: 'Free parking', icon: Car },
    { value: 'ac', label: 'Air conditioning', icon: Wind },
    { value: 'workspace', label: 'Workspace', icon: Briefcase },
    { value: 'pool', label: 'Pool', icon: Waves },
    { value: 'hot_tub', label: 'Hot Tub', icon: Bath },
    { value: 'patio', label: 'Patio', icon: PanelsTopLeft },
    // { value: 'bbq', label: 'BBQ Grill', icon: Grill },
    { value: 'outdoor_dining', label: 'Outdoor dining', icon: Trees },
    { value: 'fire_pit', label: 'Fire Pit', icon: Flame },
    { value: 'pool_table', label: 'Pool Table', icon: PanelsTopLeft },
    { value: 'exercise', label: 'Exercise equipment', icon: Dumbbell },
    { value: 'beach_access', label: 'Beach Access', icon: Umbrella },
    { value: 'outdoor_shower', label: 'Outdoor Shower', icon: ShowerHead },
    { value: 'smoke_alarm', label: 'Smoke Alarm', icon: AlarmSmoke },
    // { value: 'first_aid', label: 'First Aid Kit', icon: FirstAid },
    { value: 'fire_extinguisher', label: 'Fire Extinguisher', icon: FireExtinguisher },
    { value: 'co_alarm', label: 'CO Alarm', icon: ShieldAlert },
];

interface Inputs {
    amenities: Amenity[];
}

export default function AmenitiesForm() {
    const { register, handleSubmit, watch } = useForm<Inputs>();

    const processForm: SubmitHandler<Inputs> = (data) => {
        console.log('Selected amenities:', data.amenities);
    };

    return (
        <form onSubmit={handleSubmit(processForm)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {amenities.map(({ value, label, icon: Icon }) => (
                    <label key={value} className="relative cursor-pointer">
                        <input type="checkbox" value={value} {...register('amenities')} className="peer hidden" />
                        <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-gray-300 bg-white p-4 text-center transition peer-checked:border-blue-500 peer-checked:bg-blue-50">
                            <Icon className="h-8 w-8 text-gray-600 peer-checked:text-blue-600" />
                            <span className="text-sm font-medium peer-checked:text-blue-700">{label}</span>
                        </div>
                    </label>
                ))}
            </div>

            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Save
            </button>

            {/* Live preview of selections */}
            <pre className="text-sm text-gray-700">{JSON.stringify(watch('amenities') || [], null, 2)}</pre>
        </form>
    );
}
