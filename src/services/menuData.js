import axios from "axios";

// eslint-disable-next-line
export default async (restaurantId) => {
    const response = await axios.get(`http://food-power.glitch.me/restaurant/${restaurantId}`);
    return response;
};