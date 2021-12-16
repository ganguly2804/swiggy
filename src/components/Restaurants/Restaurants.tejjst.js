import React from "react";
import { createStore } from "redux";
import Provider from "react-redux";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Restaurants from "./Restaurants";

afterEach(cleanup);

jest.mock("./../../services/restaurantsData");
jest.setTimeout(20000);

function reducer(state = {}, action) {
    return state;
};

function renderWithRedux(
    component,
    { initialState, store = createStore(reducer, initialState) } = {}
) {
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    };
};

describe('renders Restaurants component with Restaurant cards', () => {
    it("renders with redux", (done) => {
        //const { getByText } = renderWithRedux(<Restaurants/>);
        const store = createStore(reducer, {})
        const { getByText } = render(
            //<Provider store={store}>
            <Restaurants />
            //</Provider>
        );
        setTimeout(() => {
            wrapper.update();
            console.log(wrapper.debug());
            expect(wrapper.find("Restaurant").at(1).text().includes("Polar Bear")).toBe(true);
            done();
        });
    });
    // it('Display restaurant information in card', done => {
    //   setTimeout(() => {
    //     wrapper.update();
    //     //console.log(wrapper.debug());
    //     expect(wrapper.find("Restaurant").at(1).text().includes("Polar Bear")).toBe(true);
    //     //expect(wrapper.find("Restaurant").at(1).text().includes("Deserts")).toBe(true);
    //     expect(wrapper.find("Restaurant").at(1).text().includes("4.3")).toBe(true);
    //     expect(wrapper.find("Restaurant").at(1).text().includes("22 MINS")).toBe(true);
    //     expect(wrapper.find("Restaurant").at(1).text().includes("300 FOR TWO")).toBe(true);
    //     done();
    //   });
    // });
});
