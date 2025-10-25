import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';

interface filterProps {
    selected_filter: string;
    onFilterChange: (value: string) => void;
}

export default function ThemeSelector({ selected_filter, onFilterChange }: filterProps) {
    const [theme, setTheme] = useState('None');
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null); // for detecting outside clicks

    const themes = ['Active', 'Pending', 'None'];

    const toggleDropdown = () => setOpen((prev) => !prev);

    const selectTheme = (value: string) => {
        setTheme(value); // update local state
        onFilterChange(value); // notify parent
        setOpen(false);
        console.log(selected_filter);

        // 🌓 Optionally apply theme change here (e.g., via document.documentElement.classList)
        // document.documentElement.classList.toggle('dark', value === 'Dark');
    };


const getSelectedFilterFromURL=(): string =>{
    const params = new URLSearchParams(window.location.search);
    return params.get('selected_filter') || 'None';
}

    // Sync internal state with incoming selected_filter (e.g., on prop change)
    useEffect(() => {
       const selected = getSelectedFilterFromURL();
    setTheme(selected);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} data-dusk="filter-selector" className="relative inline-block text-left text-red-800">
            <span>
                <button
                    type="button"
                    className="bg-primary-500 border-primary-500 hover:bg-primary-400 hover:border-primary-400 relative inline-flex h-9 cursor-pointer appearance-none items-center justify-center rounded-sm border px-1.5 text-left text-sm font-bold text-white shadow ring-sky-200 focus:ring focus:outline-none disabled:cursor-not-allowed dark:text-gray-900 dark:ring-gray-600"
                    data-dusk="filter-selector-button"
                    aria-label="Theme Dropdown"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                >
                    <span className="flex items-center gap-1">
                        <FunnelIcon className="size-6 text-gray-400" />
                        <ChevronDownIcon className="size-4 text-gray-500" aria-hidden="true" />
                    </span>
                    {theme !== 'None' && <span className="px-1 text-xs text-gray-400">Filter: {theme}</span>}
                  {console.log(theme)}
                </button>
            </span>

            {open && (
                <div
                    id="theme-selector-menu"
                    className="absolute right-0 z-50 mt-1 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 dark:bg-gray-800"
                >
                    <div className="py-1">
                        {themes.map((t) => (
                            <button
                                key={t}
                                onClick={() => selectTheme(t)}
                                className={`w-full px-4 py-2 text-left text-sm ${
                                    theme === t
                                        ? 'bg-primary-100 dark:bg-primary-700 text-primary-700 font-semibold dark:text-white'
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
