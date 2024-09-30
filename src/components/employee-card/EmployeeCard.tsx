import React from "react";
import EmployeeCardTable from "../shared/employee-table/EmployeeTable.module";
import style from "./EmployeeCard.module.scss";

const DeliveryCard: React.FC = () => {
  return (
    <div className={style.deliveryCard}>
      <h2 className={style.cardTitle}> Colaboradores </h2>
      <EmployeeCardTable />
    </div>
  );
};

export default DeliveryCard;
