import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Dialog } from "@radix-ui/react-dialog";
import { MessageCircleWarningIcon, Sheet } from "lucide-react";
import React from "react";

const ObservationSheet: React.FC = () => {
  return (
    <Dialog>
      <Sheet>
        <SheetTrigger asChild>
          <MessageCircleWarningIcon />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Adicionar observação</SheetTitle>
            <SheetDescription>
              Adicione uma observação sobre a entrega.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Salvar</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Dialog>
  );
};

export default ObservationSheet;
