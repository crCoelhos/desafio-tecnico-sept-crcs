"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AllPurposeToastProps {
  variant: "default" | "destructive";
  title: string;
  description: string;
}

export function AllPurposeToast(props: AllPurposeToastProps) {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: props.variant,
          title: props.title,
          description: props.description,
        });
      }}
    >
      Show Toast
    </Button>
  );
}
