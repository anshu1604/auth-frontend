import { Grid, Typography, TextField, Button } from "@mui/material";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useState } from "react";
import apiService from '../services/apiService';
import { config } from "../config";
import { emailValidator, otpValidator } from '../utils/validation';
import { useNavigate } from "react-router-dom";
import { Cookies } from "../utils/cookies";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../app/commonSlice";
import { Timer } from "@mui/icons-material";

const Login = (props) => {

    const { getToken } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // state variables starts

    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [validationMessage, setValidationMessage] = useState();
    const [isOtpValid, setIsOtpValid] = useState(true);
    const [isResendDisable, setIsResendDisable] = useState(true);

    //state varaibles ends

    let otpArray = [];

    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    const handleEnter = (e) => {
        if (e?.keyCode === 13) {
            if (e.target.name === 'email') {
                sendOtp(e);
            } else {
                handleVerifyOtp(e);
            }
        };
    }
    const sendOtp = async (e) => {
        e.preventDefault();
        const catchValidation = emailValidator(email);
        const { isValid, message } = catchValidation;
        setIsEmailValid(isValid);
        setValidationMessage(message);

        if (isValid) {
            const url = config.API_BASE_URL_DEV + '/api/otp/send';
            const method = 'POST';
            const payload = { email };
            const apiResponse = await apiService(url, method, payload);
            let apiTimer = apiResponse.data.otpExpirationTime * 60;
            let x = setInterval(() => {
                if (apiTimer >= 1) {
                    apiTimer = apiTimer - 1;
                    document.getElementById("countDown").innerHTML = apiTimer + "s ";
                    setIsResendDisable(true);
                } else {
                    clearInterval(x);
                    document.getElementById('countDown').innerHTML = 'OTP Expired';
                    setIsResendDisable(false);
                }
            }, 1000);

            setIsEmailSent(apiResponse.success);
            const snackbarDetails = {
                open: true,
                msg: apiResponse.message
            }
            dispatch(openSnackbar(snackbarDetails));
            setValidationMessage('');
        }
    }
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const otp = parseInt(otpArray.join(''));
        const catchValidation = otpValidator(otp);
        const { isValid, message } = catchValidation;
        setIsOtpValid(isValid);
        setValidationMessage(message);

        if (isValid) {
            const url = config.API_BASE_URL_DEV + '/api/otp/verify';
            const method = 'PUT';
            const payload = { email, otp };
            const apiResponse = await apiService(url, method, payload);
            otpArray = [];
            const snackbarDetails = {
                open: true,
                msg: apiResponse.message
            }
            dispatch(openSnackbar(snackbarDetails));
            setValidationMessage('');
            setTimeout(() => navigate('/'), 4000);
            new Cookies('accessToken', apiResponse.data.accessToken).write();
            getToken();
        }
    }
    const handleCreateOtp = (e, i) => {
        otpArray[i] = (e.target.value);
    }
    const autoTab = (field1, len, field2) => {
        if (field2 !== 'otp' + 4) {
            if (document.getElementById(field1).value.length === len) {
                document.getElementById(field2).focus();
            }
        }
    }

    return (
        <>
            <Grid container >

                {/* Image section starts */}
                <Grid item lg={6} md={6} sm={5} xs={1} display="flex" className="overflow-hide">
                    <img src='https://picsum.photos/1400/1080' alt='' />
                </Grid>
                {/* Image section ends */}

                {/* Login section starts */}
                <Grid item lg={6} md={6} sm={7} xs={11} display="flex">
                    <Grid item lg={4} md={3} sm={2} xs={1}></Grid>
                    <Grid item lg={4} md={6} sm={8} xs={10}>
                        <Grid className="vertical-center">

                            {/* Email section starts */}
                            <Grid>
                                <Typography variant="h4">Please enter your mail id</Typography>
                                <TextField fullWidth name="email" label='Email' onChange={(e) => handleChange(e)} onKeyDown={(e) => handleEnter(e)} value={email} helperText={isEmailValid ? '' : <Typography color='error'>{validationMessage}</Typography>} />
                                <TrendingFlatIcon onClick={sendOtp} />
                            </Grid>
                            {/* Email section ends */}

                            {/* Verify OTP section starts */}
                            {isEmailSent && (
                                <>
                                    <Grid container spacing={2} className="mt-10">
                                        <Grid className="mx-20">
                                            <Typography variant='h4' >verify your OTP</Typography>
                                            <Typography>An OTP has been sent to your mail id</Typography>
                                        </Grid>

                                        {(() => {
                                            const textFieldArray = [];
                                            for (let i = 0; i < 4; i++) {
                                                textFieldArray.push(
                                                    <Grid item lg={3} md={3} sm={3} xs={3} key={i} className="container">
                                                        <TextField id={"otp" + i} type="string" required={true} inputProps={{ maxLength: 1, minLength: 1 }} onChange={(e) => handleCreateOtp(e, i)} onKeyDown={(e) => handleEnter(e)} onKeyUp={(e) => autoTab('otp' + i, 1, 'otp' + (i + 1))} />
                                                    </Grid>
                                                );
                                            }
                                            return (
                                                <>
                                                    {textFieldArray}
                                                    {!isOtpValid && <Typography color='error'>{validationMessage}</Typography>}
                                                </>
                                            )
                                        })()}
                                    </Grid>

                                    {/* Bottom buttons section starts */}
                                    <Grid container className="mt-10">
                                        <Grid item lg={12}><TrendingFlatIcon onClick={handleVerifyOtp} /></Grid>
                                        <Grid item lg={12} className="mt-5vh center-text"><Typography id='countDown' /></Grid>
                                        <Grid item lg={12} className="center-text"><Button disabled={isResendDisable} onClick={(e) => sendOtp(e)}>Resend</Button></Grid>
                                    </Grid>
                                    {/* Bottom buttons section ends */}
                                    {/* Verify OTP section ends */}
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                {/* Login section ends */}
            </Grid>
        </>
    );
}

export default Login;