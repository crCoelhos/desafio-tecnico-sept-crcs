import React from "react";
import axios from "axios";
import "./AddEmployeeButton.scss";
import { Delivery } from "../../../types/delivery";

interface AddEmployeeButtonProps {
  setDeliveries: React.Dispatch<React.SetStateAction<Delivery[]>>;
}

const AddEmployeeButton: React.FC<AddEmployeeButtonProps> = ({
  setDeliveries,
}) => {
  const handleAddEmployee = async () => {
    const newEmployee = {
      id: Number(Date.now().toString().slice(2, 1)),
      name: "Teste Teste",
      CPF: "123.456.789-13",
      transportType: "Carro",
      retailName: "Retail",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/deliveries",
        newEmployee
      );

      if (response.status === 201) {
        setDeliveries((prevDeliveries) => [...prevDeliveries, newEmployee]);
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <button onClick={handleAddEmployee} className="addEmployeeButton">
      Adicionar entregador
    </button>
  );
};

export default AddEmployeeButton;
