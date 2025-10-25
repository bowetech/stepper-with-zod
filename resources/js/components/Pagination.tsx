import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from '@inertiajs/react';

interface PaginationData {
    links: string;
    per_page: string; // TODO apply this as type is typescript
    onPerPageChange: (value: string) => void;
}

export default function Pagination({ links,per_page, onPerPageChange }: PaginationData) {
    //  console.log(perPage);
    return (
        <div className="mt-4 flex flex-wrap items-center space-x-1">
   

            {/* Select per page */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground"> Row per page:</span>
                <Select onValueChange={onPerPageChange} value={per_page}>
                    <SelectTrigger className="w-[90px]">
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
            {/* Select per page */}


                     {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url ?? '#'}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`gap-2 rounded-lg border px-4 py-2 text-lg ${link.active ? 'border-t-blue-600 bg-blue-600 text-white' : 'bg-white text-gray-700'} ${link.url ? 'opacity-50' : 'hover:bg-gray-100'}`}
                />
            ))}
        </div>
    );
}
