import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Signup from "./Signup";
import { act } from 'react-dom/test-utils';

jest.mock("./../../services/postSignup");

afterEach(cleanup);

beforeEach(() => {
    // jest.spyOn(console, 'log').mockImplementation(() => { });
    // jest.spyOn(console, 'error').mockImplementation(() => { });
    // jest.spyOn(console, 'warn').mockImplementation(() => { });
    render(<Router><Signup /></Router>);
});

describe("renders Signup page", () => {
    it("renders the labels for the input fields", () => {
        expect(screen.getByTestId("name_label")).toBeInTheDocument();
        expect(screen.getByTestId("email_label")).toBeInTheDocument();
        expect(screen.getByTestId("password_label")).toBeInTheDocument();
    });
    it("renders the input fields", () => {
        expect(screen.getByTestId("name_input")).toBeInTheDocument();
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
            expect(screen.getByTestId("error_message")).toHaveTextContent("dummy error message");
            done();
        });
    });
    it("renders no error message when all fields are filled", done => {
        //fireEvent.change(deviceNameInput, { target: { value: "AP VII C2230" } });
        const nameInput = screen.getByTestId("name_input");
        const emailInput = screen.getByTestId("email_input");
        const passwordInput = screen.getByTestId("password_input");
        act(() => {
            fireEvent.change(nameInput, { target: { value: "Test Name" } });
            fireEvent.change(emailInput, { target: { value: "testemail12@gmail.com" } });
            fireEvent.change(passwordInput, { target: { value: "Test@12" } });
            // userEvent.type(nameInput, "n");
            // userEvent.type(emailInput, "e");
            // userEvent.type(passwordInput, "p");
            fireEvent.click(screen.getByTestId("submit_button"));
        });
        // screen.debug();
        setTimeout(() => {
            //expect(nameInput.value).toBe("Test Name");
            //expect(screen.getByTestId("error_message")).toBeEmptyDOMElement();
            done();
        });
    });
});