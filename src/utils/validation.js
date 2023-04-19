import regex from "../constants/regex";

export const emailValidator = (param) => {

    const isValid = regex.email.pattern.test(param);
    const message = regex.email.message;

    const data = { isValid, message };
    return data;

}

export const otpValidator =(param) => {
    const isValid = regex.otp.length === param.toString().length;
    const message = regex.otp.message;

    const data = {isValid, message};
    return data;
}

