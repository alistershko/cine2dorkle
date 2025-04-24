import React from "react";
import { render, screen } from '@testing-library/react';
import { DoubleFeatureLogo } from '../components/DoubleFeatureLogo';
import { BrowserRouter as Router } from 'react-router-dom'; // Needed to test routing

describe('DoubleFeatureLogo Component', () => {
  // Wrap the component with Router so the Link component can work
  const setup = () => render(
    <Router>
      <DoubleFeatureLogo />
    </Router>
  );

  it('renders the logo link correctly', () => {
    setup();
    const logoLink = screen.getByTestId('double-feature-logo');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('contains the image with the correct source and alt text', () => {
    setup();
    const logoImage = screen.getByRole('img');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', expect.stringContaining('DoubleFeature2.png'));
    expect(logoImage).toHaveAttribute('alt', 'Double Feature');
  });
});
