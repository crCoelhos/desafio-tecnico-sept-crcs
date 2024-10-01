import React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import style from "./RemoveServiceButton.module.scss";
import { useToast } from "@/hooks/use-toast";

interface RemoveServiceButtonProps {
  serviceId: number;
  onUpdate: (id: number) => void;
}

const RemoveServiceButton: React.FC<RemoveServiceButtonProps> = ({
  serviceId,
  onUpdate,
}) => {
  const { toast } = useToast();

  const handleCancel = async () => {
    try {
      await axios.put(`http://localhost:5000/services/${serviceId}`, {
        status: "Cancelado",
      });
      onUpdate(serviceId);
      toast({
        variant: "success",
        title: "Entrega CANCELADA!",
        description: `A entrega foi cancelada com sucesso.`,
      });
    } catch (error) {
      console.error("Error completing delivery:", error);
      toast({
        variant: "destructive",
        title: "Erro ao CANCELAR Entrega!",
        description: `Ocorreu um erro ao tentar canceladar a entrega. Tente novamente.`,
      });
    }
  };

  return (
    <Button
      onClick={handleCancel}
      variant="outline"
      className={style.removeButton}
    >
      Cancelar
    </Button>
  );
};

export default RemoveServiceButton;
