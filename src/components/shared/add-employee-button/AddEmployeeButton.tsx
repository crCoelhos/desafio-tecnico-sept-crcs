import React from "react";

const AddEmployeeButton: React.FC = () => {
  const handleAddEmployee = async () => {
    const newEmployee = {
      id: Date.now(),
      name: "Jorge Rogerio",
      CPF: "123.456.789-10",
      transportType: "Carro",
      retailName: "Retail",
    };

    try {
      const addEmployeeApi = (employee: typeof newEmployee) => {
        return new Promise((resolve) => {
          console.log("Adding employee...", employee);
          resolve(true);
        });
      };

      const response = await addEmployeeApi(newEmployee);

      if (response) {
        console.log("Employee added successfully");
      } else {
        console.error("Failed to add employee");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <button onClick={handleAddEmployee}>Adicionar entregador</button>;
};

export default AddEmployeeButton;
