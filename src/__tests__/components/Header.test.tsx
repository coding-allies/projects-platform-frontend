import * as React from "react";
import renderer from "react-test-renderer";

import Header from "../../components/Header";

it("renders Header correctly", () => {
  const component = renderer.create(<Header />).toJSON();
  expect(component).toMatchSnapshot();
});
