import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import '@testing-library/jest-dom';
import Header from "../components/header";

// Header renders logo
describe("Header component", () => {
    it("renders the DoubleFeatureLogo component", () => {
        render(<Header />);
        const logo = screen.getByTestId("double-feature-logo");
        expect(logo).toBeInTheDocument();
    });
});

// Minimize works correctly
    it("should minimize when scrollY is greater than 50", () => {
        render(<Header />);
        fireEvent.scroll(window, { target: { scrollY: 100 }}); // simulates scroll event
        const header = screen.getByTestId("header");
        expect(header).toHaveClass("minimized");
    });

    it("should remove minimize when scrollY is less than 50", () => {
        render(<Header />);
        fireEvent.scroll(window, { target: { scrollY: 100 }}); // simulates scrolly >50 to get add minimized class
        fireEvent.scroll(window, { target: { scrollY: 40 }}); // then simulates scrolly <50 to remove minimized
        const header = screen.getByTestId("header");
        expect(header).not.toHaveClass("minimized");
    });

    it("adds correct paddingTop to the body when scrollY is greater than 50", () => {
        render(<Header />);
        const paddingSpy = vi.spyOn(document.body.style, "paddingTop", "set"); // spy on document.body.style.paddingTop to check value
        fireEvent.scroll(window, { target: { scrollY: 100 }});
        expect(paddingSpy).toHaveBeenCalledWith("var(--navbar-minimized-height)"); // check paddingTop is updated to match minimized height
        paddingSpy.mockRestore(); // clean up the spy
    });
    
    it("restores the correct paddingTop to the body when scrollY is less than 50", () => {
        render(<Header />);
        const paddingSpy = vi.spyOn(document.body.style, "paddingTop", "set"); // 
        fireEvent.scroll(window, { target: { scrollY: 100 }});
        fireEvent.scroll(window, { target: { scrollY: 40 }});
        expect(paddingSpy).toHaveBeenCalledWith("var(--navbar-height)"); 
        paddingSpy.mockRestore(); 
    })

// INTEGRATION TESTS