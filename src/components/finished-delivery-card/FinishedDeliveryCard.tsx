import React from "react";
import style from "./FinishedDeliveryCard.module.scss";
import FinishedDeliveriesCardList from "../shared/finished-delivery-card-list/FinishedDeliveriesCardList";

const FinishedDeliveryCard: React.FC = () => {
  return (
    <div className={style.finishedDeliveryCard}>
      <FinishedDeliveriesCardList />
    </div>
  );
};

export default FinishedDeliveryCard;
