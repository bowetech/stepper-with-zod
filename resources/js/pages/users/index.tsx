import SelectPerPage from '@/components/SelectPerPage';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
//import { Button } from '@headlessui/react';
import ActionSelect from '@/components/ActionSelect';
import ConfirmModal from '@/components/ConfirmModal';
import ThemeSelector from '@/components/ThemeSelector';
import { Button } from '@/components/ui/button';
import { DeleteButton } from '@/components/ui/DeleteButton';
import { ChevronDownIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import debounce from 'lodash/debounce';
import { EyeIcon, Grid2x2Plus, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    image: string;
    roles: [];
}

interface UserProps {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        prev_page_url: string;
        next_page_url: string;
    };

    filters: {
        search: string;
        per_page: string;
        sort: string;
        direction: string;
        selected_filter: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Users',
        href: '/admin/users',
    },
];

export default function UsersIndex({ users, filters }: UserProps) {
    console.log('zZZZ', users);

    //set states for page filters
    const [searchTerm, setSearchTerm] = useState(filters.search);
    const [direction, setDirection] = useState(filters?.direction || 'desc');
    const [sort, setSort] = useState(filters?.sort || 'id');

    //set states for user selection (checkboxes)
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const { data, setData } = useForm({
        search: filters.search,
        per_page: filters.per_page,
        sort: filters.sort,
        direction: filters.direction,
        selected_filter: filters.selected_filter,
    });

    const handleNextPage = (url: string) => {
        router.get(url, {}, { preserveScroll: true, preserveState: true });
    };

    const handlePageChange = (value: string) => {
        setData('per_page', value);
        updateRoute({ per_page: value });
    };

    const handleFilterChange = (value: string) => {
        if (value === '' || value === 'None') {
            setData('selected_filter', ''); // optional for form state
            updateRoute({ selected_filter: undefined }); // 👈 remove from URL
        } else {
            setData('selected_filter', value);
            updateRoute({ selected_filter: value });
        }
    };

    // const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     updateRoute({ search: searchTerm });
    // };

    const updateRoute = (newParams: Record<string, string | undefined> = {}) => {
        const queryString = {
            ...(searchTerm && { search: searchTerm }),
            ...(data.per_page && { per_page: data.per_page }),
            ...(data.sort && { sort: data.sort }),
            ...(data.selected_filter && { selected_filter: data.selected_filter }),
            ...(data.direction && { direction: data.direction }),
            page: 1,
            ...newParams,
        };

        router.get(route('users.home'), queryString, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSort = (column: string) => {
        const newDirection = sort === column && direction === 'asc' ? 'desc' : 'asc';
        setSort(column);
        setDirection(newDirection);
        router.get(route('users.home'), { ...data, sort: column, direction: newDirection }, { preserveState: true, preserveScroll: true });
    };

    const toggleSelectAll = () => {
        const ids = users.data.map((u) => u.id);
        if (selectAll) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(ids);
        }
        setSelectAll(!selectAll);
    };

    const toggleSelectUser = (id: number) => {
        const nextSelected = selectedUsers.includes(id) ? selectedUsers.filter((uid) => uid !== id) : [...selectedUsers, id];

        setSelectedUsers(nextSelected);

        //Toggle selectAll based on count matches per page
        setSelectAll(nextSelected.length === users.per_page);
    };

    const handleDeleteSelected = (user?: User) => {
        if (user) {
            setTargetUser(user);
            setConfirmMessage(`Are you sure you want to delete ${user.name}'s account?`);
            setDeletingBulk(false);
        } else {
            if (selectedUsers.length === 0) return;
            setTargetUser(null);
            setConfirmMessage(`Are you sure you want to delete ${selectedUsers.length} users?`);
            setDeletingBulk(true);
        }

        setConfirmOpen(true);
    };

    //const [selectedAction, setSelectedAction] = useState('');

    const handleAction = (action: string) => {
        switch (action) {
            case 'activate':
                // activateUser()
                break;
            case 'suspend':
                // suspendUser()
                break;
            case 'delete':
                handleDeleteSelected();
                break;
            default:
                console.log('Unkown action');
        }
    };

    // const handleReset = () => {
    //     setSearchTerm('');
    //     setSort('id');
    //     setDirection('asc');
    //     setData({
    //         search: '',
    //         per_page: '10',
    //         sort: 'id',
    //         direction: 'asc',
    //     });

    //     setSelectAll(false);
    //     setSelectedUsers([]);

    //     const queryString = {
    //         search: '',
    //         per_page: '10',
    //         sort: 'id',
    //         direction: 'asc',
    //     };

    //     router.get(route('users.home'), queryString, {
    //         preserveState: true,
    //         preserveScroll: true,
    //     });
    // };

    // const { flash } = usePage<{ flash: { message?: string } }>().props;

    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        } else if (flash?.error) {
            toast.error(flash?.error);
        }
    }, [flash]);

    const onConfirmDelete = () => {
        setLoading(true);

        const ids = deletingBulk ? selectedUsers : targetUser ? [targetUser.id] : [];

        router.delete(route('users.destroy'), {
            data: { ids },
            onSuccess: () => {
                if (deletingBulk) {
                    setSelectedUsers([]);
                    setSelectAll(false);
                } else if (targetUser) {
                    const nextSelected = selectedUsers.filter((uid) => uid !== targetUser.id);
                    setSelectedUsers(nextSelected);
                }
            },
            onFinish: () => {
                setLoading(false);
                setConfirmOpen(false);
                setTargetUser(null);
            },
        });
    };

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [targetUser, setTargetUser] = useState<User | null>(null);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [deletingBulk, setDeletingBulk] = useState(false);
    const [loading, setLoading] = useState(false);

    // const handleSearch = useRef(
    //     debounce((query: string) => {
    //         setSearchTerm(query);
    //         // router.get('/users', { users: query }, { preserveState: true, replace: true });
    //         console.log('-->', query);
    //     }, 500),
    // ).current;

    // function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    //     const query = e.target.value;

    //     handleSearch(query);
    //     updateRoute({ search: query });
    //     //  e.preventDefault();
    // }

    const handleSearch = useRef(
        debounce((query: string) => {
            setSearchTerm(query);
            updateRoute({ search: query });
            console.log('debounce-->', query);
        }, 500),
    ).current;

    useEffect(() => {
        return () => {
            // Clear pending debounce on unmount
            handleSearch.cancel?.();
        };
    }, [handleSearch]);

    function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        const query = e.target.value;
        handleSearch(query);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-slate-100 p-4 text-gray-500 dark:bg-gray-950">
                <h1 className="mb-2 flex items-center text-xl font-normal md:text-xl">
                    <span>Users </span>
                </h1>

                <ConfirmModal
                    open={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    onConfirm={onConfirmDelete}
                    isLoading={loading}
                    title="Delete Confirmation"
                    description={confirmMessage}
                    confirmText="Delete"
                    cancelText="Cancel"
                />

                <div className="mb-2 flex gap-2">
                    {/* Search Input */}
                    <div className="relative h-9 w-full md:w-1/3 md:shrink-0">
                        <form /*onSubmit={handleSearch}*/ className="relative flex-1">
                            <Search className="absolute top-[6px] ml-2 h-5 w-5 text-gray-400" />

                            <Input
                                id={'search'}
                                placeholder="Search name or email..."
                                // value={searchTerm}
                                type="search"
                                spellCheck="false"
                                aria-label="Search"
                                data-role="resource-search-input"
                                onChange={onSearchChange}
                                // onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-9 w-full appearance-none rounded-full bg-white pl-10 shadow ring-sky-200 focus:bg-white focus:ring-3 focus-visible:ring-sky-200 dark:bg-gray-700 dark:ring-gray-600 dark:focus:bg-gray-800"
                            />
                        </form>
                    </div>

                    {/* Create Button */}
                    <div className="ml-auto inline-flex items-center gap-2">
                        <div className="shrink-0">
                            <Link
                                className="inline-flex h-9 shrink-0 items-center rounded bg-sky-500 px-4 text-sm font-bold text-white shadow ring-sky-200 hover:bg-sky-400 focus:ring-3 active:bg-sky-600 dark:text-gray-800 dark:ring-gray-600"
                                as="button"
                                href={route('users.create')}
                                prefetch
                            >
                                <span className="hidden md:inline-block">Create User</span>
                                <span className="inline-block md:hidden">Create</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="flex flex-col border-b border-gray-200 py-3 md:flex-row md:items-center dark:border-gray-700">
                        <div className="flex flex-1 items-center">
                            <div className="md:ml-3">
                                <div className="flex items-center">
                                    <Checkbox
                                        checked={selectAll}
                                        onCheckedChange={toggleSelectAll}
                                        aria-label="Select all"
                                        className="relative ml-2 inline-flex h-4 w-4 items-center justify-center rounded border border-gray-950/20 bg-white text-white ring-sky-500 ring-offset-2 focus:ring-3 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 group-data-[focus]:dark:ring-offset-gray-950"
                                    />
                                    <Button
                                        type="button"
                                        className="flex items-center gap-0 bg-white px-2 text-gray-800 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-700"
                                    >
                                        {selectedUsers.length > 0 && (
                                            <span className="px-0 font-bold text-sky-500">
                                                {selectedUsers.length} <span className="font-medium">selected</span>
                                            </span>
                                        )}
                                        <span className="px-1">
                                            <ChevronDownIcon className="h-4 w-4" />
                                        </span>
                                    </Button>
                                </div>
                            </div>

                            <div className="ml-auto flex h-9 items-center pr-2 md:pr-3">
                                {selectedUsers.length > 0 && (
                                    <div className="px-5">
                                        <div className="relative flex max-w-[6rem]">
                                            <ActionSelect onAction={(selection) => handleAction(selection)} />
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <span>
                                        <ThemeSelector selected_filter={data.selected_filter} onFilterChange={handleFilterChange} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center border-t border-gray-200 px-2 pt-3 md:mt-0 md:hidden dark:border-gray-700"></div>
                    </div>
                    <div className="relative">
                        {users.data.length === 0 ? (
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
                                                    Avatar
                                                </th>

                                                <th
                                                    className="px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase"
                                                    onClick={() => handleSort('name')}
                                                >
                                                    Name
                                                    {sort === 'name' && (direction === 'asc' ? '↑' : '↓')}
                                                </th>
                                                <th
                                                    className="px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase"
                                                    onClick={() => handleSort('email')}
                                                >
                                                    Email
                                                    {sort === 'email' && (direction === 'asc' ? '↑' : '↓')}
                                                </th>

                                                <th
                                                    className="px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase"
                                                    // onClick={() => handleSort('role')}
                                                >
                                                    Role
                                                    {/* {sort === 'role' && (direction === 'asc' ? '↑' : '↓')} */}
                                                </th>

                                                <th
                                                    className="px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase"
                                                    onClick={() => handleSort('created_at')}
                                                >
                                                    Created At
                                                    {sort === 'created_at' && (direction === 'asc' ? '↑' : '↓')}
                                                </th>
                                                <th className="px-2 py-2 text-xs tracking-wide uppercase">
                                                    <span className="sr-only">Controls</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                            {users.data.map((user, index) => (
                                                <tr key={index} className="group">
                                                    <td className="white-space-nowrap w-[1%] cursor-pointer py-2 pr-5 pl-5 group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                                        <Checkbox
                                                            className="relative inline-flex h-4 w-4 items-center justify-center rounded border border-gray-950/20 bg-white text-white ring-sky-500 ring-offset-2 focus:ring-3 dark:border-gray-600 dark:bg-gray-900 group-data-[focus]:dark:ring-offset-gray-950"
                                                            checked={selectedUsers.includes(user.id)}
                                                            onCheckedChange={() => toggleSelectUser(user.id)}
                                                            aria-label="Select row"
                                                        />
                                                    </td>
                                                    <td className="cursor-pointer px-2 py-2 whitespace-nowrap group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                                        <div className="text-left">
                                                            <span className="whitespace-nowrap">{users.from + index}</span>
                                                        </div>
                                                    </td>

                                                    <td className="cursor-pointer px-2 py-2 whitespace-nowrap group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                                        <div className="flex items-center justify-center text-center">
                                                            <span>
                                                                {user.image && (
                                                                    <img src={`/storage/${user?.image}`} alt={user.name} className="w-10 rounded" />
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="cursor-pointer px-2 py-2 whitespace-nowrap group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                                        <div className="text-left">
                                                            <span className="whitespace-nowrap">{user.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="cursor-pointer px-2 py-2 whitespace-nowrap group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                                        <div className="text-left">
                                                            <span className="whitespace-nowrap">{user.email}</span>
                                                        </div>
                                                    </td>

                                                    <td className="cursor-pointer px-2 py-2 whitespace-nowrap group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                                        <span className="whitespace-nowrap">{user.roles}</span>
                                                    </td>

                                                    <td className="cursor-pointer px-2 py-2 whitespace-nowrap group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                                        {new Date(user.created_at).toLocaleDateString('en-US')}
                                                    </td>
                                                    <td className="white-space-nowrap w-[1%] cursor-pointer px-2 py-2 text-right align-middle group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-900">
                                                        <div className="flex items-center justify-end space-x-0 text-gray-400">
                                                            {/* <div>
                                                                <span>
                                                                    <button
                                                                        type="button"
                                                                        className="ring-primary-200 hover:[&amp;:not(:disabled)]:text-primary-500 inline-flex h-9 w-9 cursor-pointer appearance-none items-center justify-center rounded border border-transparent bg-transparent text-left text-sm font-bold text-gray-500 focus:ring focus:outline-none disabled:cursor-not-allowed dark:text-gray-400 dark:ring-gray-600"
                                                                        id="nova-ui-dropdown-button-31"
                                                                        aria-expanded="false"
                                                                        aria-haspopup="true"
                                                                        aria-controls="nova-ui-dropdown-menu-32"
                                                                    >
                                                                        <span className="flex items-center gap-1">
                                                                            {<EllipsisHorizontalIcon className="size-6" />}
                                                                        </span>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                           */}

                                                            <Link
                                                                href={route('users.show', user.id)}
                                                                prefetch
                                                                className="hover:text-primary-500 dark:hover:text-primary-500 inline-flex h-9 w-9 items-center justify-center text-gray-500 dark:text-gray-400"
                                                            >
                                                                <EyeIcon className="size-6" />
                                                            </Link>

                                                            <Link
                                                                href={route('users.edit', user.id)}
                                                                prefetch
                                                                className="hover:text-primary-500 dark:hover:text-primary-500 inline-flex h-9 w-9 items-center justify-center text-gray-500 dark:text-gray-400"
                                                            >
                                                                <PencilSquareIcon className="size-6" />
                                                            </Link>

                                                            <DeleteButton onClick={() => handleDeleteSelected(user)} />
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
                                                Showing {users.from} to {users.to} of {users.total} results
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <SelectPerPage per_page={data.per_page} onPerPageChange={handlePageChange} />
                                            </div>
                                            <div className="flex items-center space-x-2 px-4">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleNextPage(users.prev_page_url)}
                                                    disabled={!users.prev_page_url}
                                                >
                                                    Previous
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleNextPage(users.next_page_url)}
                                                    disabled={!users.next_page_url}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
