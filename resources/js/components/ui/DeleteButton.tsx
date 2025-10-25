import { TrashIcon } from '@heroicons/react/24/outline';

interface DeleteButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
}

export function DeleteButton({
  onClick,
  disabled = false,
  'aria-label': ariaLabel = 'Delete',
}: DeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="
        ring-primary-200
        hover:[&:not(:disabled)]:text-primary-500
        relative inline-flex h-9 w-9 cursor-pointer items-center justify-center
        rounded border border-transparent bg-transparent
        text-sm font-bold text-gray-500 focus:ring focus:outline-none
        disabled:cursor-not-allowed dark:text-gray-400 dark:ring-gray-600
      "
    >
      <TrashIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
