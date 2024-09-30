import React from "react";
import OngoingDeliveriesCardList from "../shared/ongoing-delivery-card-list/OngoingDeliveriesCardList";
import style from "./OngoingDeliveryCard.module.scss";

const OngoingDeliveryCard: React.FC = () => {
  return (
    <div className={style.ongoingDeliveryCard}>
      <h2 className={style.cardTitle}> Entregas em andamento </h2>
      <OngoingDeliveriesCardList />
    </div>
  );
};

export default OngoingDeliveryCard;
