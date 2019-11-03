import React from "react";
import { cleanup, render } from "@testing-library/react";
import AppContent from "../AppContent";
import { createHistory, createMemorySource, LocationProvider } from "@reach/router";

// this is a handy function that I would utilize for any component
// that relies on the router being in context
function renderWithRouter(
  ui,
  { route = "/", history = createHistory(createMemorySource(route)) } = {}
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}

afterEach(cleanup);

test("Application Content should render correctly", async () => {
  render(<AppContent/>);
});

test("Application Content should render home when /home is called", async () => {
  const { container } = renderWithRouter(<AppContent/>, {
    route: "/"
  });

  expect(container.innerHTML).toMatch("data-testid=\"app-home\"");
});
test("Application Content should render editor when /editor is called", async () => {

  const { container } = renderWithRouter(<AppContent/>, {
    route: "/editor"
  });

  expect(container.innerHTML).toMatch("data-testid=\"app-editor\"");

});
test("Application Content should render executions when /executions is called", async () => {
  const { container } = renderWithRouter(<AppContent/>, {
    route: "/executions"
  });

  expect(container.innerHTML).toMatch("data-testid=\"app-executions\"");
});

test("Application Content should render reports when /reports is called", async () => {
  const { container } = renderWithRouter(<AppContent/>, {
    route: "/reports"
  });

  expect(container.innerHTML).toMatch("data-testid=\"app-reports\"");
});

test("Incorrect url call should redirect to Home", async () => {
  const { container } = renderWithRouter(<AppContent/>, {
    route: "/something-that-does-not-match"
  });
  expect(container.innerHTML).toMatch("Home");
});