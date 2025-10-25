import { hasPermission } from '@/utils/authorization';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';
import * as LucidIcons from 'lucide-react';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

interface TableColumn {
    label: string;
    key: string;
    isImage?: boolean;
    isAction?: boolean;
    className?: string;
    type?: string;
}

interface ActionConfig {
    label: string;
    icon: keyof typeof LucidIcons;
    route: string;
    className: string;
    permission?: string;
}

interface TableRow {
    [key: string]: any;
}

interface CustomTableProps {
    columns: TableColumn[];
    actions: ActionConfig[];
    data: TableRow[];
    from: number;
    onDelete: (route: string) => void;
    onView: (row: TableRow) => void;
    onEdit: (row: TableRow) => void;
    isModal?: boolean;
}

export const CustomTable = ({ columns, actions, data, from, onDelete, onView, onEdit, isModal }: CustomTableProps) => {
    const { auth } = usePage().props as any;
    const roles = auth.roles;
    const permissions = auth.permissions;

    const renderActionButtons = (row: TableRow) => {
        return (
            <div className="flex">
                {actions.map((action, index) => {
                    if (action.permission && !hasPermission(permissions, action.permission)) {
                        return null;
                    }

                    const IconComponent = LucidIcons[action.icon] as React.ElementType;

                    // View Functionality
                    if (isModal) {
                        if (action.label === 'View') {
                            return (
                                <Button key={index} className={action.className} onClick={() => onView?.(row)}>
                                    <IconComponent size={6} className="size-6" />
                                </Button>
                            );
                        }

                        // Edit Functionality
                        if (action.label === 'Edit') {
                            return (
                                <Button key={index} className={action.className} onClick={() => onEdit?.(row)}>
                                    <PencilSquareIcon size={6} className="size-6" />
                                </Button>
                            );
                        }
                    }

                    // Delete Functionality
                    if (action.label === 'Delete') {
                        return (
                            <Button key={index} className={action.className} onClick={() => onDelete(route(action.route, row.id))}>
                                <IconComponent size={6} className="size-6" />
                            </Button>
                        );
                    }

                    return (
                        <Link key={index} as="button" href={route(action.route, row.id)} className={action.className}>
                            <IconComponent size={18} />
                        </Link>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
            <table className="w-full divide-y divide-gray-100 dark:divide-gray-700">
                <thead className="bg-slate-50 dark:bg-gray-800">
                    <tr>
                        <th className="white-space-nowrap w-[1%] py-2 pr-2 pl-5 text-xs tracking-wide text-gray-500 uppercase">
                            <span className="sr-only">Selected Resources</span>
                        </th>

                        {columns.map((column) => (
                            <th key={column.key} className={column.className}>
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <tr key={index} className="group">
                                <td className="white-space-nowrap w-[1%] cursor-pointer py-2 pr-5 pl-5 group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                    <Checkbox
                                        className="relative inline-flex h-4 w-4 items-center justify-center rounded border border-gray-950/20 bg-white text-white ring-sky-500 ring-offset-2 focus:ring-3 dark:border-gray-600 dark:bg-gray-900 group-data-[focus]:dark:ring-offset-gray-950"
                                        aria-label="Select row"
                                    />
                                </td>

                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className={`whitespace-nowrap group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900 ${col.className}`}
                                    >
                                        {col.isImage ? (
                                            <div>
                                                <img src={row[col.key]} alt={row.name || 'Image'} className="h-10 w-10 rounded-lg object-cover" />
                                            </div>
                                        ) : col.isAction ? (
                                            renderActionButtons(row)
                                        ) : col.type === 'multi-values' && Array.isArray(row[col.key]) ? (
                                            <div className="flex flex-wrap items-center justify-center gap-1">
                                                {row[col.key].map((permission: any) => (
                                                    <Badge className="bg-sky-100 px-3 py-0.5 text-sky-700" key={permission.id} variant="outline">
                                                        {permission.label || permission.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            row[col.key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-md py-4 text-center font-bold text-red-600">
                                No Data Found!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
