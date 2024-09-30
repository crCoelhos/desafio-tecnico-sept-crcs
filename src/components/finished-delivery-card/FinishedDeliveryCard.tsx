import React from "react";
import style from "./FinishedDeliveryCard.module.scss";
import FinishedDeliveriesCardList from "../shared/finished-delivery-card-list/FinishedDeliveriesCardList";
// import { Maximize2Icon, Minimize2Icon } from "lucide-react";
// import { Button } from "../ui/button";

// interface FinishedDeliveryCardProps {
//   isHidden: boolean;
//   minimizeCardHandler: () => void;
// }
// const FinishedDeliveryCard: React.FC<FinishedDeliveryCardProps> = (props) => {
const FinishedDeliveryCard: React.FC = () => {
  return (
    <div className={style.finishedDeliveryCard}>
      <div className="cardMainHeader">
        <h2 className={style.cardTitle}>Entregas finalizadas ou canceladas</h2>
        {/* <Button onClick={props.minimizeCardHandler}>
          {props.isHidden ? (
            <Maximize2Icon className="minimizeIcon" />
          ) : (
            <Minimize2Icon className="minimizeIcon" />
          )}
        </Button> */}
      </div>

      {/* <div className={props.isHidden ? "cardContentController" : ""}> */}
      <FinishedDeliveriesCardList />
      {/* </div> */}
    </div>
  );
};

export default FinishedDeliveryCard;
