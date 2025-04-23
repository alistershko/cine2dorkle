import React from "react";
import "../css/LeaveGameButton.css";

const LeaveGameButton = ({ onClick }) => {

  return (
    <button className="leave-btn" onClick={onClick}>
      Home
    </button>
  );
};

export default LeaveGameButton;
