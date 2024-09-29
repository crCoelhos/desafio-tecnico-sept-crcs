import React, { useEffect } from "react";
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
import { Employee } from "@/types/employee";
import { useDeliveryContext } from "@/context/DeliveryContext";

const OngoingDeliveriesCardList: React.FC = () => {
  const {
    globalServices,
    setGlobalServices,
    globalEmployees,
    setGlobalEmployees,
  } = useDeliveryContext();

  const ongoingDeliveries = globalServices.filter(
    (service) => service.status === "Em Andamento"
  );

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/services");
        setGlobalServices(response.data as Service[]);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [setGlobalServices]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employees");
        setGlobalEmployees(response.data as Employee[]);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [setGlobalEmployees]);

  const handleCompleteDelivery = async (deliveryId: number) => {
    try {
      const updatedServices = globalServices.map((service) =>
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
        setGlobalServices(updatedServices);
      }
    } catch (error) {
      console.error("Error completing delivery:", error);
    }
  };

  const getEmployeeName = (employeeId: number | undefined) => {
    const employee = globalEmployees.find((emp) => emp.id == employeeId);
    return employee ? employee.name : "Entregador não designado";
  };

  const getTransportType = (employeeId: number | undefined) => {
    const employee = globalEmployees.find((emp) => emp.id == employeeId);
    return employee ? employee.transportType : null;
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
              Entregador:
              {getEmployeeName(delivery.employeeId)}
            </p>
            <p>Endereço: {delivery.address}</p>
          </CardContent>
          <CardFooter id="card-footer">
            <Button
              onClick={() => handleCompleteDelivery(delivery.id)}
              variant="destructive"
              id="finish-delivery"
            >
              Finalizar Entrega
            </Button>
            {delivery.employeeId &&
              (getTransportType(delivery.employeeId) === "Carro" ? (
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

export default OngoingDeliveriesCardList;
