import React, { useEffect, useState } from "react";
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
import { Employee } from "@/types/employee";
import { useDeliveryContext } from "@/context/DeliveryContext";
import TimeCounter from "../time-counter/TimeCounter";
import { useToast } from "@/hooks/use-toast";

import style from "./OngoingDeliveriesCardList.module.scss";

const OngoingDeliveriesCardList: React.FC = () => {
  const {
    globalServices,
    setGlobalServices,
    globalEmployees,
    setGlobalEmployees,
  } = useDeliveryContext();

  const [timeElapsed, setTimeElapsed] = useState<string>("00:00:00");
  const { toast } = useToast();

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
        Number(service.id) === deliveryId
          ? {
              ...service,
              finishedAt: new Date(),
              status: "Concluído" as const,
              tripDuration: timeElapsed,
            }
          : service
      );

      const updatedDelivery = updatedServices.find(
        (service) => Number(service.id) === deliveryId
      );
      if (updatedDelivery) {
        await axios.put(
          `http://localhost:5000/services/${deliveryId}`,
          updatedDelivery
        );
        setGlobalServices(updatedServices);

        toast({
          variant: "success",
          title: "Entrega FINALIZADA!",
          description: `A entrega ${updatedDelivery.attendanceNumber} foi arquivada com sucesso.`,
        });
      }
    } catch (error) {
      console.error("Error completing delivery:", error);
      toast({
        variant: "destructive",
        title: "Erro ao FINALIZAR Entrega!",
        description: `Ocorreu um erro ao tentar finalizar a entrega. Tente novamente.`,
      });
    }
  };
  const handleCancelDelivery = async (deliveryId: number) => {
    try {
      const updatedServices = globalServices.map((service) =>
        Number(service.id) === deliveryId
          ? {
              ...service,
              finishedAt: new Date(),
              status: "Cancelado" as const,
              tripDuration: timeElapsed,
            }
          : service
      );

      const updatedDelivery = updatedServices.find(
        (service) => Number(service.id) === deliveryId
      );
      if (updatedDelivery) {
        await axios.put(
          `http://localhost:5000/services/${deliveryId}`,
          updatedDelivery
        );
        setGlobalServices(updatedServices);

        toast({
          variant: "warning",
          title: "Entrega CANCELADA!",
          description: `A entrega ${updatedDelivery.attendanceNumber} foi cancelada com sucesso.`,
        });
      }
    } catch (error) {
      console.error("Error completing delivery:", error);
      toast({
        variant: "destructive",
        title: "Erro ao CANCELAR Entrega!",
        description: `Ocorreu um erro ao tentar cancelar a entrega. Tente novamente.`,
      });
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
    <div className={style.gridContainer}>
      {ongoingDeliveries.map((delivery) => (
        <Card key={delivery.id} className={style.card}>
          <CardHeader>
            <CardTitle>Atendimento #{delivery.attendanceNumber}</CardTitle>
          </CardHeader>
          <CardContent className={style.cardContent}>
            <div className={style.cardMainContent}>
              <p>
                Entregador:
                {getEmployeeName(delivery.employeeId)}
              </p>
              <p>Endereço: {delivery.address}</p>
            </div>
            <div className={style.cardSecondaryContent}>
              <p>
                Início:{" "}
                {delivery.startedAt &&
                  new Date(delivery.startedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </p>
              <p>
                Decorrido:{" "}
                {delivery.startedAt && (
                  <TimeCounter
                    startTime={new Date(delivery.startedAt)}
                    onTimeUpdate={setTimeElapsed}
                  />
                )}
              </p>
            </div>
          </CardContent>
          <CardFooter className={style.cardFooter}>
            <Button
              onClick={() => handleCompleteDelivery(Number(delivery.id))}
              variant="destructive"
              className={style.finishDelivery}
            >
              Finalizar Entrega
            </Button>
            <Button
              onClick={() => handleCancelDelivery(Number(delivery.id))}
              variant="destructive"
              className={style.cancelDelivery}
            >
              Cancelar Entrega
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
