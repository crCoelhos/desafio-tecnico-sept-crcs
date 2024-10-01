// import { useState } from "react";
import "./App.scss";
import EmployeeCard from "./components/employee-card/EmployeeCard";
import FinishedDeliveryCard from "./components/finished-delivery-card/FinishedDeliveryCard";
import OngoingDeliveryCard from "./components/ongoing-delivery-card/OngoingDeliveryCard";
import ServiceCard from "./components/service-card/ServiceCard";
import Sidebar from "./components/shared/sidebar/Sidebar";
import { Toaster } from "./components/ui/toaster";
import { DeliveryProvider } from "./context/DeliveryContext";

function App() {
  return (
    <DeliveryProvider>
      <main className="main">
        <div>
          <Sidebar />
        </div>

        <Toaster />
        <div className="cards-container">
          <OngoingDeliveryCard />
          <ServiceCard />
          <EmployeeCard />
          <FinishedDeliveryCard />
        </div>
      </main>
    </DeliveryProvider>
  );
}

export default App;
