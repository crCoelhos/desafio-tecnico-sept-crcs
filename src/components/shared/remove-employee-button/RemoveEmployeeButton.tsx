import React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

import "./RemoveEmployeeButton.scss";
import { TrashIcon } from "lucide-react";

interface RemoveEmployeeButtonProps {
  deliveryCPF: string;
  onDelete: (cpf: string) => void;
}

const RemoveEmployeeButton: React.FC<RemoveEmployeeButtonProps> = ({
  deliveryCPF,
  onDelete,
}) => {
  const handleDelete = async () => {
    try {
      const response = await axios.get<{ id: string; CPF: string }[]>(
        "http://localhost:5000/deliveries"
      );
      const deliveryToDelete = response.data.find(
        (delivery) => delivery.CPF === deliveryCPF
      );

      if (deliveryToDelete) {
        await axios.delete(
          `http://localhost:5000/deliveries/${deliveryToDelete.id}`
        );
        onDelete(deliveryCPF);
      }
    } catch (error) {
      console.error("Erro ao excluir a entrega:", error);
    }
  };

  return (
    <Button onClick={handleDelete} variant="outline" className="removeButton">
      <TrashIcon></TrashIcon>Remover
    </Button>
  );
};

export default RemoveEmployeeButton;
