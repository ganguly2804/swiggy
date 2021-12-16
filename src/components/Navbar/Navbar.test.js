import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "./Navbar";
import { act } from 'react-dom/test-utils';

afterEach(cleanup);

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe("renders Navbar when not logged in", () => {
    var initialState = {
        orders: {
            credentials: null,
            cart: []
        }
    };

    function reducer(state = initialState, action) {
        return state;
    };

    function renderWithRedux(
        component,
        { initialState, store = createStore(reducer, initialState) } = {}
    ) {
        return {
            ...render(<Provider store={store}><Router>{component}</Router></Provider>)
        };
    };

    it("renders with redux", () => {
        const { getByText } = renderWithRedux(<Navbar />);
        expect(getByText("Login")).toBeInTheDocument();
    });

    it("renders the cart items qty when cart is empty", () => {
        const { getByText } = renderWithRedux(<Navbar />);
        expect(getByText("0")).toBeInTheDocument();
    });
});

describe("renders Navbar when logged in", () => {
    const initialState = {
        orders: {
            credentials: { username: "testusername", password: "testpassword" },
            cart: [{ id: 1, qty: 2 }, { id: 2, qty: 1 }],
        }
    };

    var logoutActionCalled = false;

    function reducer(state = initialState, action) {
        if (action.type == "LOGOUT") {
            logoutActionCalled = true;
            return state;
        } else {
            return state;
        }
    };

    function renderWithRedux(
        component,
        { initialState, store = createStore(reducer, initialState) } = {}
    ) {
        return {
            ...render(<Provider store={store}><Router>{component}</Router></Provider>)
        };
    };

    it("renders the Navbar with redux", () => {
        const { getByText } = renderWithRedux(<Navbar />);
        expect(getByText("testusername")).toBeInTheDocument();
    });

    it("renders the logout button (dropdown) with its logout functionality on clicking username", () => {

        expect(logoutActionCalled).toBe(false);

        renderWithRedux(<Navbar />);
        act(() => {
            fireEvent.click(screen.getByText("testusername"));
        });
        act(() => {
            fireEvent.click(screen.getByText("Logout"));
        })
        expect(logoutActionCalled).toBe(true);
    });

    it("renders the cart items qty when cart has 3 items", () => {
        const { getByText } = renderWithRedux(<Navbar />);
        expect(getByText("3")).toBeInTheDocument();
    });
});