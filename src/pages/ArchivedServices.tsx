import React from "react";
import ArchivedServiceCardList from "@/components/shared/archived-service-card-list/ArchivedServiceCardList";
import "./ArchivedServices.module.scss";

const ArchivedService: React.FC = () => {
  return (
    <main className="archivedServicesMain">
      <div className="cardMainHeader">
        <h2 className="cardTitle"> Entregas arquivadas </h2>
      </div>

      <ArchivedServiceCardList />
    </main>
  );
};

export default ArchivedService;
