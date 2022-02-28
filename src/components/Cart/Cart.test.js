import React from "react";
import { Provider } from 'react-redux';
import { createStore } from "redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { screen, render, cleanup } from "@testing-library/react";
import Cart from "./Cart";

let wrapper;

var initialState = {
    orders: {
        cart: [
            {
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
            },
            {
                category: 'Starters',
                cloudinaryImageId: 'stxpbryoxbig9e7kkbm9',
                cropChoices: 2,
                description: '',
                displayOrder: 0,
                enabled: 1,
                id: 7516707,
                inStock: 1,
                isPopular: 0,
                isVeg: 0,
                itemDiscount: 0,
                itemScore: 0,
                name: 'Chicken 65',
                price: 19900,
                recommended: 1,
                restId: '15896',
                ribbon: {
                    bottomBackgroundColor: '#b02331',
                    text: 'BESTSELLER',
                    textColor: '#ffffff',
                    topBackgroundColor: '#d53d4c'
                },
                showMC: 0,
                variants_new: {
                    exclude_list: [],
                    variant_groups: []
                },
                qty: 2
            },
            {
                category: 'Biryanis',
                cloudinaryImageId: 'qcej4dixp2hcfvctiiwi',
                cropChoices: 2,
                description: '',
                displayOrder: 0,
                enabled: 1,
                id: 7516709,
                inStock: 1,
                isPopular: 0,
                isVeg: 1,
                itemDiscount: 0,
                itemScore: 0,
                name: 'Veg Biryani',
                price: 21900,
                recommended: 1,
                restId: '15896',
                ribbon: {
                    bottomBackgroundColor: '#b02331',
                    text: 'BESTSELLER',
                    textColor: '#ffffff',
                    topBackgroundColor: '#d53d4c'
                },
                showMC: 0,
                variants_new: {
                    exclude_list: [],
                    variant_groups: [
                        {
                            group_id: '725504',
                            name: 'Quantity',
                            variations: [
                                {
                                    'default': 0,
                                    id: '2568582',
                                    inStock: 1,
                                    isVeg: 1,
                                    name: 'Family',
                                    order: 999,
                                    price: 47200,
                                    variant_group_id: '725504'
                                },
                                {
                                    'default': 0,
                                    id: '2568581',
                                    inStock: 1,
                                    isVeg: 1,
                                    name: 'Large',
                                    order: 998,
                                    price: 28300,
                                    variant_group_id: '725504'
                                },
                                {
                                    'default': 0,
                                    id: '2568580',
                                    inStock: 1,
                                    isVeg: 1,
                                    name: 'Full',
                                    order: 997,
                                    price: 13600,
                                    variant_group_id: '725504'
                                },
                                {
                                    'default': 0,
                                    id: '2568579',
                                    inStock: 1,
                                    isVeg: 1,
                                    name: 'Regular',
                                    order: 996,
                                    price: 6300,
                                    variant_group_id: '725504'
                                },
                                {
                                    'default': 1,
                                    id: '2568578',
                                    inStock: 1,
                                    isVeg: 1,
                                    name: 'Half',
                                    order: 995,
                                    price: 0,
                                    variant_group_id: '725504'
                                }
                            ]
                        }
                    ]
                },
                qty: 1
            }
        ],
        credentials: {
            email: 'noman12@gmail.com',
            password: 'noman12',
            name: 'noman buddy',
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5vbWFuMTJAZ21haWwuY29tIiwic2NvcGUiOiJjdXN0b21lciIsImJhdGNoIjoiMjAyMSIsImp0aSI6Ijc3NmYxNjQ2LWFiOWItNDkxZS04YTMxLWUyNGIyZDQ0NGM4MSIsImlhdCI6MTY0NjAxOTQ2NCwiZXhwIjoxNjQ2MDYyNjY0fQ.79Njw46XM9UbiHALr1j2n2OZJOX-Tt8DQu-r51YFNh0'
        }
    }
};

var storePrice = false;
var storeData = false;

function reducer(state = initialState, action) {
    if (action.type == "STORE_PRICE") {
        storePrice = true;
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

afterEach(cleanup);

beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });

    renderWithRedux(<Cart />);
});

describe("renders the Cart component", () => {
    it("displays the Cart summary", () => {
        expect(screen.getByTestId("cart_summary")).toBeInTheDocument();
    });
    it("fetches the items data and renders the item cards with details", () => {
        expect(screen.getByText(initialState.orders.cart[0].name)).toBeInTheDocument();
    });
});