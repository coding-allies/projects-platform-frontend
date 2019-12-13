import * as React from "react";
import renderer from "react-test-renderer";

import Welcome from "../../pages/Welcome";

it("renders Welcome correctly", () => {
  const component = renderer.create(<Welcome />).toJSON();
  expect(component).toMatchSnapshot();
});
