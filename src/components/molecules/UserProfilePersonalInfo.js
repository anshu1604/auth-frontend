import { Grid } from '@mui/material';
import InputField from '../atom/Input';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { config } from '../../config';
import { Cookies } from '../../utils/cookies';
import apiService from '../../services/apiService';

const UserProfilePersonalInfo = () => {

    const userProfile = useSelector(state => state.common.userInformation);

    const [userEmail, setUserEmail] = useState('');

    const url = config.API_BASE_URL_DEV + '/api/user/';
    const method = 'PUT';
    const payload = {
        "firstName": '',
        "lastName": '',
        "email": userEmail,
        "mobile": '',
        "country": '',
        "dob": '',
        "gender": ''
    };
    const readCookies = new Cookies().read();
    const headers = {
        token: readCookies
    }

    useEffect(() => {
        handleChange();
    }, [userProfile])

    const handleChange = (e) => {
        setUserEmail(e ? e?.target?.value : userProfile?.data?.email)
    }
    const handleClick = (e) => {
        apiService(url, method, payload, headers);
    }

    return (
        <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputField label='First Name' required={true} type='email' />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputField label='Last Name' required={true} type='email' />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputField label='Email' required={true} type='email' value={userEmail} onChange={(e) => handleChange(e)} onClick={handleClick()} />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputField label='Gender' type='email' />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid components={['DatePicker']}>
                        <DatePicker sx={{ width: '100%' }} label="DOB" />
                    </Grid>
                </LocalizationProvider>
            </Grid>
        </Grid>
    );
}

export default UserProfilePersonalInfo;