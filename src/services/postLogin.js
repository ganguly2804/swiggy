import axios from "axios";

const postLogin = async (body) => {
    const response = await axios.post('https://food-power.glitch.me/login', body)
        .catch(err => {
            return err.response;
        });
    return response.data;
};

export default postLogin;