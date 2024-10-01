import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Service } from "@/types/service";
import style from "./ObservationDescriptionCard.module.scss";

interface ObservationDescriptionCardProps {
  service: Service;
}

const ObservationDescriptionCard: React.FC<ObservationDescriptionCardProps> = (
  props
) => {
  return (
    <Card className={style.cardContent}>
      <CardContent>
        <p>
          Empresa:{" "}
          <span className={style.serviceDescription}>
            {props.service.companyName}
          </span>
        </p>
        <p>
          Revendedora:{" "}
          <span className={style.serviceDescription}>
            {props.service.resale}
          </span>
        </p>
        <p>
          Vendedor:{" "}
          <span className={style.serviceDescription}>
            {props.service.sellerName}
          </span>
        </p>
        <p>
          Entregador:{" "}
          <span className={style.serviceDescription}>
            {props.service.employeeId
              ? props.service.employeeId // Assumindo que você vai buscar o nome do entregador baseado no ID do funcionário
              : "N/A"}
          </span>
        </p>

        <p>Itens da entrega:</p>
        <ul>
          {props.service.items.map((item) => (
            <li key={item.id}>
              <span className={style.serviceDescription}>
                {item.name} - {item.quantity}x - R$ {item.value.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        <p>
          Quantidade total de itens:{" "}
          <span className={style.serviceDescription}>
            {props.service.items.reduce(
              (total, item) => total + item.quantity,
              0
            )}
          </span>
        </p>
        <p>
          Valor total:{" "}
          <span className={style.serviceDescription}>
            R${" "}
            {props.service.items
              .reduce((total, item) => total + item.value * item.quantity, 0)
              .toFixed(2)}
          </span>
        </p>
        <p>
          Endereço:{" "}
          <span className={style.serviceDescription}>
            {props.service.address}
          </span>
        </p>
        <p>
          Início da entrega:{" "}
          <span className={style.serviceDescription}>
            {props.service.startedAt
              ? new Date(props.service.startedAt).toLocaleString()
              : "N/A"}
          </span>
        </p>
        <p>
          Fim da entrega:{" "}
          <span className={style.serviceDescription}>
            {props.service.finishedAt
              ? new Date(props.service.finishedAt).toLocaleString()
              : "N/A"}
          </span>
        </p>
        <p>
          (Duração:{" "}
          <span className={style.serviceDescription}>
            {props.service.tripDuration}
          </span>
          )
        </p>
      </CardContent>
      <CardFooter className={style.serviceDescriptionFooter}>
        <p>
          Situação:{" "}
          <span className={style.serviceDescription}>
            {props.service.status}
          </span>
        </p>
        <p>
          Observação:{" "}
          <span className={style.serviceDescription}>
            {props.service.observation ? props.service.observation : "N/A"}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ObservationDescriptionCard;
