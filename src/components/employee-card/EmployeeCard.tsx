import React from "react";
import EmployeeCardTable from "../shared/employee-table/EmployeeTable.module";
import style from "./EmployeeCard.module.scss";

const DeliveryCard: React.FC = () => {
  return (
    <div className={style.deliveryCard}>
      <EmployeeCardTable />
    </div>
  );
};

export default DeliveryCard;
