import { CirclePlus } from 'lucide-react';

export const PermissionModalFormConfig = {
    moduleTitle: 'Manage Permissions',
    title: 'Create Permission',
    description: 'Fill in the details below to create a new permission.',
    addButton: {
        id: 'add-permission',
        label: 'Add Permission',
        className:
            'inline-flex h-9 shrink-0 items-center rounded bg-sky-500 px-4 text-sm font-bold text-white shadow ring-sky-200 hover:bg-sky-400 focus:ring-3 active:bg-sky-600 dark:text-gray-800 dark:ring-gray-600',
        icon: CirclePlus,
        type: 'button',
        variant: 'default',
        permission: 'create-permission',
    },
    fields: [
        {
            id: 'module',
            key: 'module',
            name: 'module',
            label: 'Module Name',
            type: 'single-select',
            placeholder: 'Enter module name',
            tabIndex: 1,
            autoFocus: true,
            options: [
                { label: 'Categories', value: 'categories', key: 'categories' },
                { label: 'Products', value: 'products', key: 'products' },
                { label: 'Permissions', value: 'permissions', key: 'permissions' },
                { label: 'Roles', value: 'roles', key: 'roles' },
                { label: 'Users', value: 'users', key: 'users' },
            ],
        },
        {
            id: 'permission-label',
            key: 'label',
            name: 'label',
            label: 'Permission Label',
            type: 'text',
            placeholder: 'Enter permission label (ex. Create user)',
            autocomplete: 'label',
            tabIndex: 2,
        },
        {
            id: 'description',
            key: 'description',
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Enter permission description',
            autocomplete: 'description',
            tabIndex: 2,
            rows: 2,
            className: 'rounded border p-2 w-full',
        },
    ],
    buttons: [
        {
            key: 'cancel',
            type: 'button',
            label: 'Cancel',
            variant: 'ghost',
            className: 'cursor-pointer',
        },
        {
            key: 'submit',
            type: 'submit',
            label: 'Save Permission',
            variant: 'default',
            className: 'cursor-pointer',
        },
    ],
};
