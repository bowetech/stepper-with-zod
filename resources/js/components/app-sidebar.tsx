import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, CalendarDays, LayoutGrid, List, Lock, MessageCircleCode, ShieldCheck, Tag, UsersRound } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },

    {
        title: 'My Listings',
        href: '/categories',
        icon: List,
    },

    {
        title: 'Bookings',
        href: '/categories',
        icon: CalendarDays,
    },

    {
        title: 'Reviews',
        href: '/categories',
        icon: MessageCircleCode,
    },

    {
        title: 'Social Connect',
        href: '/social/connect',
        icon: UsersRound,
    },

    {
        title: 'Manage Categories',
        href: '/categories',
        icon: Tag,
    },

    {
        title: 'Users',
        href: '/admin/users',
        icon: BookOpen,
    },
    {
        title: 'Roles',
        href: '/roles',
        icon: ShieldCheck,
    },
    {
        title: 'Permissions',
        href: '/permissions',
        icon: Lock,
        permission: 'access-permissions-module',
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const roles = auth.roles;
    const permissions = auth.permissions;

    const filteredNavitems = mainNavItems.filter((item) => !item.permission || permissions.includes(item.permission));

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavitems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
