import React from "react";
import EmployeeCardTable from "../shared/employee-table/EmployeeTable.module";
import style from "./EmployeeCard.module.scss";
import "../../App.scss";

const EmployeeCard: React.FC = () => {
  return (
    <div className={style.deliveryCard}>
      <div className="cardMainHeader">
        <h2 className={style.cardTitle}>Colaboradores</h2>
      </div>

      <EmployeeCardTable />
    </div>
  );
};

export default EmployeeCard;
