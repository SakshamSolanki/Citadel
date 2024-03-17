import React, { useState } from 'react';
import "./Modal.css";

const Modal = ({ isOpen , onClose, children } : any): JSX.Element => {
    const [modalOpen, setModalOpen] = useState(isOpen); // Initialize with isOpen prop
  
    const handleClose = () => {
      setModalOpen(false);
      onClose(); // Call the provided onClose function
    };
  
    return (
      <>
        {modalOpen && ( // Only render if modal should be open
          <div className="modal">
            <div className="modal-content">{children}</div>
            <button onClick={handleClose}>Close</button>
          </div>
        )}
      </>
    );
  };
  
  export default Modal;