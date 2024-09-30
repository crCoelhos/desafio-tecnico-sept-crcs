import React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
// import { TrashIcon } from "lucide-react";

import style from "./RemoveServiceButton.module.scss";

interface RemoveServiceButtonProps {
  serviceId: number;
  onUpdate: (id: number) => void;
}

const RemoveServiceButton: React.FC<RemoveServiceButtonProps> = ({
  serviceId,
  onUpdate,
}) => {
  const handleCancel = async () => {
    try {
      await axios.put(`http://localhost:5000/services/${serviceId}`, {
        status: "Cancelado",
      });
      onUpdate(serviceId);
    } catch (error) {
      console.error("Erro ao cancelar o serviço:", error);
    }
  };

  return (
    <Button
      onClick={handleCancel}
      variant="outline"
      className={style.removeButton}
    >
      {/* <TrashIcon /> */}
      Cancelar
    </Button>
  );
};

export default RemoveServiceButton;
