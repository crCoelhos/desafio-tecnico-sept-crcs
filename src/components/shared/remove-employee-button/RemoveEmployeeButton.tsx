import React from "react";
import axios from "axios";

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
    <button onClick={handleDelete} className="removeEmployeeButton">
      Excluir
    </button>
  );
};

export default RemoveEmployeeButton;
