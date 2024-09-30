import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MessageCircleWarningIcon } from "lucide-react";
import React from "react";

const ObservationPopover: React.FC = () => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <MessageCircleWarningIcon />
        </PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    </div>
  );
};

export default ObservationPopover;
