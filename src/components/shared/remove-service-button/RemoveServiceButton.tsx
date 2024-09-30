import React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
// import { TrashIcon } from "lucide-react";

import style from "./RemoveServiceButton.module.scss";

interface RemoveServiceButtonProps {
  serviceId: number;
  onDelete: (id: number) => void;
}

const RemoveServiceButton: React.FC<RemoveServiceButtonProps> = ({
  serviceId,
  onDelete,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/services/${serviceId}`);
      onDelete(serviceId);
    } catch (error) {
      console.error("Erro ao excluir o serviço:", error);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      variant="outline"
      className={style.removeButton}
    >
      {/* <TrashIcon /> */}
      Cancelar
    </Button>
  );
};

export default RemoveServiceButton;
