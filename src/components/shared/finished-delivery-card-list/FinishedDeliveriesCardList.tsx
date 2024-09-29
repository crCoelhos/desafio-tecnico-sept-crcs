import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Service } from "@/types/service";
import { BikeIcon, CarIcon } from "lucide-react";
import styles from "./finisheddeliveriescardlist.module.scss";

const FinishedDeliveriesCardList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/services");
        setServices(response.data as Service[]);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const finishedDeliveries = services.filter(
    (service) => service.status === "Concluído"
  );

  const handleArchiveDelivery = async (deliveryId: number) => {
    try {
      const archivedServices = services.map((service) =>
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
        setServices(finishedDeliveries);
      }
    } catch (error) {
      console.error("Error completing delivery:", error);
    }
  };

  return (
    <div className={styles.gridContainer}>
      {finishedDeliveries.map((delivery) => (
        <Card key={delivery.id} className={styles.card}>
          <CardHeader>
            <CardTitle>Atendimento #{delivery.attendanceNumber}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Entregador:</strong> {delivery.deliveryPerson?.name}
            </p>
            <p>
              <strong>Endereço:</strong> {delivery.address}
            </p>
          </CardContent>
          <CardFooter className={styles.cardFooter}>
            <Button
              onClick={() => handleArchiveDelivery(delivery.id)}
              variant="destructive"
              className={styles.finishDeliveryButton}
            >
              Arquivar Entrega
            </Button>
            {delivery.deliveryPerson?.transportType === "Carro" ? (
              <CarIcon />
            ) : (
              <BikeIcon />
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FinishedDeliveriesCardList;
