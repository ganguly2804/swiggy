import axios from "axios";

// eslint-disable-next-line
const getRestaurants = async (token) => {
    token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNoYXphbUBnbWFpbC5jb20iLCJzY29wZSI6ImN1c3RvbWVyIiwiYmF0Y2giOiIyMDIxIiwianRpIjoiNWJlNDNkZGItYmJmMy00MTdkLWE5MTctNGRjNzUxZTZhYjQzIiwiaWF0IjoxNjQyNTk5MTM1LCJleHAiOjE2NDI2MTM1MzV9.f4mfUrRWaarolhKJjB-81kUSlMMSwGraY2teM1Br_mk';
    console.log("Calling getRestaurants with token: ", token);

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
        .catch(err => {
            console.log(err.response);
            return err.response;
        });

    return response.data;
};

export default getRestaurants;