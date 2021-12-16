import React from 'react';
import { Provider } from 'react-redux';
import { configure, mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store';
import Restaurants from './Restaurants';
import { fakeRestaurantsData } from './fakeRestaurantsData';

const mockStore = configureStore([]);

configure({ adapter: new Adapter() });
jest.mock("./../../services/restaurantsData");
jest.setTimeout(20000);

describe('Test the Restaurants page', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = mount(
            <Restaurants />
        );
    });

    test('Check for Spinner component when data is not fetched', () => {
        expect(wrapper.find("Spinner").length).toBe(1);
    });

    test('Display 10 Restaurant Card components', () => {
        const restaurantsArr = [];
        (fakeRestaurantsData.data.data).forEach((item) => {
            restaurantsArr.push(item);
        });
        wrapper.setRestaurants = restaurantsArr;
        wrapper.setDataFetched = true;
        wrapper.update();
        console.log(wrapper.debug());
        expect(wrapper.find("Restaurant").length).toBe(10);
        //wrapper.find("Restaurant").at(1).prop('onClick');
    });

    // test('Display restaurant information in card', done => {
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