import React, { useState } from "react";
import axios from "axios";
import { Employee } from "../../../types/employee";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./AddEmployeeButton.scss";

interface AddEmployeeSheetProps {
  setDeliveries: React.Dispatch<React.SetStateAction<Employee[]>>;
}

const AddEmployeeSheet: React.FC<AddEmployeeSheetProps> = ({
  setDeliveries,
}) => {
  const [name, setName] = useState("");
  const [CPF, setCPF] = useState("");
  const [transportType, setTransportType] = useState("");
  const [retailName, setRetailName] = useState("");

  const getNextId = async () => {
    try {
      const response = await axios.get("http://localhost:5000/deliveries");
      const deliveries: Employee[] = response.data as Employee[];
      return deliveries.length;
    } catch (error) {
      console.error("Error fetching deliveries:", error);
      return 0;
    }
  };

  const handleAddEmployee = async () => {
    const nextId = await getNextId();

    const newEmployee = {
      id: nextId,
      name,
      CPF,
      transportType,
      retailName,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/deliveries",
        newEmployee
      );

      if (response.status === 201) {
        setDeliveries((prevDeliveries) => [...prevDeliveries, newEmployee]);
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" id="addEmployeeButton">
          <PlusIcon /> Adicionar entregador
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar Entregador</SheetTitle>
          <SheetDescription>
            Preencha as informações do novo entregador abaixo.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cpf" className="text-right">
              CPF
            </Label>
            <Input
              id="cpf"
              value={CPF}
              onChange={(e) => setCPF(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="transportType" className="text-right">
              Tipo de Transporte
            </Label>
            <Input
              id="transportType"
              value={transportType}
              onChange={(e) => setTransportType(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="retailName" className="text-right">
              Nome do Comércio
            </Label>
            <Input
              id="retailName"
              value={retailName}
              onChange={(e) => setRetailName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleAddEmployee}>Salvar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddEmployeeSheet;
