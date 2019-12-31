import * as React from "react";
import {MemoryRouter as Router} from "react-router-dom";
import renderer from "react-test-renderer";

import Header from "../../components/Header";

it("renders Header correctly", () => {
  const component = renderer.create(<Router><Header /></Router>).toJSON();
  expect(component).toMatchSnapshot();
});
