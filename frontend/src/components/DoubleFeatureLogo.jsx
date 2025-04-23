import React from "react";
import { Link } from "react-router-dom";
import "../css/DoubleFeatureLogo.css";
import DoubleFeature from "../assets/DoubleFeature2.png";

export function DoubleFeatureLogo() {
  return (
    <Link to="/" className="logo" data-testid="double-feature-logo">
      <img src={DoubleFeature} alt="Double Feature" />
    </Link>
  );
}
