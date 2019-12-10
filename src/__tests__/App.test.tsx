import * as React from "react";
import renderer from "react-test-renderer";
import App from "../App";

it("renders App correctly", () => {
  const component = renderer.create(<App />).toJSON();
  expect(component).toMatchSnapshot();
});
