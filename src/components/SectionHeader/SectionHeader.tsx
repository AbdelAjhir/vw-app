import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  title: string;
  description: string;
  onAddClick: () => void;
  addButtonText?: string;
}

const SectionHeader = ({
  title,
  description,
  onAddClick,
  addButtonText = "Add Movie",
}: SectionHeaderProps) => (
  <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
    <div>
      <h1 className="text-3xl font-bold dark:text-white">{title}</h1>
      <p className="text-muted-foreground mt-2">{description}</p>
    </div>
    <Button
      className="flex w-full items-center gap-2 sm:w-fit"
      onClick={onAddClick}
    >
      <Plus className="h-4 w-4" />
      {addButtonText}
    </Button>
  </div>
);

export default SectionHeader;
