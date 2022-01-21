import axios from "axios";

// eslint-disable-next-line
const getRestaurants = async (token) => {
    // console.log("Calling getRestaurants with token: ", token);

    const config = {
        url: '/restaurants',
        baseURL: 'https://food-power.glitch.me',
        headers: { 'Authorization': `Bearer ${token}` },
        // params: {
        //     limit: 5,
        //     lastDeliveryTime: 0,
        // }
    }

    let response = await axios(config)
        .then(res => {
            console.log(res.data);
            return res;
        })
        .catch(err => {
            console.log(err.response);
            // return err;
        });

    return response.data;
};

export default getRestaurants;