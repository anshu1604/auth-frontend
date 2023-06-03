import { Grid, Typography, Button } from "@mui/material";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useState } from "react";
import apiService from '../services/apiService';
import { config } from "../config";
import { emailValidator, otpValidator } from '../utils/validation';
import { useNavigate } from "react-router-dom";
import { Cookies } from "../utils/cookies";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../app/commonSlice";
import InputField from '../components/atom/Input';

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
    const [countDownMsg, setCountDownMsg] = useState('');
    const [joinOtpArray, setJoinOtpArray] = useState([]);

    //state varaibles ends

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
                if (apiTimer > 1) {
                    apiTimer = apiTimer - 1;
                    setCountDownMsg('OTP will expire in ' + apiTimer + ' seconds');
                    setIsResendDisable(true);
                } else {
                    clearInterval(x);
                    setCountDownMsg('OTP Expired');
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
        const otp = joinOtpArray.join('');
        const catchValidation = otpValidator(joinOtpArray.length);
        const { isValid, message } = catchValidation;
        setIsOtpValid(isValid);
        setValidationMessage(message);

        if (isValid) {
            const url = config.API_BASE_URL_DEV + '/api/otp/verify';
            const method = 'PUT';
            const payload = { email, otp: parseInt(otp) };
            const apiResponse = await apiService(url, method, payload);
            const snackbarDetails = {
                open: true,
                msg: apiResponse.message
            }
            dispatch(openSnackbar(snackbarDetails));
            setValidationMessage('');
            new Cookies('accessToken', apiResponse.data.accessToken).write();
            getToken();
            if (new Cookies().read() !== null) {
                setTimeout(() => navigate('/'), 4000);
            }
            setCountDownMsg('');
        }
    }
    const handleCreateOtp = (e, i, field1, len, field2) => {
        let otpArray = joinOtpArray;
        otpArray[i] = (e.target.value);
        setJoinOtpArray(otpArray)
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
                                <InputField name="email" label='Email' onChange={(e) => handleChange(e)} onKeyDown={(e) => handleEnter(e)} value={email} helperText={isEmailValid ? '' : <Typography color='error'>{validationMessage}</Typography>} />
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
                                                        <InputField value={joinOtpArray[i]} id={"otp" + i} type="string" required={true} inputProps={{ maxLength: 1, minLength: 1 }} onChange={(e) => handleCreateOtp(e, i, 'otp' + i, 1, 'otp' + (i + 1))} onKeyDown={(e) => handleEnter(e)} />
                                                    </Grid>
                                                );
                                            }
                                            return (
                                                <>
                                                    {textFieldArray}
                                                    {!isOtpValid && <Typography color='error' className="mx-2rem">{validationMessage}</Typography>}
                                                </>
                                            )
                                        })()}
                                    </Grid>

                                    {/* Bottom buttons section starts */}
                                    <Grid container className="mt-10">
                                        <Grid item lg={12}><TrendingFlatIcon onClick={handleVerifyOtp} /></Grid>
                                        {countDownMsg && <Grid item lg={12} className="mt-5vh center-text"><Typography>{countDownMsg}</Typography> </Grid>}
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