import axios from "axios";

const postSignup = async (body) => {
    const response = await axios.post('https://food-power.glitch.me/sign-up', body)
        .catch(err => {
            return err.response;
        });
    return response.data;
};

export default postSignup;