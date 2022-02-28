import axios from "axios";

// eslint-disable-next-line
export default async (restaurantId) => {
    let response = await axios.get(`https://food-power.glitch.me/restaurant/${restaurantId}`);
    return response.data;
};