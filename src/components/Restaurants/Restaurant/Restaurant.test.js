import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import Restaurant from "./Restaurant";

afterEach(cleanup);

const restaurantData = {
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
};

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

var actionCalled = false;

function reducer(state = startingState, action) {
    if (action.type == "LOAD_RESTAURANT_MENU") {
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
    return {
        ...render(
        <Provider store={store}>
            <Router>
                {component}
            </Router>
        </Provider>)
    };
};

describe("renders Restaurant card having dispatch action", () => {
    it("renders with redux", () => {
        const { getByText } = renderWithRedux(<Restaurant restaurant={restaurantData} />);
        expect(getByText(restaurantData["name"])).toBeInTheDocument();
    });

    describe("renders all restaurant details", () => {
        it("renders restaurant average rating", () => {
            const { getByText } = renderWithRedux(<Restaurant restaurant={restaurantData} />);
            expect(getByText(restaurantData["avgRating"])).toBeInTheDocument();
        });
        it("renders restaurant cost for two", () => {
            const { getByText } = renderWithRedux(<Restaurant restaurant={restaurantData} />);
            expect(getByText(restaurantData["costForTwoString"])).toBeInTheDocument();
        });
    })

    it("dispatches LOAD_RESTAURANT_MENU action", () => {
        const { getByText } = renderWithRedux(<Restaurant restaurant={restaurantData} />);
        expect(actionCalled).toBe(false);
        fireEvent.click(getByText(restaurantData["name"]));
        expect(actionCalled).toBe(true);
    });
})