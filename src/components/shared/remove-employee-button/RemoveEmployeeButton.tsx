import React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

import style from "./RemoveEmployeeButton.module.scss";
import { TrashIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RemoveEmployeeButtonProps {
  deliveryCPF: string;
  onDelete: (cpf: string) => void;
}

const RemoveEmployeeButton: React.FC<RemoveEmployeeButtonProps> = ({
  deliveryCPF,
  onDelete,
}) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const response = await axios.get<{ id: string; CPF: string }[]>(
        "http://localhost:5000/employees"
      );
      const deliveryToDelete = response.data.find(
        (delivery) => delivery.CPF === deliveryCPF
      );

      if (deliveryToDelete) {
        await axios.delete(
          `http://localhost:5000/employees/${deliveryToDelete.id}`
        );
        onDelete(deliveryCPF);
      }
      toast({
        variant: "success",
        title: "Colaborador REMOVIDO!",
        description: `O colaborador foi removido com sucesso.`,
      });
    } catch (error) {
      console.error("Erro ao excluir o colaborador:", error);
      toast({
        variant: "destructive",
        title: "Erro ao REMOVER Colaborador!",
        description: `Ocorreu um erro ao tentar remover o colaborador. Tente novamente.`,
      });
    }
  };

  return (
    <Button
      onClick={handleDelete}
      variant="default"
      className={style.removeButton}
    >
      <TrashIcon></TrashIcon>
    </Button>
  );
};

export default RemoveEmployeeButton;
