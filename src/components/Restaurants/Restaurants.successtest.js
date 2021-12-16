import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import { configure, mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter as Router } from 'react-router-dom';
import Restaurants from './Restaurants';

configure({ adapter: new Adapter() });
jest.mock("./../../services/restaurantsData");

describe('renders the Restaurants page', () => {

  let wrapper;

  function reducer(state = {}, action) {
    return state;
  };

  beforeEach(() => {
    const store = createStore(reducer, {});
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <Restaurants />
        </Router>
      </Provider>
    );
  });

  it('renders 10 Restaurant Card components', done => {
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find("Restaurant").length).toBe(10);
      done();
    });
  });

  it('renders Restaurant title', done => {
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find("Restaurant").at(1).text().includes("Polar Bear")).toBe(true);
      done();
    });
  });
});