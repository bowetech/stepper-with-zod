import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export default function ActionsDropdown({ onAction }: { onAction: (action: string) => void }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-md border border-red-500 bg-white px-3 py-1.5 text-xs font-bold text-red-500 transition-colors hover:bg-red-50">
                Actions <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-32">
                <DropdownMenuItem onClick={() => onAction('activate')}>Activate</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction('suspend')}>Suspend</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onAction('delete')} className="text-red-500 focus:bg-red-100 dark:focus:bg-red-900">
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
