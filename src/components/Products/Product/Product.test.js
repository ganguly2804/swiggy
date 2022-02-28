import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import Product from "./Product";

afterEach(cleanup);

beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });

    renderWithRedux(<Product product={itemData} />);
});

const itemData = {
    "category": "Breakfast",
    "cloudinaryImageId": "",
    "cropChoices": 2,
    "description": "",
    "displayOrder": 0,
    "enabled": 1,
    "id": 6639130,
    "inStock": 0,
    "isPopular": 0,
    "isVeg": 1,
    "itemDiscount": 0,
    "itemScore": 0,
    "name": "Set Dosa",
    "nextAvailableAtMessage": "Next available at 8 am, tomorrow",
    "price": 5000,
    "recommended": 0,
    "restId": "32474",
    "showMC": 0,
    "variants_new": {
        "exclude_list": [],
        "variant_groups": []
    }
};

const startingState = {};

var addToCart = false;
var storeData = false;

function reducer(state = startingState, action) {
    if (action.type == "ADD_TO_CART") {
        addToCart = true;
        return state;
    } else if (action.type == "STORE_DATA") {
        storeData = true;
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

describe("renders Product/item card having ADD_TO_CART and STORE_DATA action", () => {
    it("renders with redux", () => {
        expect(screen.getByTestId("item_name")).toBeInTheDocument();
    });

    describe("renders all item details", () => {
        it("renders item category", () => {
        expect(screen.getByTestId("item_category")).toBeInTheDocument();
        });
        it("renders item price", () => {
        expect(screen.getByTestId("item_price")).toBeInTheDocument();
        });
    })

    it("dispatches ADD_TO_CART and STORE_DATA action", () => {
        expect(addToCart).toBe(false);
        expect(storeData).toBe(false);
        fireEvent.click(screen.getByTestId("add_to_cart_button"));
        expect(addToCart).toBe(true);
        expect(storeData).toBe(true);
    });
})