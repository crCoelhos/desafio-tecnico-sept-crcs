import React from "react";
import EmployeeCardTable from "../shared/employee-table/EmployeeTable.module";
import style from "./EmployeeCard.module.scss";
import "../../App.scss";
// import { Maximize2Icon, Minimize2Icon } from "lucide-react";
// import { Button } from "../ui/button";

// interface EmployeeCardProps {
//   isHidden: boolean;
//   minimizeCardHandler: () => void;
// }
// const EmployeeCard: React.FC<EmployeeCardProps> = (props) => {
const EmployeeCard: React.FC = () => {
  return (
    <div className={style.deliveryCard}>
      <div className="cardMainHeader">
        <h2 className={style.cardTitle}>Colaboradores</h2>
        {/* <Button onClick={props.minimizeCardHandler}>
          {props.isHidden ? (
            <Maximize2Icon className="minimizeIcon" />
          ) : (
            <Minimize2Icon className="minimizeIcon" />
          )}
        </Button> */}
      </div>

      {/* <div className={props.isHidden ? "cardContentController" : ""}> */}
      <EmployeeCardTable />
      {/* </div> */}
    </div>
  );
};

export default EmployeeCard;
