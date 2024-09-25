import React from "react";
import "./ServiceCard.scss";
import ServiceTable from "../shared/service-table/ServiceTable";
// import mock from "../../mocks/deliveries.json";
// import AddEmployeeButton from "../shared/add-employee-button/AddEmployeeButton";

const ServiceCard: React.FC = () => {
  return (
    <div id="service-card">
      <ServiceTable />
    </div>
  );
};

export default ServiceCard;
