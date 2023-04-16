import { EighteenUpRatingSharp } from "@mui/icons-material";
import axios from "axios";

const apiService = async (url, method, payload) => {

    try {
        const response = await axios({
            url: url,
            method: method,
            data: (payload)
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default apiService;