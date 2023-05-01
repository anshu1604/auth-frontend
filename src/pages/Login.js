import { Grid, Typography, TextField, Snackbar } from "@mui/material";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useState } from "react";
import apiService from '../services/apiService';
import { config } from "../config";
import { emailValidator, otpValidator } from '../utils/validation';
import { setCookies } from "../utils/cookies";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    // state variables starts

    const [email, setEmail] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [data, setData] = useState();
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [validationMessage, setValidationMessage] = useState();
    const [isOtpValid, setIsOtpValid] = useState(true);

    //state varaibles ends

    let otpArray = [];

    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    const handleAddEmail = async (e) => {
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
            setIsEmailSent(apiResponse.success);
            setData(apiResponse);
            setOpenSnackbar(true);
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
            setData(apiResponse);
            otpArray = [];
            setOpenSnackbar(true);
            setValidationMessage('');
            setTimeout(navigate('/'), 2000);
            setCookies('accessToken', apiResponse.data.accessToken);
        }
    }
    const handleCreateOtp = (e, i) => {
        otpArray[i] = (e.target.value);
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
                                <TextField fullWidth label='Email' onChange={(e) => handleChange(e)} value={email} helperText={isEmailValid ? '' : <Typography color='error'>{validationMessage}</Typography>} />
                                <TrendingFlatIcon onClick={handleAddEmail} />
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
                                                    <Grid item lg={3} md={3} sm={3} xs={3}>
                                                        <TextField type="string" required={true} inputProps={{ maxLength: 1, minLength: 1 }} onChange={(e) => handleCreateOtp(e, i)} />
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
                                        <Grid item lg={10}><TrendingFlatIcon onClick={handleVerifyOtp} /></Grid>
                                        <Grid item lg={2}><Typography>Resend</Typography></Grid>
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
            <Snackbar
                open={openSnackbar}
                onClose={() => { setOpenSnackbar(false) }}
                autoHideDuration={3000}
                message={data?.message}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
        </>
    );
}

export default Login;