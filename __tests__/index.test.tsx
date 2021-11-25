import { shallow } from "enzyme";
import React from "react";
import Home from "../src/pages/index";

const sel = (id: string) => `[data-testid="${id}"]`;

test("test", () => {
  const wrapper = shallow(<Home />);
  console.log(wrapper.find(sel("value")).debug());
});
