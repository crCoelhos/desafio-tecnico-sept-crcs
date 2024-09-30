// import { useState } from "react";
import "./App.scss";
import EmployeeCard from "./components/employee-card/EmployeeCard";
import FinishedDeliveryCard from "./components/finished-delivery-card/FinishedDeliveryCard";
import OngoingDeliveryCard from "./components/ongoing-delivery-card/OngoingDeliveryCard";
import ServiceCard from "./components/service-card/ServiceCard";
import Sidebar from "./components/shared/sidebar/Sidebar";
import { DeliveryProvider } from "./context/DeliveryContext";

function App() {
  // const [colapseOngoingCard, setColapseOngoingCard] = useState<boolean>(false);
  // const [colapseServiceCard, setColapseServiceCard] = useState<boolean>(false);
  // const [colapseFinishedCard, setColapseFinishedCard] =
  //   useState<boolean>(false);
  // const [colapseEmployeeCard, setColapseEmployeeCard] =
  //   useState<boolean>(false);

  return (
    <DeliveryProvider>
      <main className="main">
        <div>
          <Sidebar />
        </div>
        {/* <div className="cards-container">
          <OngoingDeliveryCard
            isHidden={colapseOngoingCard}
            minimizeCardHandler={() =>
              setColapseOngoingCard(!colapseOngoingCard)
            }
          />
          <ServiceCard
            isHidden={colapseServiceCard}
            minimizeCardHandler={() =>
              setColapseServiceCard(!colapseServiceCard)
            }
          />
          <EmployeeCard
            isHidden={colapseEmployeeCard}
            minimizeCardHandler={() =>
              setColapseEmployeeCard(!colapseEmployeeCard)
            }
          />
          <FinishedDeliveryCard
            isHidden={colapseFinishedCard}
            minimizeCardHandler={() =>
              setColapseFinishedCard(!colapseFinishedCard)
            }
          />
        </div> */}
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
