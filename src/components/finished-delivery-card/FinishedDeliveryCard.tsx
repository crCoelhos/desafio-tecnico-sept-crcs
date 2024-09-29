import React from "react";
import "./FinishedDeliveryCard.scss";
import FinishedDeliveriesCardList from "../shared/finished-delivery-card-list/FinishedDeliveriesCardList";

const FinishedDeliveryCard: React.FC = () => {
  return (
    <div className="finished-delivery-card">
      <FinishedDeliveriesCardList />
    </div>
  );
};

export default FinishedDeliveryCard;
