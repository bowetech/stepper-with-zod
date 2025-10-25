import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@radix-ui/react-select";
import { FunnelIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export function FilterSelector() {
  return (
    <Select>
      <SelectTrigger
        className="ring-primary-200 inline-flex h-9 cursor-pointer appearance-none items-center justify-center 
                   rounded border border-transparent bg-transparent px-1.5 text-left text-sm font-bold text-gray-600 
                   focus:ring focus:outline-none disabled:cursor-not-allowed dark:text-gray-400 dark:ring-gray-600 
                   hover:[&:not(:disabled)]:bg-gray-700/5 dark:hover:[&:not(:disabled)]:bg-gray-950"
      >
        <span className="flex items-center gap-1">
          <FunnelIcon className="size-6" />
          <ChevronDownIcon className="size-4" />
        </span>
        <SelectValue placeholder="Default" />
      </SelectTrigger>

      <SelectContent className="z-50 bg-white">
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="mono">Mono</SelectItem>
      </SelectContent>
    </Select>
  );
}
  