import React from "react";
import { Delivery } from "../../../types/delivery";
import "./DeliveryTable.scss";

interface DeliveryTableProps {
  deliveries: Delivery[];
}

const DeliveryTable: React.FC<DeliveryTableProps> = ({ deliveries }) => {
  return (
    <table className="deliveryTable">
      <thead>
        <tr className="tableColumns">
          <th>ID</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>Tansporte</th>
          <th>Revendedor</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {deliveries.map((delivery) => (
          <tr key={delivery.id}>
            <td>{delivery.id}</td>
            <td>{delivery.name}</td>
            <td>{delivery.CPF}</td>
            <td>{delivery.transportType}</td>
            <td>{delivery.retailName}</td>
            <td>
              <button onClick={() => console.log(delivery.id)} className="removeEmployeeButton">Excluir</button>
              <button onClick={() => console.log(delivery.id)} className="editEmployeeButton">Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DeliveryTable;
