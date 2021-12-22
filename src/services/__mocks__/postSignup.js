const fakeSignupResponse = (body) => {
    const {name, email, password} = body;
    if (name != "" && email != "" && password != "") {
        return {
            "message": "user created, try to login",
        }
    } else {
        return {
            "message": "dummy error message",
        }
    }
}

const postSignup = async (body) => {
    return await new Promise(resolve => {
        resolve(fakeSignupResponse(body));
    });
};

export default postSignup;