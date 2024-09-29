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

import "./OngoingDeliveriesCardList.scss";

const OngoingDeliveriesCardList: React.FC = () => {
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

  const ongoingDeliveries = services.filter(
    (service) => service.status === "Em Andamento"
  );

  const handleCompleteDelivery = async (deliveryId: number) => {
    try {
      const updatedServices = services.map((service) =>
        service.id === deliveryId
          ? { ...service, status: "Concluído" as const }
          : service
      );

      const updatedDelivery = updatedServices.find(
        (service) => service.id === deliveryId
      );
      if (updatedDelivery) {
        await axios.put(
          `http://localhost:5000/services/${deliveryId}`,
          updatedDelivery
        );
        setServices(updatedServices);
      }
    } catch (error) {
      console.error("Error completing delivery:", error);
    }
  };

  return (
    <div className="grid-container">
      {ongoingDeliveries.map((delivery) => (
        <Card key={delivery.id} className="card">
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
          <CardFooter id="card-footer">
            <Button
              onClick={() => handleCompleteDelivery(delivery.id)}
              variant="destructive"
              id="finish-delivery"
            >
              Finalizar Entrega
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

export default OngoingDeliveriesCardList;
