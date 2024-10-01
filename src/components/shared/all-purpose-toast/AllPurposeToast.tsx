"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AllPurposeToastProps {
  variant: "default" | "destructive" | "error" | "info" | "success" | "warning";
  title: string;
  description: string;
}

export function AllPurposeToast(props: AllPurposeToastProps) {
  const { toast } = useToast();

  return (
    <Button
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
