import React from "react";
import "./OngoingDeliveryCard.scss";
import OngoingDeliveriesCardList from "../shared/ongoing-delivery-card/OngoingDeliveriesCardList";

const OngoingDeliveryCard: React.FC = () => {
  return (
    <div className="ongoing-delivery-card">
      <OngoingDeliveriesCardList />
    </div>
  );
};

export default OngoingDeliveryCard;
