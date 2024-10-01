import React from "react";
import style from "./FinishedDeliveryCard.module.scss";
// import FinishedDeliveriesCardList from "../shared/finished-delivery-card-list/FinishedDeliveriesCardList";
import ArchivedDeliveriesCardList from "@/pages/ArchivedServices";

const FinishedDeliveryCard: React.FC = () => {
  return (
    <div className={style.finishedDeliveryCard}>
      <div className="cardMainHeader">
        <h2 className={style.cardTitle}>Entregas finalizadas ou canceladas</h2>
      </div>

      <ArchivedDeliveriesCardList />
      {/* <FinishedDeliveriesCardList /> */}
    </div>
  );
};

export default FinishedDeliveryCard;
