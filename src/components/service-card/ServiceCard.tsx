import React from "react";
import style from "./ServiceCard.module.scss";
import { ServiceTable } from "../shared/service-table/ServiceTable";

const ServiceCard: React.FC = () => {
  return (
    <div className={style.serviceCard}>
      <ServiceTable />
    </div>
  );
};

export default ServiceCard;
