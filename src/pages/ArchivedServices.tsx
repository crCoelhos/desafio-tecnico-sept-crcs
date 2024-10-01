import React from "react";
import ArchivedServiceCardList from "@/components/shared/archived-service-card-list/ArchivedServiceCardList";
import "./ArchivedServices.scss";

const ArchivedService: React.FC = () => {
  return (
    <div className="archivedServicesMain">
      <div className="cardMainHeader">
        <h2 className="cardTitle"> Entregas arquivadas </h2>
      </div>

      <ArchivedServiceCardList />
    </div>
  );
};

export default ArchivedService;
