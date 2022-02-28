import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import CartItem from "./CartItem";

afterEach(cleanup);

beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });

    renderWithRedux(<CartItem item={cartItemData} />);
});

const cartItemData = {
    category: 'Starters',
    cloudinaryImageId: 'zmvekslitsgilzp01ck9',
    cropChoices: 2,
    description: '',
    displayOrder: 0,
    enabled: 1,
    id: 7516706,
    inStock: 1,
    isPopular: 0,
    isVeg: 1,
    itemDiscount: 0,
    itemScore: 0,
    name: 'Paneer Tukda Fry',
    price: 18900,
    recommended: 1,
    restId: '15896',
    showMC: 0,
    variants_new: {
        exclude_list: [],
        variant_groups: []
    },
    qty: 1
};

var adjustQty = false;
var removeFromCart = false;
var storeData = false;

function reducer(state = {}, action) {
    if (action.type == "ADJUST_ITEM_QTY") {
        adjustQty = true;
        return state;
    } else if (action.type == "REMOVE_FROM_CART") {
        removeFromCart = true;
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

describe("renders cart item card having ADJUST_QTY, REMOVE_FROM_CART and STORE_DATA action", () => {
    it("renders with redux", () => {
        expect(screen.getByTestId("cartitem_name")).toBeInTheDocument();
    });

    describe("renders all item details", () => {
        it("renders cartitem category", () => {
            expect(screen.getByTestId("cartitem_category")).toBeInTheDocument();
        });
        it("renders cartitem price", () => {
            expect(screen.getByTestId("cartitem_price")).toBeInTheDocument();
        });
        it("renders cartitem qty input button", () => {
            expect(screen.getByTestId("cartitem_qty_input")).toBeInTheDocument();
        });
    })

    it("dispatches ADJUST_ITEM_QTY and STORE_DATA action", () => {
        expect(adjustQty).toBe(false);
        expect(storeData).toBe(false);
        fireEvent.change(screen.getByTestId("cartitem_qty_input"), {target: {value: 4}});
        expect(adjustQty).toBe(true);
        expect(storeData).toBe(true);
    });

    it("dispatches REMOVE_FROM_CART and STORE_DATA action", () => {
        storeData = false;
        expect(removeFromCart).toBe(false);
        expect(storeData).toBe(false);
        fireEvent.click(screen.getByTestId("cartitem_remove"));
        expect(removeFromCart).toBe(true);
        expect(storeData).toBe(true);
    });
})