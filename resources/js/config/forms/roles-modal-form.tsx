import { CirclePlus } from 'lucide-react';

export const RolesModalFormConfig = {
    moduleTitle: 'Manage Roles',
    title: 'Create Role',
    description: 'Fill in the details below to create a new role.',
    addButton: {
        id: 'add-role',
        label: 'Add Role',
        className:
            'inline-flex h-9 shrink-0 items-center rounded bg-sky-500 px-4 text-sm font-bold text-white shadow ring-sky-200 hover:bg-sky-400 focus:ring-3 active:bg-sky-600 dark:text-gray-800 dark:ring-gray-600',
        icon: CirclePlus,
        type: 'button',
        variant: 'default',
        permission: 'create-role',
    },
    fields: [
        {
            id: 'role-label',
            key: 'label',
            name: 'label',
            label: 'Role Label (ex. Super Admin User',
            type: 'text',
            placeholder: 'Enter role label',
            autocomplete: 'label',
            tabIndex: 1,
        },
        {
            id: 'description',
            key: 'description',
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Enter role description',
            autocomplete: 'description',
            tabIndex: 2,
            rows: 2,
            className: 'rounded border p-2 w-full',
        },
        {
            id: 'permissions',
            key: 'permissions',
            name: 'permissions[]',
            label: 'Permissions ',
            type: 'grouped-checkboxes',
            tabIndex: 3,
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
            label: 'Save Role',
            variant: 'default',
            className: 'cursor-pointer',
        },
    ],
};
