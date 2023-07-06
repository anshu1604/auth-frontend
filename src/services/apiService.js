import axios from "axios";

const apiService = async (url, method, payload, headers) => {

    try {
        const response = await axios({
            url: url,
            method: method,
            data: payload,
            headers: headers,
        })
        return (
            response.data
        );
    } catch (error) {
        return error.response.data;
    }
}

export default apiService;