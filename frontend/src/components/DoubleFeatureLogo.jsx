import React from "react";
import "../css/DoubleFeatureLogo.css";
import DoubleFeature from "../assets/DoubleFeature2.png";

export function DoubleFeatureLogo() {
  return (
    <div className="logo" data-testid="double-feature-logo">
      <img src={DoubleFeature} alt="Double Feature" />
    </div>
  );
}
