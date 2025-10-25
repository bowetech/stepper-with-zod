import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export default function SpaceForm() {
    const [guests, setGuests] = useState(1);
    const [bedrooms, setBedrooms] = useState(1);
    const [beds, setBeds] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);

    return (
        <div className="space-y-8">
            {/* Title + Subtitle */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900">Share some basics about your place</h2>
                <p className="text-gray-600">You'll add more details later, like bed types.</p>
            </div>

            {/* Counters */}
            <div className="space-y-6">
                {/* Guests */}
                <Counter
                    label="Guests"
                    value={guests}
                    onDecrement={() => setGuests(Math.max(1, guests - 1))}
                    onIncrement={() => setGuests(guests + 1)}
                />

                {/* Bedrooms */}
                <Counter
                    label="Bedrooms"
                    value={bedrooms}
                    onDecrement={() => setBedrooms(Math.max(1, bedrooms - 1))}
                    onIncrement={() => setBedrooms(bedrooms + 1)}
                />

                {/* Beds */}
                <Counter label="Beds" value={beds} onDecrement={() => setBeds(Math.max(1, beds - 1))} onIncrement={() => setBeds(beds + 1)} />

                {/* Bathrooms */}
                <Counter
                    label="Bathrooms"
                    value={bathrooms}
                    onDecrement={() => setBathrooms(Math.max(1, bathrooms - 1))}
                    onIncrement={() => setBathrooms(bathrooms + 1)}
                />
            </div>
        </div>
    );
}

/* Reusable counter component */
function Counter({ label, value, onDecrement, onIncrement }: { label: string; value: number; onDecrement: () => void; onIncrement: () => void }) {
    return (
        <div className="flex items-center justify-between rounded-lg border p-4">
            <span className="text-lg font-medium">{label}</span>
            <div className="flex items-center gap-4">
                <button type="button" onClick={onDecrement} className="rounded-full border p-2 hover:bg-gray-100">
                    <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center text-lg font-semibold">{value}</span>
                <button type="button" onClick={onIncrement} className="rounded-full border p-2 hover:bg-gray-100">
                    <Plus className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
