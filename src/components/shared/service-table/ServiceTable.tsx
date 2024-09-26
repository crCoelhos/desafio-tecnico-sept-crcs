/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ServiceTable.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "../delivery-pagination/DeliveryPagination";
import { Service } from "@/types/service";
import SearchEmployeeInput from "../search-employee-input/SearchEmployeeInput";
import AddServiceSheet from "../add-service-sheet/AddServiceSheet";
import ServiceActionButtons from "../service-action-buttons/ServiceActionButtons";

export const ServiceTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/services");
        setServices(response.data as Service[]);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      }
    };

    fetchDeliveries();
  }, []);

  const filteredServices = services.filter((service) => {
    return (
      (service.companyName &&
        service.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (service.resale &&
        service.resale.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (service.attendanceNumber &&
        service.attendanceNumber
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (service.sellerName &&
        service.sellerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (service.totalValue &&
        service.totalValue
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (service.quantityItems &&
        service.quantityItems
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (service.boxCode &&
        service.boxCode
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, services]);

  const handleDelete = (id: number) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== id)
    );
  };

  const handleUpdateEmployee = (updatedEmployee: Service) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === updatedEmployee.id ? updatedEmployee : service
      )
    );
    setSelectedService(null);
  };

  return (
    <div className="cardContent">
      <div id="upperTableSection">
        <SearchEmployeeInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar Empresa, Revenda, Código..."
        />
        <AddServiceSheet setServices={setServices} />
      </div>

      <Table className="ServiceTable">
        <TableHeader>
          <TableRow className="tableColumns">
            <TableHead>ID</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Revenda</TableHead>
            <TableHead>Nº Atendimento</TableHead>
            <TableHead>Vendedor</TableHead>
            <TableHead>Total (R$)</TableHead>
            <TableHead>Qnt</TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentServices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8}>Nenhum atendimento encontrado.</TableCell>
            </TableRow>
          ) : (
            currentServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.companyName}</TableCell>
                <TableCell>{service.resale}</TableCell>
                <TableCell>{service.attendanceNumber}</TableCell>
                <TableCell>{service.sellerName}</TableCell>
                <TableCell>{service.totalValue}</TableCell>
                <TableCell>{service.quantityItems}</TableCell>
                <TableCell>{service.boxCode}</TableCell>
                <TableCell>
                  <ServiceActionButtons
                    serviceId={service.id}
                    service={service}
                    onDelete={handleDelete}
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
        totalItems={filteredServices.length}
        paginate={paginate}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </div>
  );
};
