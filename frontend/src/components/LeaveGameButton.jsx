import React from "react";

const LeaveGameButton = ({ onClick }) => {

  return (
    <button className="modal-button" onClick={onClick}>
      Leave Game
    </button>
  );
};

export default LeaveGameButton;
