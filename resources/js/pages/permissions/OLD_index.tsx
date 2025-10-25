import SelectPerPage from '@/components/SelectPerPage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DeleteButton } from '@/components/ui/DeleteButton';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';
import { EyeIcon, Grid2x2Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Permissions',
        href: route('permissions.index'),
    },
];

// interface Permission {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
//     image: File | null;
//     active: string;
// }

export default function index({ permissions }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-slate-100 p-4 text-gray-500 dark:bg-gray-950">
                <h1 className="mb-2 flex items-center text-xl font-normal md:text-xl">
                    <span>Edit user </span>
                </h1>

                <div className="mb-2 flex gap-2">
                    <div className="relative h-9 w-full md:w-1/3 md:shrink-0">Add user</div>
                    <div className="ml-auto inline-flex items-center gap-2">
                        <div className="shrink-0"></div>
                    </div>
                </div>
                <div className="relative">
                    <Card>
                        <CardContent>
                            {permissions.length === 0 ? (
                                <div className="flex flex-col items-center justify-center space-y-6 px-6 py-8">
                                    <div className="flex flex-col items-center justify-center space-y-3 px-6">
                                        <Grid2x2Plus strokeWidth={1} height="100" width="80" className="text-gray-300" />
                                        <h3 className="text-base font-normal">No Result matched the given criteria. </h3>
                                    </div>
                                    <a
                                        className="active:border-primary-300 inline-flex h-9 shrink-0 items-center rounded border-2 border-gray-200 bg-white px-3 font-semibold whitespace-nowrap text-sky-500 ring-sky-200 hover:border-sky-500 focus:ring-2 focus:outline-none dark:border-gray-500 dark:bg-transparent dark:text-gray-400 dark:ring-gray-600 dark:hover:border-gray-400 dark:active:border-gray-300"
                                        href="#"
                                    >
                                        Create User
                                    </a>
                                </div>
                            ) : (
                                <div>
                                    <div className="relative overflow-hidden overflow-x-auto">
                                        <table className="w-full divide-y divide-gray-100 dark:divide-gray-700">
                                            <thead className="bg-slate-50 dark:bg-gray-800">
                                                <tr>
                                                    <th className="white-space-nowrap w-[1%] py-2 pr-2 pl-5 text-xs tracking-wide text-gray-500 uppercase">
                                                        <span className="sr-only">Selected Resources</span>
                                                    </th>
                                                    <th className="px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase">
                                                        ID
                                                    </th>
                                                    <th className="px-2 py-2 text-center text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase">
                                                        Permission Name
                                                    </th>

                                                    <th className="px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase">
                                                        Module
                                                    </th>
                                                    <th className="px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase">
                                                        Description
                                                    </th>
                                                    <th className="px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase">
                                                        Created At
                                                    </th>
                                                    <th className="px-2 py-2 text-xs tracking-wide uppercase">
                                                        <span className="sr-only">Controls</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                                {permissions.map((user, index) => (
                                                    <tr key={index} className="group">
                                                        <td className="white-space-nowrap w-[1%] cursor-pointer py-2 pr-5 pl-5 group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                                            <Checkbox
                                                                className="relative inline-flex h-4 w-4 items-center justify-center rounded border border-gray-950/20 bg-white text-white ring-sky-500 ring-offset-2 focus:ring-3 dark:border-gray-600 dark:bg-gray-900 group-data-[focus]:dark:ring-offset-gray-950"
                                                                aria-label="Select row"
                                                            />
                                                        </td>
                                                        <td className="cursor-pointer px-2 py-2 whitespace-nowrap group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                                            <div className="text-left">
                                                                <span className="whitespace-nowrap">{user.id + index}</span>
                                                            </div>
                                                        </td>

                                                        <td className="cursor-pointer px-2 py-2 whitespace-nowrap group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                                            <div className="flex items-center justify-center text-center">
                                                                <span>{user.name}</span>
                                                            </div>
                                                        </td>

                                                        <td className="cursor-pointer px-2 py-2 whitespace-nowrap group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                                            <div className="text-left">
                                                                <span className="whitespace-nowrap">{user.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="cursor-pointer px-2 py-2 whitespace-nowrap group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                                            <div className="text-left">
                                                                <span className="whitespace-nowrap">{user.description}</span>
                                                            </div>
                                                        </td>
                                                        <td className="cursor-pointer px-2 py-2 whitespace-nowrap group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                                            {new Date(user.created_at).toLocaleDateString('en-US')}
                                                        </td>
                                                        <td className="white-space-nowrap w-[1%] cursor-pointer px-2 py-2 text-right align-middle group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                                            <div className="flex items-center justify-end space-x-0 text-gray-400">
                                                                <Link
                                                                    prefetch
                                                                    className="hover:text-primary-500 dark:hover:text-primary-500 inline-flex h-9 w-9 items-center justify-center text-gray-500 dark:text-gray-400"
                                                                    href={''}
                                                                >
                                                                    <EyeIcon className="size-6" />
                                                                </Link>

                                                                <Link
                                                                    prefetch
                                                                    className="hover:text-primary-500 dark:hover:text-primary-500 inline-flex h-9 w-9 items-center justify-center text-gray-500 dark:text-gray-400"
                                                                >
                                                                    <PencilSquareIcon className="size-6" />
                                                                </Link>

                                                                <DeleteButton />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="border-t border-gray-200 dark:border-gray-700">
                                        <div className="rounded-b-lg">
                                            <nav className="flex items-center justify-between space-x-2 py-2">
                                                <div className="space-x-2 rounded-bl-lg px-4 py-3 text-sm text-muted-foreground dark:text-gray-400">
                                                    Showing {permissions.from} to {permissions.to} of {permissions.total} results
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <SelectPerPage per_page={permissions.per_page} onPerPageChange={''} />
                                                </div>
                                                <div className="flex items-center space-x-2 px-4">
                                                    <Button variant="outline" size="sm" onClick={''} disabled={''}>
                                                        Previous
                                                    </Button>

                                                    <Button variant="outline" size="sm" onClick={''} disabled={''}>
                                                        Next
                                                    </Button>
                                                </div>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
