import axios from "axios";

// eslint-disable-next-line
const restaurantsData = async () => {
    const response = await axios.get("http://food-power.glitch.me/restaurants");
    return response;
};

export default restaurantsData;