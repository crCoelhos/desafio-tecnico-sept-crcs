import React from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";

import { TrashIcon, EditIcon } from "lucide-react";

import EditServiceSheet from "../edit-service-sheet/EditServiceSheet";
import { Service } from "@/types/service";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import AssignEmployeeToServiceSheet from "../assign-employee-to-service/AssignEmployeeToService";

interface ServiceActionButtonsProps {
  serviceId: number;
  service: Service;
  onDelete: (id: number) => void;
  onUpdate: (updatedService: Service) => void;
}

const ServiceActionButtons: React.FC<ServiceActionButtonsProps> = ({
  serviceId,
  service,
  onDelete,
  onUpdate,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http: //localhost:5000/services/${serviceId}`);
      onDelete(serviceId);
    } catch (error) {
      console.error("Erro ao excluir o serviço:", error);
    }
  };

  return (
    <div className="actionButtons">
      <Button onClick={handleDelete} variant="outline" className="removeButton">
        <TrashIcon /> Remover
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="editButton">
            <EditIcon /> Edigar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <EditServiceSheet service={service} onUpdate={onUpdate} />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <AssignEmployeeToServiceSheet
              service={service}
              onUpdate={onUpdate}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ServiceActionButtons;
