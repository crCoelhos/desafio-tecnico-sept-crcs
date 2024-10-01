import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import EmployeeCard from "./components/employee-card/EmployeeCard";
import FinishedDeliveryCard from "./components/finished-delivery-card/FinishedDeliveryCard";
import OngoingDeliveryCard from "./components/ongoing-delivery-card/OngoingDeliveryCard";
import ServiceCard from "./components/service-card/ServiceCard";
import Sidebar from "./components/shared/sidebar/Sidebar";
import { Toaster } from "./components/ui/toaster";
import { DeliveryProvider } from "./context/DeliveryContext";
import ArchivedServices from "./pages/ArchivedServices";

// #TODO: confirmation popup on archiving and canceling services

function App() {
  return (
    <DeliveryProvider>
      <Router>
        <div className="mainContainer">
          <Sidebar />
          <main className="mainContent">
            <Toaster />
            <Routes>
              <Route
                path="/"
                element={
                  <div className="cards-container">
                    <OngoingDeliveryCard />
                    <ServiceCard />
                    <EmployeeCard />
                    <FinishedDeliveryCard />
                  </div>
                }
              />
              <Route path="/archived-services" element={<ArchivedServices />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DeliveryProvider>
  );
}

export default App;
