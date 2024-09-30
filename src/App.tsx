import "./App.scss";
import DeliveryCard from "./components/employee-card/EmployeeCard";
import FinishedDeliveryCard from "./components/finished-delivery-card/FinishedDeliveryCard";
import OngoingDeliveryCard from "./components/ongoing-delivery-card/OngoingDeliveryCard";
import ServiceCard from "./components/service-card/ServiceCard";
// import Sidebar from "./components/shared/sidebar/Sidebar";
import { DeliveryProvider } from "./context/DeliveryContext";

function App() {
  return (
    <DeliveryProvider>
      <main className="main">
        {/* <div>
          <Sidebar />
        </div> */}
        <div className="cards-container">
          <OngoingDeliveryCard />
          <ServiceCard />
          <DeliveryCard />
          <FinishedDeliveryCard />
        </div>
      </main>
    </DeliveryProvider>
  );
}

export default App;
