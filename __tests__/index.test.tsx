import { render, screen } from "@testing-library/react";

import Home from "../pages/index";

test("should render home page", () => {
  render(<Home />);
  expect(screen.getByText("Something wonderful is coming!")).toBeTruthy();
});
