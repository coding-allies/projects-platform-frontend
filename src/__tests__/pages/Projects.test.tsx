import * as React from "react";
import renderer from "react-test-renderer";

import { Projects } from "../../pages/Projects";

it("renders Projects correctly", () => {
  const component = renderer.create(<Projects />).toJSON();
  expect(component).toMatchSnapshot();
});
