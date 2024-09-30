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
          Revendeda:{" "}
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
            {props.service.deliveryPerson
              ? props.service.deliveryPerson.name
              : "N/A"}
          </span>
        </p>
        <p>
          Quantidade de itens:{" "}
          <span className={style.serviceDescription}>
            {props.service.quantityItems}
          </span>
        </p>
        <p>
          Valor total:{" "}
          <span className={style.serviceDescription}>
            R$ {props.service.totalValue}
          </span>
        </p>
        <p>
          Endereço:{" "}
          <span className={style.serviceDescription}>
            {props.service.address}
          </span>
        </p>
        <p>
          Inicio da entrega:{" "}
          <span className={style.serviceDescription}>
            {props.service.startedAt?.toLocaleString()}
          </span>
        </p>
        <p>
          Fim da entrega:{" "}
          <span className={style.serviceDescription}>
            {props.service.finishedAt?.toLocaleString()}
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
      <CardFooter>
        <p>
          Situação:{" "}
          <span className={style.serviceDescription}>
            {props.service.status}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ObservationDescriptionCard;
