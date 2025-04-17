import React, { useState } from "react";
import "../css/Modal.css";

const HowTo = () => {
console.log("reached HowTo")
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="modal-btn" onClick={openModal}>
        How to play
      </button>

      {isModalOpen && (
        <div className="modal-overlay open-modal">
          <div className="modal-container">
            <h3>How to Play</h3>
            <p>This is how to play...</p>
            <button className="close-btn" onClick={closeModal}>
              &times; {/* this is the "×" character for the close button */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HowTo;
