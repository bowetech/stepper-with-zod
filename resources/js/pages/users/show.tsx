import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Register User',
        href: route('users.create'),
    },
];

interface UserDataType {
    id: number;
    name: string;
    email: string;
    password: string;
    image: File | null;
    active: string;
    role: string;
}

type UserFormValues = {
    name: string;
    email: string;
    password: string;
    image: File | null;
    active: string;
    role?: any;
    userRole?: string;
};

interface Role {
    id: number;
    name: string;
    label: string;
    description: string;
}

interface RoleProps {
    roles: Role[];
    [key: string]: any;
}

export default function Show({ userData }: { userData: UserDataType }) {
    console.log(userData);
    //const { userData } = usePage<RoleProps>().props;

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
                        <div className="shrink-0">
                            <Link
                                className="inline-flex h-9 shrink-0 items-center rounded bg-sky-500 px-4 text-sm font-bold text-white shadow ring-sky-200 hover:bg-sky-400 focus:ring-3 active:bg-sky-600 dark:text-gray-800 dark:ring-gray-600"
                                as="button"
                                href={route('users.home')}
                            >
                                <span className="hidden md:inline-block">Back</span>
                                <span className="inline-block md:hidden">Back</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <Card>
                        <CardContent>
                            <form>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <Label className="text-slate-500" htmlFor="name">
                                            Name
                                        </Label>
                                        <Input type="text" id="name" placeholder="Full name" value={userData.name} />
                                    </div>

                                    <div className="col-span-2">
                                        <Label className="text-slate-500" htmlFor="email">
                                            Email
                                        </Label>
                                        <Input type="email" id="email" placeholder="email@example.com" value={userData.email} />
                                    </div>

                                    <div className="col-span-2">
                                        <Label className="text-slate-500" htmlFor="password">
                                            Password
                                        </Label>
                                        <Input type="password" id="password" placeholder="Password" value={userData.password} />
                                    </div>

                                    <div className="col-span-2 md:col-span-0">
                                        <Label className="text-slate-500" htmlFor="name">
                                            Status
                                        </Label>
                                        <Select value={userData.active == '1' ? '1' : '0'}>
                                            <SelectTrigger id="status">
                                                <SelectValue>{userData.active == '1' ? 'Active' : 'Inactive'} </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1"> Active</SelectItem>
                                                <SelectItem value="0"> Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="col-span-2 md:col-span-0">
                                        <Label className="text-slate-500" htmlFor="roles">
                                            Roles
                                        </Label>
                                        <Select disabled value={userData.role}>
                                            <SelectTrigger id="roles">
                                                <SelectValue placeholder="Select Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {userData.roles.map((role: Role) => (
                                                    <SelectItem key={role.id} value={role.name}>
                                                        {role.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="mt-4">
                                        <Label className="text-slate-500" htmlFor="image">
                                            Select Image
                                        </Label>
                                        <Input type="file" id="image" />

                                        {/* {data.image && (
                                            <img src={URL.createObjectURL(data.image)} alt="Preview" className="mt-2 w-32 rounded-lg object-cover" />
                                        )} */}

                                        {userData.image && (
                                            <img src={`/storage/${userData.image}`} alt="Preview" className="mt-2 w-32 rounded-lg object-cover" />
                                        )}
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
