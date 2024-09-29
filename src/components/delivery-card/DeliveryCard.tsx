import React from "react";
import DeliveryTable from "../shared/delivery-table/DeliveryTable";
import style from "./DeliveryCard.module.scss";

const DeliveryCard: React.FC = () => {
  return (
    <div className={style.deliveryCard}>
      <DeliveryTable />
    </div>
  );
};

export default DeliveryCard;
