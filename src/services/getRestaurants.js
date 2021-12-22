import axios from "axios";

// eslint-disable-next-line
const getRestaurants = async () => {
    const token = "otze#gosa123jimpqytrem";
    const response = await axios.get("http://food-power.glitch.me/restaurants?limit=5&lastDeliveryTime=0", { headers: {"Authorization" : `Bearer ${token}`} });
    return response.data;
};

export default getRestaurants;