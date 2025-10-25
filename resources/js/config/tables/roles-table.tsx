export const RolesTableConfig = {
    columns: [
        {
            label: 'Role Name',
            key: 'label',
            className: 'border-b px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase',
        },
        {
            label: 'Description',
            key: 'description',
            className: ' border-b w-10 px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase',
        },
        {
            label: 'Permissions',
            key: 'permissions',
            className: 'border-b px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase',
            type: 'multi-values',
        },
        {
            label: 'Actions',
            key: 'actions',
            isAction: true,
            className: 'border-b px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase',
        },
    ],
    actions: [
        {
            label: 'View',
            icon: 'Eye',
            className:
                'cursor-pointer bg-transparent hover:bg-transparent hover:text-primary-500 dark:hover:text-primary-500 inline-flex h-9 w-9 items-center justify-center text-gray-500 dark:text-gray-400',
            permission: 'view-role',
        },
        {
            label: 'Edit',
            icon: 'Pencil',
            className:
                'cursor-pointer bg-transparent hover:bg-transparent hover:text-primary-500 dark:hover:text-primary-500 inline-flex h-9 w-9 items-center justify-center text-gray-500 dark:text-gray-400',
            permission: 'edit-role',
        },
        {
            label: 'Delete',
            icon: 'Trash2',
            route: 'roles.destroy',
            className:
                '  cursor-pointer bg-transparent hover:bg-transparent hover:text-primary-500 dark:hover:text-primary-500 inline-flex h-9 w-9 items-center justify-center text-gray-500 dark:text-gray-400',
            permission: 'delete-role',
        },
    ],
};
