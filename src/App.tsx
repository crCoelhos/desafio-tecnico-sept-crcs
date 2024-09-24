
import "./App.scss";
import DeliveryCard from "./components/delivery-card/DeliveryCard";
import FinishedDeliveryCard from "./components/finished-delivery-card/FinishedDeliveryCard";
import OngoingDeliveryCard from "./components/ongoing-delivery-card/OngoingDeliveryCard";
import ServiceCard from "./components/service-card/ServiceCard";
import Sidebar from "./components/shared/sidebar/Sidebar";

function App() {

  return (
    <main className="main">
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
