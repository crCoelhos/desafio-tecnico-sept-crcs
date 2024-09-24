import React from "react";
import "./DeliveryCard.scss";
import DeliveryTable from "../shared/delivery-table/DeliveryTable";
import mock from "../../mocks/deliveries.json";
import AddEmployeeButton from "../shared/add-employee-button/AddEmployeeButton";

const Navbar: React.FC = () => {
  return (
    <div className="delivery-card">
      <DeliveryTable deliveries={mock} />
      <AddEmployeeButton />
    </div>
  );
};

export default Navbar;
