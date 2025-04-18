import React from "react";
import "../css/DoubleFeatureLogo.css";
import DoubleFeature from "../assets/DoubleFeature.png";

export function DoubleFeatureLogo() {
  return (
    <div className="logo" data-testid="double-feature-logo">
      <img src={DoubleFeature} alt="Double Feature" />
    </div>
  );
}
