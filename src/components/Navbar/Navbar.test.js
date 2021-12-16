import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "./Navbar";

afterEach(cleanup);

describe("renders Navbar when not logged in", () => {
    const startingState = {
        credentials: null,
        previousRestaurant: null,
        currentRestaurant: null,
        cart: [],
        currentItem: null,
        orders: [],
        addresses: [],
        currentAddress: null,
        price: null,
    };

    function reducer(state = startingState, action) {
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
});

describe("renders Navbar when logged in", () => {
    const startingState = {
        credentials: { username: "testusername", password: "testpassword" },
        previousRestaurant: {
            "id": "6442",
            "address": "Inside MORE MEGA STORE, KBR Complex Mall, Outer Ring Road, Bangalore",
            "avgRating": "4.3",
            "cloudinaryImageId": "urbjclsmv0wzxwlhyspg",
            "costForTwo": 30000,
            "costForTwoString": "₹300 FOR TWO",
            "cuisines": [
                "Desserts",
                "Fast Food"
            ],
            "deliveryTime": 22,
            "name": "Polar Bear",
            "new": false,
            "subtype": "basic",
            "totalRatings": 100,
            "totalRatingsString": "100+ ratings",
            "uuid": "93a48c36-c94c-46ab-9c4c-5c9bd0cf8a28",
            "veg": true,
        },
        currentRestaurant: {
            "id": "6442",
            "address": "Inside MORE MEGA STORE, KBR Complex Mall, Outer Ring Road, Bangalore",
            "avgRating": "4.3",
            "cloudinaryImageId": "urbjclsmv0wzxwlhyspg",
            "costForTwo": 30000,
            "costForTwoString": "₹300 FOR TWO",
            "cuisines": [
                "Desserts",
                "Fast Food"
            ],
            "deliveryTime": 22,
            "name": "Polar Bear",
            "new": false,
            "subtype": "basic",
            "totalRatings": 100,
            "totalRatingsString": "100+ ratings",
            "uuid": "93a48c36-c94c-46ab-9c4c-5c9bd0cf8a28",
            "veg": true,
        },
        cart: [{ id: 1, qty: 2 }, { id: 2, qty: 1 }],
        currentItem: null,
        orders: [],
        addresses: [],
        currentAddress: null,
        price: 100,
    };

    function reducer(state = startingState, action) {
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
        expect(getByText("testusername")).toBeInTheDocument();
        //expect(actionCalled).toBe(true);
    });
});