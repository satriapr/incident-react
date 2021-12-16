import { shallow } from 'enzyme';
import * as React from 'react';

const singleSnapTest = (wrapper, description) => {
  test(description, () => {
    expect(wrapper).toMatchSnapshot();
  });
};

const testSnapshots = (Component, configs) => {
  describe('snapshots', () => {
    configs.forEach((config) => {
      const { props, description, state } = config;
      const wrapper = shallow(<Component {...props} />);
      if (state) wrapper.setState(state);
      singleSnapTest(wrapper, description);
    });
  });
};

export { testSnapshots };
