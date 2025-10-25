import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SelectPerPageProps {
    per_page: string;
    onPerPageChange: (value: string) => void;
}

export default function SelectPerPage({ per_page, onPerPageChange }: SelectPerPageProps) {
    return (
        <div className="inline-flex items-center overflow-hidden rounded-md border border-gray-300 bg-white text-sm dark:border-gray-700 dark:bg-gray-900">
            <span className="border-r border-gray-300 bg-white px-3 py-1.5 whitespace-nowrap text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500">
                Per page:
            </span>
            <Select onValueChange={onPerPageChange} value={per_page}>
                <SelectTrigger className="w-[60px] rounded-none border-0 bg-white py-1.5 pl-3 text-gray-800 focus:border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 dark:bg-gray-900 dark:text-gray-500">
                    <SelectValue placeholder="Rows" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="-1">All</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
