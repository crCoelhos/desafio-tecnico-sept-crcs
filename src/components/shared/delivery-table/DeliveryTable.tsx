import React, { useState } from "react";
import { Delivery } from "../../../types/delivery";
import "./DeliveryTable.scss";
import Pagination from "../delivery-pagination/DeliveryPagination";
import SearchEmployeeInput from "../search-employee-input/SearchEmployeeInput";

interface DeliveryTableProps {
  deliveries: Delivery[];
}

const DeliveryTable: React.FC<DeliveryTableProps> = ({ deliveries }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDeliveries = deliveries.filter(
    (delivery) =>
      delivery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.CPF.includes(searchTerm) ||
      delivery.transportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.retailName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDeliveries = filteredDeliveries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <SearchEmployeeInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por nome, CPF, transporte..."
      />

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
          {currentDeliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td>{delivery.id}</td>
              <td>{delivery.name}</td>
              <td>{delivery.CPF}</td>
              <td>{delivery.transportType}</td>
              <td>{delivery.retailName}</td>
              <td>
                <button
                  onClick={() => console.log(delivery.id)}
                  id="removeEmployeeButton"
                >
                  Excluir
                </button>
                <button
                  onClick={() => console.log(delivery.id)}
                  id="editEmployeeButton"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredDeliveries.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default DeliveryTable;
