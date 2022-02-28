import React from "react";
import { Provider } from 'react-redux';
import { createStore } from "redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup, screen } from "@testing-library/react";
import Products from "./Products";

jest.mock("./../../services/menuData");

let wrapper;

afterEach(cleanup);

beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });

    var initialState = {
        orders: {
            currentRestaurant: {
                "id": "32474",
                "address": "417, M.S Reddy Layout, Opp. Mahabazaar Supermarket, Marathahalli, Bangalore",
                "avgRating": "3.8",
                "cloudinaryImageId": "qdvgwbz1b1pcttf1tifj",
                "costForTwo": 30000,
                "costForTwoString": "₹300 FOR TWO",
                "cuisines": [
                    "South Indian",
                    "Biryani",
                    "Kerala",
                    "North Indian",
                    "Chinese"
                ],
                "deliveryTime": 22,
                "name": "Thalassery Restaurant",
                "new": false,
                "totalRatings": 10000,
                "totalRatingsString": "10000+ ratings",
                "uuid": "84bab5f6-cc2d-46f5-887b-a1e0b64f118d",
                "veg": false
            }
        }
    };
    function reducer(state, action) {
        return state;
    };
    const store = createStore(reducer, initialState);
    wrapper = render(
        <Provider store={store}>
            <Router>
                <Products />
            </Router>
        </Provider>
    );
});

describe("renders the Products component", () => {
    it("displays the restaurant information at the top", done => {
        setTimeout(() => {
            expect(wrapper.getByText("Thalassery Restaurant")).toBeInTheDocument();
            done();
        });        
    });
    // it("renders the loading spinner before data is fetched", () => {
    //     expect(wrapper.getByTestId("loading")).toBeInTheDocument();
    // });
    it("fetches the menu data and renders the item cards with details", done => {
        setTimeout(() => {
            console.log(wrapper);
            expect(wrapper.getByText("Set Dosa")).toBeInTheDocument();
            done();
        });
    });
});