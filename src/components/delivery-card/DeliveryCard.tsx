import React from "react";
import "./DeliveryCard.scss";
import DeliveryTable from "../shared/delivery-table/DeliveryTable";
// import mock from "../../mocks/deliveries.json";
// import AddEmployeeButton from "../shared/add-employee-button/AddEmployeeButton";

const DeliveryCard: React.FC = () => {
  return (
    <div id="delivery-card">
      <DeliveryTable />
    </div>
  );
};

export default DeliveryCard;
