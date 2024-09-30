import React from "react";
import { ServiceTable } from "../shared/service-table/ServiceTable";
// import { Maximize2Icon, Minimize2Icon } from "lucide-react";
// import { Button } from "../ui/button";
import "../../App.scss";
import style from "./ServiceCard.module.scss";

// interface ServiceCardProps {
//   isHidden: boolean;
//   minimizeCardHandler: () => void;
// }

// const ServiceCard: React.FC<ServiceCardProps> = (props) => {
const ServiceCard: React.FC = () => {
  return (
    <div className={style.serviceCard}>
      <div className="cardMainHeader">
        <h2 className={style.cardTitle}> Pedidos </h2>
        {/* <Button onClick={props.minimizeCardHandler}>
          {props.isHidden ? (
            <Maximize2Icon className="minimizeIcon" />
          ) : (
            <Minimize2Icon className="minimizeIcon" />
          )}
        </Button> */}
      </div>
      {/* <div className={props.isHidden ? "cardContentController" : ""}> */}
      <ServiceTable />
      {/* </div> */}
    </div>
  );
};

export default ServiceCard;
