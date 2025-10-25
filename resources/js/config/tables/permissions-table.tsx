export const PermissionsTableConfig = {
    columns: [
        {
            label: 'Permission Name',
            key: 'label',
            className: 'px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase',
        },
        {
            label: 'Module',
            key: 'module',
            className: 'capitalize px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase',
        },
        {
            label: 'Description',
            key: 'description',
            className: 'w-90 px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase',
        },
        {
            label: 'Actions',
            key: 'actions',
            isAction: true,
            className: 'px-2 py-2 text-left text-xs tracking-wide whitespace-nowrap text-gray-500 uppercase',
        },
    ],
    actions: [
        {
            label: 'View',
            icon: 'Eye',
            className:
                'cursor-pointer bg-transparent hover:bg-transparent hover:text-primary-500 dark:hover:text-primary-500 inline-flex h-9 w-9 items-center justify-center text-gray-500 dark:text-gray-400',
            permission: 'view-permission',
        },
        {
            label: 'Edit',
            icon: 'PencilSquareIcon',

            className:
                'cursor-pointer bg-transparent hover:bg-transparent hover:text-primary-500 dark:hover:text-primary-500 inline-flex h-9 w-9 items-center justify-center text-gray-500 dark:text-gray-400',
            permission: 'edit-permission',
        },
        {
            label: 'Delete',
            icon: 'Trash2',
            route: 'permissions.destroy',
            className:
                'cursor-pointer bg-transparent hover:bg-transparent hover:text-primary-500 dark:hover:text-primary-500 inline-flex h-9 w-9 items-center justify-center text-gray-500 dark:text-gray-400',
            permission: 'delete-permission',
        },
    ],
};
