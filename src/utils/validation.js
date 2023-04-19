import regex from "../constants/regex";

export const emailValidator = (param) => {
    return regex.email.pattern.test(param)
}

