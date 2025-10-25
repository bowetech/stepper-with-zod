import { CustomToast } from '@/components/custom-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Assuming you have Avatar components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardHeading, CardTitle, CardToolbar } from '@/components/ui/card';
import { Settings } from 'lucide-react';

// User data
const users = [
    {
        id: '1',
        name: 'Kathryn Campbell',
        availability: 'online',
        avatar: '1.png',
        status: 'active',
        email: 'kathryn@apple.com',
    },
    {
        id: '2',
        name: 'Robert Smith',
        availability: 'away',
        avatar: '2.png',
        status: 'inactive',
        email: 'robert@openai.com',
    },
    {
        id: '3',
        name: 'Sophia Johnson',
        availability: 'busy',
        avatar: '3.png',
        status: 'active',
        email: 'sophia@meta.com',
    },
    {
        id: '4',
        name: 'Lucas Walker',
        availability: 'offline',
        avatar: '4.png',
        status: 'inactive',
        flag: '🇦🇺',
        email: 'lucas@tesla.com',
    },
    {
        id: '5',
        name: 'Emily Davis',
        availability: 'online',
        avatar: '5.png',
        status: 'active',
        email: 'emily@sap.com',
    },
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Social Followings',
        href: '/social/followings',
    },
];

export default function Index(props: any) {
    console.log('Connect', props);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />

            <CustomToast />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-slate-100 p-4 text-gray-500 dark:bg-gray-950">
                <h1 className="mb-2 flex items-center text-xl font-normal md:text-xl">
                    <span>Followings </span>
                </h1>

                {/* Custom Modal Form Component */}
                <div className="mb-2 flex gap-2">
                    {/* Search Input */}
                    <div className="relative h-9 w-full md:w-1/3 md:shrink-0">...</div>

                    <div className="ml-auto inline-flex items-center gap-2"></div>
                </div>

                <div className="relative overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="flex flex-col border-b border-gray-200 py-3 md:flex-row md:items-center dark:border-gray-700">
                        <div className="flex flex-1 items-center">
                            <div className="md:ml-3">
                                <Tabs defaultValue="followers" className="w-[400px]">
                                    <TabsList>
                                        <TabsTrigger value="followers">Followers</TabsTrigger>
                                        <TabsTrigger value="following">Following</TabsTrigger>
                                        <TabsTrigger value="suggested">Suggested</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="followers">
                                        <Card className="w-[400px]" variant="accent">
                                            <CardHeader>
                                                <CardHeading>
                                                    <CardTitle>Followers</CardTitle>
                                                </CardHeading>
                                                <CardToolbar>
                                                    <Button mode="icon" variant="outline" size="sm">
                                                        <Settings />
                                                    </Button>
                                                </CardToolbar>
                                            </CardHeader>
                                            <CardContent className="py-1">
                                                {props.followers.data.map((user, index) => {
                                                    return (
                                                        <div
                                                            key={user.id}
                                                            className="flex items-center justify-between gap-2 border-b border-dashed py-2 last:border-none"
                                                        >
                                                            {/* Left: Avatar and User Info */}
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="size-8">
                                                                    <AvatarImage src={`/storage/${user.image}`} alt={user.name} />
                                                                    <AvatarFallback>SA</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <Link href="#" className="text-sm font-medium text-foreground hover:text-primary">
                                                                        {user.name}
                                                                    </Link>
                                                                    <div className="text-sm font-normal text-muted-foreground">{user.email}</div>
                                                                </div>
                                                            </div>

                                                            {user.following ? (
                                                                <Link
                                                                    as="button"
                                                                    method="delete"
                                                                    href={`/social/connect/${user.id}`}
                                                                    preserveScroll
                                                                    className="h-9 rounded-full bg-sky-500 px-4 text-sm font-bold text-white shadow ring-sky-200 hover:bg-sky-400 focus:ring-3 active:bg-sky-600 dark:text-gray-800 dark:ring-gray-600"
                                                                >
                                                                    Following
                                                                </Link>
                                                            ) : (
                                                                <Link
                                                                    as="button"
                                                                    method="post"
                                                                    href={`/social/connect/${user.id}`}
                                                                    preserveScroll
                                                                    className="h-9 rounded-full border border-sky-500 px-4 text-sm font-bold text-sky-500 shadow ring-sky-200 hover:bg-sky-100 focus:ring-3 active:bg-sky-200 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-sky-600"
                                                                >
                                                                    Follow back
                                                                </Link>
                                                            )}

                                                            {/* Right: Status Badge */}
                                                            {/* <Badge appearance="light" variant={user.active === 'active' ? 'primary' : 'secondary'}>
                                                                {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                                                            </Badge> */}
                                                        </div>
                                                    );
                                                })}
                                            </CardContent>
                                            <CardFooter className="justify-center">
                                                <Button mode="link" underlined="dashed">
                                                    <Link href="#">Learn more</Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </TabsContent>

                                    <TabsContent value="following">
                                        <Card className="w-[400px]" variant="accent">
                                            <CardHeader>
                                                <CardHeading>
                                                    <CardTitle>Following</CardTitle>
                                                </CardHeading>
                                                <CardToolbar>
                                                    <Button mode="icon" variant="outline" size="sm">
                                                        <Settings />
                                                    </Button>
                                                </CardToolbar>
                                            </CardHeader>
                                            <CardContent className="py-1">
                                                {props.followings.data.map((user, index) => {
                                                    return (
                                                        <div
                                                            key={user.id}
                                                            className="flex items-center justify-between gap-2 border-b border-dashed py-2 last:border-none"
                                                        >
                                                            {/* Left: Avatar and User Info */}
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="size-8">
                                                                    <AvatarImage src={`/storage/${user.image}`} alt={user.name} />
                                                                    <AvatarFallback>SA</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <Link href="#" className="text-sm font-medium text-foreground hover:text-primary">
                                                                        {user.name}
                                                                    </Link>
                                                                    <div className="text-sm font-normal text-muted-foreground">{user.email}</div>
                                                                </div>
                                                            </div>

                                                            {user.following ? (
                                                                <Link
                                                                    as="button"
                                                                    method="delete"
                                                                    href={`/social/connect/${user.id}`}
                                                                    preserveScroll
                                                                    className="h-9 rounded-full bg-sky-500 px-4 text-sm font-bold text-white shadow ring-sky-200 hover:bg-sky-400 focus:ring-3 active:bg-sky-600 dark:text-gray-800 dark:ring-gray-600"
                                                                >
                                                                    Following
                                                                </Link>
                                                            ) : (
                                                                <Link
                                                                    as="button"
                                                                    method="post"
                                                                    href={`/social/connect/${user.id}`}
                                                                    preserveScroll
                                                                    className="h-9 rounded-full border border-sky-500 px-4 text-sm font-bold text-sky-500 shadow ring-sky-200 hover:bg-sky-100 focus:ring-3 active:bg-sky-200 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-sky-600"
                                                                >
                                                                    Follow
                                                                </Link>
                                                            )}

                                                            {/* <Badge appearance="light" variant={user.active === 'active' ? 'primary' : 'secondary'}>
                                                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                            </Badge> */}
                                                        </div>
                                                    );
                                                })}
                                            </CardContent>
                                            <CardFooter className="justify-center">
                                                <Button mode="link" underlined="dashed">
                                                    <Link href="#">Learn more</Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </TabsContent>

                                    <TabsContent value="suggested">
                                        <Card className="w-[400px]" variant="accent">
                                            <CardHeader>
                                                <CardHeading>
                                                    <CardTitle>Suggested</CardTitle>
                                                </CardHeading>
                                                <CardToolbar>
                                                    <Button mode="icon" variant="outline" size="sm">
                                                        <Settings />
                                                    </Button>
                                                </CardToolbar>
                                            </CardHeader>
                                            <CardContent className="py-1">
                                                {props.suggested.data.map((user, index) => {
                                                    return (
                                                        <div
                                                            key={user.id}
                                                            className="flex items-center justify-between gap-2 border-b border-dashed py-2 last:border-none"
                                                        >
                                                            {/* Left: Avatar and User Info */}
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="size-8">
                                                                    <AvatarImage src={`/storage/${user.image}`} alt={user.name} />
                                                                    <AvatarFallback>SA</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <Link href="#" className="text-sm font-medium text-foreground hover:text-primary">
                                                                        {user.name}
                                                                    </Link>
                                                                    <div className="text-sm font-normal text-muted-foreground">{user.email}</div>
                                                                </div>
                                                            </div>

                                                            {user.following ? (
                                                                <Link
                                                                    as="button"
                                                                    method="delete"
                                                                    href={`/social/connect/${user.id}`}
                                                                    preserveScroll
                                                                    className="h-9 rounded-full bg-sky-500 px-4 text-sm font-bold text-white shadow ring-sky-200 hover:bg-sky-400 focus:ring-3 active:bg-sky-600 dark:text-gray-800 dark:ring-gray-600"
                                                                >
                                                                    Following
                                                                </Link>
                                                            ) : (
                                                                <Link
                                                                    as="button"
                                                                    method="post"
                                                                    href={`/social/connect/${user.id}`}
                                                                    preserveScroll
                                                                    className="h-9 rounded-full border border-sky-500 px-4 text-sm font-bold text-sky-500 shadow ring-sky-200 hover:bg-sky-100 focus:ring-3 active:bg-sky-200 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-sky-600"
                                                                >
                                                                    Follow
                                                                </Link>
                                                            )}

                                                            {/* <Badge appearance="light" variant={user.active === 'active' ? 'primary' : 'secondary'}>
                                                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                            </Badge> */}
                                                        </div>
                                                    );
                                                })}
                                            </CardContent>
                                            <CardFooter className="justify-center">
                                                <Button mode="link" underlined="dashed">
                                                    <Link href="#">Learn more</Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </TabsContent>
                                </Tabs>
                            </div>

                            <div className="ml-auto flex h-9 items-center pr-2 md:pr-3">
                                <div></div>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center border-t border-gray-200 px-2 pt-3 md:mt-0 md:hidden dark:border-gray-700"></div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
