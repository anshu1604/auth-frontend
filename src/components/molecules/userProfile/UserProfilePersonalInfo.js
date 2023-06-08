import { Grid } from '@mui/material';
import InputField from '../../atom/Input';
import DatePicker from '../../atom/DatePicker';
import { useState } from 'react';
import { config } from '../../../config';
import { Cookies } from '../../../utils/cookies';
import apiService from '../../../services/apiService';
import BUtton from '../../atom/Button';


const UserProfilePersonalInfo = (props) => {

    const { userProfileData, getUserDetails } = props;
    console.log(userProfileData)

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        gender: '',
        dob: ''
    });

    const url = config.API_BASE_URL_DEV + '/api/user/';
    const method = 'PUT';
    const payload = {
        "firstName": userData?.firstName,
        "lastName": userData?.lastName,
        "email": userData?.email,
        "mobile": userData?.mobile,
        "country": '',
        "dob": userData?.dob,
        "gender": userData?.gender
    };
    const readCookies = new Cookies().read();
    const headers = {
        token: readCookies
    }

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e?.target?.name]: e?.target?.value
        })
    }
    const handleClick = (e) => {
        apiService(url, method, payload, headers);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField label='First Name' name='firstName' required={true} type='email' value={userData?.firstName} onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField label='Last Name' name='lastName' required={true} type='email' value={userData?.lastName} onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField label='Email' name='email' required={true} type='email' value={userData?.email} onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField label='Mobile' name='mobile' required={true} type='tel' value={userData?.mobile} onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField label='Gender' name='gender' type='email' value={userData?.gender} onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <DatePicker lable='DOB' name='dob' value={userData?.dob} />
                </Grid>
            </Grid>
            <Grid className='mt-10'>
                <BUtton variant='contained' caption='Save' onClick={handleClick} />
            </Grid>
        </>
    );
}

export default UserProfilePersonalInfo;