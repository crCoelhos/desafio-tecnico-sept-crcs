/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "../pagination/Pagination";
import RemoveEmployeeButton from "../remove-employee-button/RemoveEmployeeButton";
import SearchEmployeeInput from "../search-employee-input/SearchEmployeeInput";
import EditEmployeeSheet from "../edit-employee-sheet/EditEmployeeSheet";
import { Employee } from "@/types/employee";
import AddEmployeeSheet from "../add-employee-sheet/AddEmployeeSheet";

import style from "./EmployeeTable.module.scss";

const EmployeeCardTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employees");
        setEmployees(response.data as Employee[]);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchDeliveries();
  }, []);

  const filteredDeliveries = employees.filter((employee) => {
    return (
      (employee.name &&
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employee.CPF && employee.CPF.includes(searchTerm)) ||
      (employee.transportType &&
        employee.transportType
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (employee.retailName &&
        employee.retailName.toLowerCase().includes(searchTerm.toLowerCase()))
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
  }, [searchTerm, employees]);

  const handleDelete = (cpf: string) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.CPF !== cpf)
    );
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.CPF === updatedEmployee.CPF ? updatedEmployee : employee
      )
    );
    setSelectedEmployee(null);
  };
  return (
    <div className={style.cardContent}>
      <div className={style.upperTableSection}>
        <AddEmployeeSheet setDeliveries={setEmployees} />
        <SearchEmployeeInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome, CPF, transporte..."
        />
      </div>

      <Table className={style.employeeTable}>
        <TableHeader>
          <TableRow className={style.tableColumns}>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Transporte</TableHead>
            <TableHead>Revendedor</TableHead>
            <TableHead>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentDeliveries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>Nenhum entregador encontrado.</TableCell>
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

export default EmployeeCardTable;
