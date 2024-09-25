/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DeliveryTable.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddEmployeeButton from "../add-employee-button/AddEmployeeSheet";
import Pagination from "../delivery-pagination/DeliveryPagination";
import RemoveEmployeeButton from "../remove-employee-button/RemoveEmployeeButton";
import SearchEmployeeInput from "../search-employee-input/SearchEmployeeInput";
import EditEmployeeSheet from "../edit-employee-sheet/EditEmployeeSheet";
import { Employee } from "@/types/employee";
import AddEmployeeSheet from "../add-employee-button/AddEmployeeSheet";

const DeliveryTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [deliveries, setDeliveries] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/deliveries");
        setDeliveries(response.data as Employee[]);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      }
    };

    fetchDeliveries();
  }, []);

  const filteredDeliveries = deliveries.filter((delivery) => {
    return (
      delivery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.CPF.includes(searchTerm) ||
      delivery.transportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.retailName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDeliveries = filteredDeliveries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, deliveries]);

  const handleDelete = (cpf: string) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.filter((delivery) => delivery.CPF !== cpf)
    );
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.CPF === updatedEmployee.CPF ? updatedEmployee : delivery
      )
    );
    setSelectedEmployee(null);
  };
  return (
    <div className="cardContent">
      <div id="upperTableSection">
        <SearchEmployeeInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome, CPF, transporte..."
        />
        <AddEmployeeSheet setDeliveries={setDeliveries} />
      </div>

      <Table className="EmployeeTable">
        <TableHeader>
          <TableRow className="tableColumns">
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Transporte</TableHead>
            <TableHead>Revendedor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentDeliveries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>Nenhuma entrega encontrada.</TableCell>
            </TableRow>
          ) : (
            currentDeliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell>{delivery.id}</TableCell>
                <TableCell>{delivery.name}</TableCell>
                <TableCell>{delivery.CPF}</TableCell>
                <TableCell>{delivery.transportType}</TableCell>
                <TableCell>{delivery.retailName}</TableCell>
                <TableCell>
                  <RemoveEmployeeButton
                    deliveryCPF={delivery.CPF}
                    onDelete={handleDelete}
                  />
                  <EditEmployeeSheet
                    employee={delivery}
                    onUpdate={handleUpdateEmployee}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredDeliveries.length}
        paginate={paginate}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </div>
  );
};

export default DeliveryTable;
