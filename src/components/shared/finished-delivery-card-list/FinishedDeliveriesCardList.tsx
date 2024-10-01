import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BikeIcon, CarIcon } from "lucide-react";
import { useDeliveryContext } from "@/context/DeliveryContext";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import styles from "./finishedDeliveriesCardList.module.scss";
import ObservationSheet from "../observation-sheet/ObservationSheet";
import { useToast } from "@/hooks/use-toast";

const FinishedDeliveriesCardList: React.FC = () => {
  const { globalServices, setGlobalServices, globalEmployees } =
    useDeliveryContext();
  const { toast } = useToast();

  const finishedDeliveries = globalServices.filter(
    (service) =>
      service.status === "Concluído" || service.status === "Cancelado"
  );

  const handleArchiveDelivery = async (deliveryId: number) => {
    try {
      const archivedServices = globalServices.map((service) =>
        service.id === deliveryId.toString()
          ? { ...service, status: "Arquivado" as const }
          : service
      );

      const updatedDelivery = archivedServices.find(
        (service) => service.id === deliveryId.toString()
      );
      if (updatedDelivery) {
        await axios.put(
          `http://localhost:5000/services/${deliveryId}`,
          updatedDelivery
        );
        setGlobalServices(archivedServices);

        toast({
          variant: "success",
          title: "Entrega Arquivada!",
          description: `A entrega ${updatedDelivery.attendanceNumber} foi arquivada com sucesso.`,
        });
      }
    } catch (error) {
      console.error("Error archiving delivery:", error);
      toast({
        variant: "destructive",
        title: "Erro ao Arquivar Entrega",
        description:
          "Ocorreu um erro ao tentar arquivar a entrega. Tente novamente.",
      });
    }
  };

  const getEmployeeName = (employeeId: number | undefined) => {
    const employee = globalEmployees.find((emp) => emp.id == employeeId);
    return employee ? employee.name : "Entregador não designado";
  };

  const getTransportType = (employeeId: number) => {
    const employee = globalEmployees.find((emp) => emp.id == employeeId);
    return employee ? employee.transportType : null;
  };

  return (
    <div className={styles.gridContainer}>
      {finishedDeliveries.map((delivery) => (
        <HoverCard key={delivery.id}>
          <HoverCardTrigger>
            <Card
              className={
                delivery.status === "Concluído"
                  ? styles.finishedCard
                  : styles.canceledCard
              }
            >
              <CardHeader>
                <CardTitle className={styles.cardHeader}>
                  <p>Atendimento #{delivery.attendanceNumber}</p>
                  <ObservationSheet service={delivery} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Entregador: {getEmployeeName(delivery.employeeId)}</p>
                <p>Endereço: {delivery.address}</p>
              </CardContent>
              <CardFooter className={styles.cardFooter}>
                <Button
                  onClick={() => handleArchiveDelivery(Number(delivery.id))}
                  variant="destructive"
                  className={styles.finishDeliveryButton}
                >
                  Arquivar Entrega
                </Button>
                {delivery.employeeId &&
                  (getTransportType(delivery.employeeId) === "Carro" ? (
                    <CarIcon />
                  ) : (
                    <BikeIcon />
                  ))}
              </CardFooter>
            </Card>
          </HoverCardTrigger>
          <HoverCardContent className={styles.hoverCardContent}>
            <h2>Detalhes da entrega:</h2>
            <p>Entregador: {getEmployeeName(delivery.employeeId)}</p>
            <p>Endereço: {delivery.address}</p>
            <p>Quantidade: {delivery.quantityItems}</p>
            <p>Valor total: R$ {delivery.totalValue}</p>

            <div>
              <p>Situação: {delivery.status}</p>
              <p>Duração da viagem: {delivery.tripDuration} </p>
            </div>
            <p>
              Observação: {delivery.observation ? delivery.observation : "N/A"}
            </p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};

export default FinishedDeliveriesCardList;
