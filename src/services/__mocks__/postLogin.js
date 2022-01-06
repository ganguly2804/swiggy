const fakeLoginResponse = (body) => {
    const { email, password } = body;
    if (email != "" && password != "") {
        return {
            "jwt": "dummytoken",
        }
    } else {
        return {
            "message": "Dummy error message",
        }
    }
}

const postLogin = async (body) => {
    return await new Promise(resolve => {
        resolve(fakeLoginResponse(body));
    });
};

export default postLogin;