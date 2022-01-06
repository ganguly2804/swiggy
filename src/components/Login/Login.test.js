import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { act } from 'react-dom/test-utils';

jest.mock("./../../services/postLogin");

afterEach(cleanup);

beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });

    const startingState = {};

    var actionCalled = false;

    function reducer(state = startingState, action) {
        if (action.type == "STORE_CREDENTIALS") {
            actionCalled = true;
            return state;
        } else {
            return state;
        }
    };

    function renderWithRedux(
        component,
        { initialState, store = createStore(reducer, initialState) } = {}
    ) {
        render(
            <Provider store={store}>
                <Router>
                    {component}
                </Router>
            </Provider>);
    };
    renderWithRedux(<Login />);
});

describe("renders Login page", () => {
    it("renders the labels for the input fields", () => {
        // add data-testid attribute to the form components
        expect(screen.getByTestId("email_label")).toBeInTheDocument();
        expect(screen.getByTestId("password_label")).toBeInTheDocument();
    });
    it("renders the input fields", () => {
        expect(screen.getByTestId("email_input")).toBeInTheDocument();
        expect(screen.getByTestId("password_input")).toBeInTheDocument();
    });
    it("renders the submit button", () => {
        expect(screen.getByTestId("submit_button")).toBeInTheDocument();
    });
});

describe("renders the error message correctly when needed", () => {
    it("renders NO error message when no user action occurs", () => {
        expect(screen.getByTestId("error_message")).toBeEmptyDOMElement();
    });
    it("renders an error message when all fields are empty", done => {
        act(() => {
            fireEvent.click(screen.getByTestId("submit_button"));
        });
        setTimeout(() => {
            expect(screen.getByTestId("error_message")).toHaveTextContent("Dummy error message");
            done();
        });
    });
    it("renders no error message when all fields are filled", done => {
        const emailInput = screen.getByTestId("email_input");
        const passwordInput = screen.getByTestId("password_input");
        act(() => {
            fireEvent.change(emailInput, { target: { value: "testemail12@gmail.com" } });
            fireEvent.change(passwordInput, { target: { value: "Test@12" } });
        });
        setTimeout(() => {
            expect(emailInput.value).toBe("testemail12@gmail.com");
            expect(passwordInput.value).toBe("Test@12");
            fireEvent.click(screen.getByTestId("submit_button"));
            expect(screen.getByTestId("error_message")).toBeEmptyDOMElement();
            done();
        });
    });
});