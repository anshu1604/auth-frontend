import axios from "axios";

const apiService = async (url, method, email, otp) => {

    await axios({
        url: url,
        method: method,
        data: ({
            email: email,
            otp: otp
        })
    }).then(res => {
        const response = res.data;
        return response;
    }).catch(err => {
        console.log(err);
    })
}

export default apiService;