import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  Sheet,
} from "@/components/ui/sheet";
import { Service } from "@/types/service";
import { Dialog } from "@radix-ui/react-dialog";
import { MessageCircleWarningIcon } from "lucide-react";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import ObservationDescriptionCard from "../observation-description-card/ObservationDescriptionCard";
import axios from "axios";
import style from "./ObservationSheet.module.scss";

interface ObservationSheetProps {
  service: Service;
}

const ObservationSheet: React.FC<ObservationSheetProps> = (props) => {
  const [observation, setObservation] = useState<string>("");

  const handleSubmitObservation = async () => {
    try {
      const updatedService = { ...props.service, observation };
      await axios.put(
        `http://localhost:5000/services/${props.service.id}`,
        updatedService
      );
      console.log("Observação salva!");
    } catch (error) {
      console.error("Erro ao salvar observação:", error);
    }
  };
  return (
    <Dialog>
      <Sheet>
        <SheetTrigger asChild className={style.observationTrigger}>
          <MessageCircleWarningIcon size={24} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Adicionar observação</SheetTitle>
            <SheetDescription>
              Adicione uma observação sobre a entrega:
              <span className={style.sheetHeaderDescription}>
                {" "}
                {props.service.attendanceNumber}.
              </span>
              <ObservationDescriptionCard service={props.service} />
            </SheetDescription>
          </SheetHeader>

          <SheetDescription>
            <Textarea
              className={style.textArea}
              placeholder="Adicione uma observação"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            />
          </SheetDescription>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={handleSubmitObservation}>
                Salvar
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Dialog>
  );
};

export default ObservationSheet;
