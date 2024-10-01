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
import { Service } from "@/types/service";
import SearchEmployeeInput from "../search-employee-input/SearchEmployeeInput";
import AddServiceSheet from "../add-service-sheet/AddServiceSheet";
import EditServiceSheet from "../edit-service-sheet/EditServiceSheet";
import AssignEmployeeToServiceSheet from "../assign-employee-to-service/AssignEmployeeToService";
import style from "./ServiceTable.module.scss";
import RemoveServiceButton from "../remove-service-button/RemoveServiceButton";
import { useToast } from "@/hooks/use-toast";

const calculateTotalValue = (items?: { quantity: number; value: number }[]) => {
  if (!items || items.length === 0) {
    return { totalValue: 0, quantityItems: 0 };
  }

  return items.reduce(
    (acc, item) => {
      acc.quantityItems += item.quantity;
      acc.totalValue += item.quantity * item.value;
      return acc;
    },
    { totalValue: 0, quantityItems: 0 }
  );
};

export const ServiceTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/services");
        const filteredServices = (response.data as Service[]).filter(
          (service) => service.status === "Aguardando"
        );
        setServices(filteredServices);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      }
    };

    fetchDeliveries();
  }, []);

  const filteredServices = services.filter((service) => {
    return (
      service.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.resale?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.attendanceNumber
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      service.sellerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.boxCode
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = filteredServices?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, services]);

  const handleUpdateService = async (updatedService: Service) => {
    try {
      const updatedServices = services.map((service) =>
        service.id === updatedService.id
          ? { ...service, ...updatedService }
          : service
      );

      const serviceToUpdate = updatedServices.find(
        (service) => service.id === updatedService.id
      );

      if (serviceToUpdate) {
        await axios.put(
          `http://localhost:5000/services/${updatedService.id}`,
          serviceToUpdate
        );

        setServices(updatedServices);
        toast({
          variant: "success",
          title: "Serviço ATUALIZADO!",
          description: `Serviço atualizado com sucesso.`,
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar o serviço:", error);
      toast({
        variant: "destructive",
        title: "Erro ao FINALIZAR o serviço!",
        description: `Ocorreu um erro ao tentar atualizar o serviço. Tente novamente.`,
      });
    }
  };

  return (
    <div className={style.cardContent}>
      <div className={style.upperTableSection}>
        <AddServiceSheet setServices={setServices} />

        <SearchEmployeeInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar Empresa, Revenda, Código..."
        />
      </div>

      <Table className={style.ServiceTable}>
        <TableHeader>
          <TableRow className={style.tableColumns}>
            <TableHead>ID</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Revenda</TableHead>
            <TableHead>Nº Atendimento</TableHead>
            <TableHead>Vendedor</TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Total Itens</TableHead>
            <TableHead>Valor Total (R$)</TableHead>
            <TableHead>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentServices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9}>Nenhum atendimento encontrado.</TableCell>
            </TableRow>
          ) : (
            currentServices.map((service) => {
              const { totalValue, quantityItems } = calculateTotalValue(
                service.items
              );

              return (
                <TableRow key={service.id}>
                  <TableCell>{service.id}</TableCell>
                  <TableCell>{service.companyName}</TableCell>
                  <TableCell>{service.resale}</TableCell>
                  <TableCell>{service.attendanceNumber}</TableCell>
                  <TableCell>{service.sellerName}</TableCell>
                  <TableCell>{service.boxCode}</TableCell>
                  <TableCell>{quantityItems}</TableCell>
                  <TableCell>{totalValue.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className={style.ActionButtons}>
                      <div className={style.firstActionButtonsRow}>
                        <EditServiceSheet
                          service={service}
                          onUpdate={handleUpdateService}
                        />
                        <RemoveServiceButton
                          serviceId={Number(service.id)}
                          onUpdate={(id) =>
                            setServices(
                              services.filter(
                                (service) => Number(service.id) !== id
                              )
                            )
                          }
                        />
                      </div>

                      <AssignEmployeeToServiceSheet
                        service={service}
                        onUpdate={handleUpdateService}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredServices?.length}
        paginate={paginate}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </div>
  );
};
