import axios from "axios";

// eslint-disable-next-line
const postLogin = async (body) => {
    const response = await axios.post('http://food-power.glitch.me/login', { body })
    return response.data;
};

export default postLogin;