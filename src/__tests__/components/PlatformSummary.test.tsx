import * as React from "react";
import renderer from "react-test-renderer";

import PlatformSummary from "../../components/PlatformSummary";

it("renders PlatformSummary correctly", () => {
  const component = renderer.create(<PlatformSummary />).toJSON();
  expect(component).toMatchSnapshot();
});
