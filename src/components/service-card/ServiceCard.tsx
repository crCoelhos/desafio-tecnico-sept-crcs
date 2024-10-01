import React from "react";
import { ServiceTable } from "../shared/service-table/ServiceTable";
import "../../App.scss";
import style from "./ServiceCard.module.scss";

const ServiceCard: React.FC = () => {
  return (
    <div className={style.serviceCard}>
      <div className="cardMainHeader">
        <h2 className={style.cardTitle}> Pedidos </h2>
      </div>
      <ServiceTable />
    </div>
  );
};

export default ServiceCard;
