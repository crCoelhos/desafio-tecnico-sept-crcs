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
import styles from "./finisheddeliveriescardlist.module.scss";
import { useDeliveryContext } from "@/context/DeliveryContext";

// #TODO: indicator on the card to show how long the delivery took to be completed
// #TODO: hover effect on the card to show the delivery details
// plus a somekind of mechanism to make observations about the trip 

const FinishedDeliveriesCardList: React.FC = () => {
  const { globalServices, setGlobalServices, globalEmployees } =
    useDeliveryContext();

  const finishedDeliveries = globalServices.filter(
    (service) => service.status === "Concluído"
  );

  const handleArchiveDelivery = async (deliveryId: number) => {
    try {
      const archivedServices = globalServices.map((service) =>
        service.id === deliveryId
          ? { ...service, status: "Arquivado" as const }
          : service
      );

      const updatedDelivery = archivedServices.find(
        (service) => service.id === deliveryId
      );
      if (updatedDelivery) {
        await axios.put(
          `http://localhost:5000/services/${deliveryId}`,
          updatedDelivery
        );
        setGlobalServices(archivedServices);
      }
    } catch (error) {
      console.error("Error archiving delivery:", error);
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
        <Card key={delivery.id} className={styles.card}>
          <CardHeader>
            <CardTitle>Atendimento #{delivery.attendanceNumber}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Entregador: {getEmployeeName(delivery.employeeId)}</p>
            <p>Endereço: {delivery.address}</p>
          </CardContent>
          <CardFooter className={styles.cardFooter}>
            <Button
              onClick={() => handleArchiveDelivery(delivery.id)}
              variant="destructive"
              className={styles.finishDeliveryButton}
            >
              Arquivar Entrega
            </Button>
            {delivery.employeeId &&
              (getTransportType(delivery.employeeId) == "Carro" ? (
                <CarIcon />
              ) : (
                <BikeIcon />
              ))}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FinishedDeliveriesCardList;
