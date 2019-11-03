import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import AppHeader from "../AppHeader";

afterEach(cleanup);

test("Application Header should render correctly", () => {
  render(<AppHeader/>);
});