import React from "react";
import OngoingDeliveriesCardList from "../shared/ongoing-delivery-card-list/OngoingDeliveriesCardList";
import style from "./OngoingDeliveryCard.module.scss";
import "../../App.scss";
// import { Maximize2Icon, Minimize2Icon } from "lucide-react";

// import { Button } from "../ui/button";
// interface OngoingDeliveryCardProps {
//   isHidden: boolean;
//   minimizeCardHandler: () => void;
// }

// const OngoingDeliveryCard: React.FC<OngoingDeliveryCardProps> = (props) => {
const OngoingDeliveryCard: React.FC = () => {
  return (
    <div className={style.ongoingDeliveryCard}>
      <div className="cardMainHeader">
        <h2 className={style.cardTitle}> Entregas em andamento </h2>
      </div>

      {/* <div className={props.isHidden ? "cardContentController" : ""}> */}
      <OngoingDeliveriesCardList />
      {/* </div> */}
    </div>
  );
};

export default OngoingDeliveryCard;
