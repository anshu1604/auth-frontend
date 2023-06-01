import { Grid } from '@mui/material';
import InputField from '../atom/Input';
import DatePicker from '../atom/DatePicker';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { config } from '../../config';
import { Cookies } from '../../utils/cookies';
import apiService from '../../services/apiService';
import BUtton from '../atom/Button';


const UserProfilePersonalInfo = () => {

    const userProfile = useSelector(state => state.common.userInformation);

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userDob, setUserDob] = useState('');

    const url = config.API_BASE_URL_DEV + '/api/user/';
    const method = 'PUT';
    const payload = {
        "firstName": userFirstName,
        "lastName": userLastName,
        "email": userEmail,
        "mobile": '',
        "country": '',
        "dob": userDob,
        "gender": userGender
    };
    const readCookies = new Cookies().read();
    const headers = {
        token: readCookies
    }

    useEffect(() => {
        handleChange();
    }, [userProfile])


    const handleChange = (e) => {
        setUserFirstName(e ? e?.target?.value : userProfile?.data?.firstName);;
        setUserLastName(e ? e?.target?.value : userProfile?.data?.lastName);
        setUserEmail(e ? e?.target?.value : userProfile?.data?.email);
        setUserMobile(e ? e?.target?.value : userProfile?.data?.mobile);
        setUserGender(e ? e?.target?.value : userProfile?.data?.gender);
        setUserDob(e ? e?.target?.value : userProfile?.data?.dob);
    }
    const handleClick = (e) => {
        apiService(url, method, payload, headers);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField label='First Name' name='firstName' required={true} type='email' value={userFirstName} onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField label='Last Name' name='lastName' required={true} type='email' value={userLastName} onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField label='Email' name='email' required={true} type='email' value={userEmail} onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField label='Mobile' name='mobile' required={true} type='tel' value={userMobile} onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField label='Gender' name='gender' type='email' value={userGender} onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <DatePicker lable='DOB' value={userDob} />
                </Grid>
            </Grid>
            <Grid className='mt-10'>
                <BUtton variant='contained' caption='Save' onClick={handleClick} />
            </Grid>
        </>
    );
}

export default UserProfilePersonalInfo;