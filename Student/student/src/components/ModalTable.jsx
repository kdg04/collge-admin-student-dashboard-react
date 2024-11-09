import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div>
      <div>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null;
};

const ModalTable = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <button onClick={toggleModal}>Open Modal</button>
      <Modal isOpen={showModal} onClose={toggleModal}>
        <h2>Modal Content</h2>
        <p>This is a modal window.</p>
      </Modal>
    </div>
  );
};

export default ModalTable;
