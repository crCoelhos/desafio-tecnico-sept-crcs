import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

interface EditEmployeeButtonProps {
  deliveryId: number;
  deliveryCPF: string;
  currentName: string;
  currentTransportType: string;
  currentRetailName: string;
  onUpdate: () => void; // Função para atualizar a lista de entregas após a edição
}

const EditEmployeeButton: React.FC<EditEmployeeButtonProps> = ({
  deliveryId,
  deliveryCPF,
  currentName,
  currentTransportType,
  currentRetailName,
  onUpdate,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState(currentName);
  const [transportType, setTransportType] = useState(currentTransportType);
  const [retailName, setRetailName] = useState(currentRetailName);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/deliveries/${deliveryId}`, {
        name,
        CPF: deliveryCPF,
        transportType,
        retailName,
      });
      onUpdate(); // Atualiza a lista de entregas
      closeModal();
    } catch (error) {
      console.error("Erro ao atualizar a entrega:", error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="editEmployeeButton">
        Editar
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Entrega"
        ariaHideApp={false}
      >
        <h2>Editar Entrega</h2>
        <form>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Transporte:</label>
            <input
              type="text"
              value={transportType}
              onChange={(e) => setTransportType(e.target.value)}
            />
          </div>
          <div>
            <label>Revendedor:</label>
            <input
              type="text"
              value={retailName}
              onChange={(e) => setRetailName(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleUpdate}>
            Salvar
          </button>
          <button type="button" onClick={closeModal}>
            Cancelar
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EditEmployeeButton;
