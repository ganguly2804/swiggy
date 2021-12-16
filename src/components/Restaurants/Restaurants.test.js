import React from "react";
import { Provider } from 'react-redux';
import { createStore } from "redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from "@testing-library/react";
import Restaurants from "./Restaurants";

jest.mock("./../../services/restaurantsData");

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe("renders the Restaurants component", () => {
    it("renders the loading spinner before data is fetched", () => {
        const { getByTestId } = render(<Restaurants />);
        expect(getByTestId("loading")).toBeInTheDocument();
    });

    it("fetches the restaurants data and renders the Restaurants cards with its details", done => {
        function reducer(state = {}, action) {
            return state;
        };
        const store = createStore(reducer, {});
        const wrapper = render(
            <Provider store={store}>
                <Router>
                    <Restaurants />
                </Router>
            </Provider>
        );
        setTimeout(() => {
            expect(wrapper.getByText("Polar Bear")).toBeInTheDocument();
            done();
        });

    });
});