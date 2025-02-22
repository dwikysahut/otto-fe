import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FormInput from "./Form";

const mockRegister = {
  name: "test-input",
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ref: jest.fn(),
};

describe("FormInput Component", () => {
  it("renders the input with correct label and placeholder", () => {
    const { getByLabelText } = render(
      <FormInput
        id="test"
        name="test"
        label="Test Label"
        placeholder="Enter text"
        register={mockRegister}
        errors={{}}
        clearErrors={jest.fn()}
        trigger={jest.fn()}
      />
    );

    expect(getByLabelText("Test Label")).toHaveAttribute("placeholder", "Enter text");
  });

  it("displays error message when there is an error", () => {
    const { getByText } = render(
      <FormInput
        id="test"
        name="test"
        label="Test Label"
        register={mockRegister}
        placeholder="Enter text"
        errors={{ test: { message: "Error message" } }}
        clearErrors={jest.fn()}
        trigger={jest.fn()}
      />
    );

    expect(getByText("Error message")).toBeInTheDocument();
  });

  it("clears error on input change", () => {
    const mockClearErrors = jest.fn();
    const { getByLabelText } = render(
      <FormInput
        id="test"
        name="test"
        label="Test Label"
        placeholder="Enter text"
        register={mockRegister}
        errors={{}}
        clearErrors={mockClearErrors}
        trigger={jest.fn()}
      />
    );

    fireEvent.change(getByLabelText("Test Label"), { target: { value: "New value" } });
    expect(mockClearErrors).toHaveBeenCalledWith("test");
  });
});
