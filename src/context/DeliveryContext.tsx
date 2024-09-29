import React, { createContext, useState, useContext, ReactNode } from "react";
import { Service } from "@/types/service";
import { Employee } from "@/types/employee";

interface DeliveryContextProps {
  globalServices: Service[];
  setGlobalServices: React.Dispatch<React.SetStateAction<Service[]>>;
  globalEmployees: Employee[];
  setGlobalEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
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

  return (
    <DeliveryContext.Provider
      value={{
        globalServices,
        setGlobalServices,
        globalEmployees,
        setGlobalEmployees,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};
