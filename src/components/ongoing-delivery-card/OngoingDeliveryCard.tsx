import React from "react";
import OngoingDeliveriesCardList from "../shared/ongoing-delivery-card-list/OngoingDeliveriesCardList";
import style from "./OngoingDeliveryCard.module.scss";

const OngoingDeliveryCard: React.FC = () => {
  return (
    <div className={style.ongoingDeliveryCard}>
      <OngoingDeliveriesCardList />
    </div>
  );
};

export default OngoingDeliveryCard;
