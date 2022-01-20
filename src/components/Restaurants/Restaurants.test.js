import React from "react";
import { Provider } from 'react-redux';
import { createStore } from "redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup, screen } from "@testing-library/react";
import Restaurants from "./Restaurants";

jest.mock("./../../services/getRestaurants");

afterEach(cleanup);

beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });

    var initialState = {
        orders: {
            credentials: {
                email: "newuser12@gmail.com",
                password: "newuser12",
                name: "new user",
                token: "testtoken",
                jwt: "testjwt"
            }
        }
    };
    function reducer(state, action) {
        return state;
    };
    const store = createStore(reducer, initialState);
    render(
        <Provider store={store}>
            <Router>
                <Restaurants />
            </Router>
        </Provider>
    );
});

describe("renders the Restaurants component", () => {
    // it("renders the loading spinner before data is fetched", () => {
    //     expect(screen.getByTestId("loading")).toBeInTheDocument();
    // });

    it("fetches the restaurants data and renders the Restaurants cards with its details", done => {
        setTimeout(() => {
            expect(screen.getByText("Polar Bear")).toBeInTheDocument();
            done();
        });

    });
});