import { config } from "../config";

export const apiConfig = {
//user login API starts
SEND_OTP_API : config.API_BASE_URL + '/api/otp/send',
VERIFY_OTP_API : config.API_BASE_URL + '/api/otp/verify',
//user login API ends

//user API starts
USER_DATA_API : config.API_BASE_URL + '/api/user/',
//user API ends

//Location Rapid API starts
LOCATION_DATA_RAPID_API : 'https://pincode.p.rapidapi.com/',
//Location Rapid API ends


//other API starts
//other API ends
}