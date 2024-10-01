import React from "react";
import OngoingDeliveriesCardList from "../shared/ongoing-delivery-card-list/OngoingDeliveriesCardList";
import style from "./OngoingDeliveryCard.module.scss";
import "../../App.scss";
const OngoingDeliveryCard: React.FC = () => {
  return (
    <div className={style.ongoingDeliveryCard}>
      <div className="cardMainHeader">
        <h2 className={style.cardTitle}> Entregas em andamento </h2>
      </div>

      <OngoingDeliveriesCardList />
    </div>
  );
};

export default OngoingDeliveryCard;
