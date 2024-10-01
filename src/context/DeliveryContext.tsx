import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { Service } from "@/types/service";
import { Employee } from "@/types/employee";

interface DeliveryContextProps {
  globalServices: Service[];
  setGlobalServices: React.Dispatch<React.SetStateAction<Service[]>>;
  globalEmployees: Employee[];
  setGlobalEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  updateService: (service: Service) => void;
}

const DeliveryContext = createContext<DeliveryContextProps | undefined>(
  undefined
);

export const useDeliveryContext = () => {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error(
      "useDeliveryContext must be used within a DeliveryProvider"
    );
  }
  return context;
};

export const DeliveryProvider = ({ children }: { children: ReactNode }) => {
  const [globalServices, setGlobalServices] = useState<Service[]>([]);
  const [globalEmployees, setGlobalEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/services");
        setGlobalServices(response.data as Service[]);
        console.log("Serviços carregados:", response.data);
      } catch (error) {
        console.error("Erro ao carregar serviços:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employees");
        setGlobalEmployees(response.data as Employee[]);
        console.log("Funcionários carregados:", response.data);
      } catch (error) {
        console.error("Erro ao carregar funcionários:", error);
      }
    };

    fetchServices();
    fetchEmployees();
  }, []);

  return (
    <DeliveryContext.Provider
      value={{
        globalServices,
        setGlobalServices,
        globalEmployees,
        setGlobalEmployees,
        updateService: (updatedService: Service) => {
          setGlobalServices((services) =>
            services.map((service) =>
              service.id === updatedService.id ? updatedService : service
            )
          );
        },
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};
