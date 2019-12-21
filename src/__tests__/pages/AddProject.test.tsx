import * as React from "react";
import renderer from "react-test-renderer";

import AddProject from "../../pages/AddProject";

it("renders Add Project correctly", () => {
  const component = renderer.create(<AddProject />).toJSON();
  expect(component).toMatchSnapshot();
});
