import { CirclePlus } from 'lucide-react';

export const CategoryModalFormConfig = {
    moduleTitle: 'Manage Categories',
    title: 'Create Category',
    description: 'Fill in the details below to create a new category.',
    addButton: {
        id: 'add-category',
        label: 'Add Category',
        className:
            'inline-flex h-9 shrink-0 items-center rounded bg-sky-500 px-4 text-sm font-bold text-white shadow ring-sky-200 hover:bg-sky-400 focus:ring-3 active:bg-sky-600 dark:text-gray-800 dark:ring-gray-600',
        icon: CirclePlus,
        type: 'button',
        variant: 'default',
        permission: 'create-category',
    },
    fields: [
        {
            id: 'category-name',
            key: 'name',
            name: 'name',
            label: 'Category Name',
            type: 'text',
            placeholder: 'Enter category name',
            autocomplete: 'name',
            tabIndex: 1,
            autoFocus: true,
        },
        {
            id: 'category-description',
            key: 'description',
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Enter category description',
            autocomplete: 'description',
            tabIndex: 2,
            rows: 3,
            className: 'rounded border p-2 w-full',
        },
        {
            id: 'category-image',
            key: 'image',
            name: 'image',
            label: 'Image (optional)',
            type: 'file',
            accept: 'image/*',
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
            label: 'Save Category',
            variant: 'default',
            className:
                'cursor-pointer inline-flex h-9 shrink-0 items-center rounded bg-sky-500 px-4 text-sm font-bold text-white shadow ring-sky-200 hover:bg-sky-400 focus:ring-3 active:bg-sky-600 dark:text-gray-800 dark:ring-gray-600',
        },
    ],
};
