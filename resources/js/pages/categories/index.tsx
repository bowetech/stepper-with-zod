import { CustomModalForm } from '@/components/custom-modal-form';
import { CustomTable } from '@/components/custom-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CategoryModalFormConfig } from '@/config/forms/category-modal-form';
import { CategoryTableConfig } from '@/config/tables/category-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Categories',
        href: '/categories',
    },
];

interface LinkProps {
    active: boolean;
    label: string;
    url: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    featured_image: string;
    featured_image_original_name: string;
    created_at: string;
}

interface CategoryPagination {
    data: Product[];
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
}

interface FilterProps {
    search: string;
    perPage: string;
}

interface IndexProps {
    categories: CategoryPagination;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
}

interface FlashProps extends Record<string, any> {
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Index({ categories }: IndexProps) {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success || flash?.error;

    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState<'create' | 'view' | 'edit'>('create');

    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { data, setData, errors, processing, reset, post } = useForm({
        name: '',
        description: '',
        image: null as File | null,
        _method: 'POST',
    });

    // Handle Delete
    const handleDelete = (route: string) => {
        if (confirm('Are you sure, you want to delete?')) {
            router.delete(route, {
                preserveScroll: true,
                onSuccess: (response: { props: FlashProps }) => {
                    const successMessage = response.props.flash?.success || 'Category deleted successfully.';
                    toast.success(successMessage);
                    closeModal();
                },
                onError: (error: Record<string, string>) => {
                    const errorMessage = error?.message || 'Failed to delete category.';
                    toast.error(errorMessage);
                    closeModal();
                },
            });
        }
    };

    // Handle Submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Edit mode
        if (mode === 'edit' && selectedCategory) {
            data._method = 'PUT';

            post(route('categories.update', selectedCategory.id), {
                forceFormData: true,
                onSuccess: (response: { props: FlashProps }) => {
                    const successMessage = response.props.flash?.success || 'Category updated successfully.';
                    toast.success(successMessage);
                    closeModal();
                },
                onError: (error: Record<string, string>) => {
                    const errorMessage = error?.message || 'Failed to update category.';
                    toast.error(errorMessage);
                },
            });
        } else {
            post(route('categories.store'), {
                onSuccess: (response: { props: FlashProps }) => {
                    const successMessage = response.props.flash?.success || 'Category created successfully.';
                    toast.success(successMessage);
                    closeModal();
                },
                onError: (error: Record<string, string>) => {
                    const errorMessage = error?.message || 'Failed to create category.';
                    toast.error(errorMessage);
                },
            });
        }
    };

    // Closing modal
    const closeModal = () => {
        setMode('create');
        setPreviewImage(null);
        setSelectedCategory(null);
        reset();
        setModalOpen(false);
    };

    // Handle Modal Toggle
    const handleModalToggle = (open: boolean) => {
        setModalOpen(open);

        if (!open) {
            setMode('create');
            setPreviewImage(null);
            setSelectedCategory(null);
            reset();
        }
    };

    // Open Modal
    const openModal = (mode: 'create' | 'view' | 'edit', category?: any) => {
        setMode(mode);

        if (category) {
            Object.entries(category).forEach(([key, value]) => {
                if (key !== 'image') {
                    setData(key as keyof typeof data, value as string | null);
                }
            });

            // Setting image preview
            setPreviewImage(category.image);
            setSelectedCategory(category);
        } else {
            reset();
        }

        setModalOpen(true);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories Management" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-slate-100 p-4 text-gray-500 dark:bg-gray-950">
                <h1 className="mb-2 flex items-center text-xl font-normal md:text-xl">
                    <span>Permissions </span>
                </h1>

                {/* Custom Modal Form Component */}
                <div className="mb-2 flex gap-2">
                    {/* Search Input */}
                    <div className="relative h-9 w-full md:w-1/3 md:shrink-0">...</div>

                    <div className="ml-auto inline-flex items-center gap-2">
                        <div className="shrink-0">
                            <CustomModalForm
                                addButton={CategoryModalFormConfig.addButton}
                                title={mode === 'view' ? 'View Category' : mode === 'edit' ? 'Update Category' : CategoryModalFormConfig.title}
                                description={CategoryModalFormConfig.description}
                                fields={CategoryModalFormConfig.fields}
                                buttons={CategoryModalFormConfig.buttons}
                                data={data}
                                setData={setData}
                                errors={errors}
                                processing={processing}
                                handleSubmit={handleSubmit}
                                open={modalOpen}
                                onOpenChange={handleModalToggle}
                                mode={mode}
                                previewImage={previewImage}
                            />
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="flex flex-col border-b border-gray-200 py-3 md:flex-row md:items-center dark:border-gray-700">
                        <div className="flex flex-1 items-center">
                            <div className="md:ml-3">
                                <div className="flex items-center">
                                    <Checkbox
                                        // checked={selectAll}
                                        // onCheckedChange={toggleSelectAll}
                                        aria-label="Select all"
                                        className="relative ml-2 inline-flex h-4 w-4 items-center justify-center rounded border border-gray-950/20 bg-white text-white ring-sky-500 ring-offset-2 focus:ring-3 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 group-data-[focus]:dark:ring-offset-gray-950"
                                    />
                                    <Button
                                        type="button"
                                        className="flex items-center gap-0 bg-white px-2 text-gray-800 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-700"
                                    >
                                        {'selectedUsers'.length > 0 && (
                                            <span className="px-0 font-bold text-sky-500">
                                                {/* {selectedUsers.length} <span className="font-medium">selected</span> */}
                                            </span>
                                        )}
                                        <span className="px-1">
                                            <ChevronDownIcon className="h-4 w-4" />
                                        </span>
                                    </Button>
                                </div>
                            </div>

                            <div className="ml-auto flex h-9 items-center pr-2 md:pr-3">
                                {'selectedUsers'.length > 0 && (
                                    <div className="px-5">
                                        <div className="relative flex max-w-[6rem]">
                                            {/* <ActionSelect onAction={(selection) => handleAction(selection)} /> */}
                                        </div>
                                    </div>
                                )}
                                <div></div>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center border-t border-gray-200 px-2 pt-3 md:mt-0 md:hidden dark:border-gray-700"></div>
                    </div>
                    {/* Custom Table component */}
                    <CustomTable
                        columns={CategoryTableConfig.columns}
                        actions={CategoryTableConfig.actions}
                        data={categories.data}
                        from={categories.from}
                        onDelete={handleDelete}
                        onView={(category) => openModal('view', category)}
                        onEdit={(category) => openModal('edit', category)}
                        isModal={true}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
