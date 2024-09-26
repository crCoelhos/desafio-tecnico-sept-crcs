import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Employee } from "@/types/employee";
import { Service } from "@/types/service";

interface AssignEmployeeToServiceSheetProps {
  service: Service;
  onUpdate: (updatedService: Service) => void;
}

const AssignEmployeeToServiceSheet: React.FC<
  AssignEmployeeToServiceSheetProps
> = ({ service, onUpdate }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employees");
        setEmployees(response.data as Employee[]);
      } catch (error) {
        console.error("Erro ao buscar entregadores:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleAssignEmployee = async () => {
    if (!selectedEmployeeId) return;

    const updatedService = {
      ...service,
      employeeId: selectedEmployeeId,
    };

    try {
      await axios.put(
        `http://localhost:5000/services/${service.id}`,
        updatedService
      );
      onUpdate(updatedService);
    } catch (error) {
      console.error("Erro ao designar entregador:", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Designar Entregador</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Designar Entregador</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="employee">Selecionar Entregador</Label>
          <select
            id="employee"
            value={selectedEmployeeId || ""}
            onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
            className="input"
          >
            <option value="">Selecione um entregador</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={handleAssignEmployee} className="mt-4">
          Atribuir Entregador
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default AssignEmployeeToServiceSheet;
