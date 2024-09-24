// import { useState } from "react";
import "./App.scss";
import DeliveryCard from "./components/delivery-card/DeliveryCard";
import FinishedDeliveryCard from "./components/finished-delivery-card/FinishedDeliveryCard";
import OngoingDeliveryCard from "./components/ongoing-delivery-card/OngoingDeliveryCard";
import ServiceCard from "./components/service-card/ServiceCard";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  // const [isLogged, setIsLogged] = useState(false);

  return (
    <main className="main">
      {/* <Navbar /> */}
      <div>
        <Sidebar />
      </div>
      <div className="cards-container">
        <DeliveryCard />
        <ServiceCard />
        <FinishedDeliveryCard />
        <OngoingDeliveryCard />
      </div>
    </main>
  );
}

export default App;
