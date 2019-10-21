import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FormInput from "../../Components/FormInput";

afterEach(cleanup);

describe("FormInput component", () => {
  it("renders a form", () => {
    const { getByText } = render(
      <FormInput name="test" />
    );
    expect(getByText("Test")).toBeInTheDocument();
  });
});
