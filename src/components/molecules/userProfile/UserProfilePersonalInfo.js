import { Grid } from '@mui/material';
import InputField from '../../atom/Input';
import DatePicker from '../../atom/DatePicker';
import { useEffect, useState } from 'react';
import { Cookies } from '../../../utils/cookies';
import apiService from '../../../services/apiService';
import { apiConfig } from '../../../services/apiconfig';
import userModel from '../../../services/models/userModel';
import CustomButton from '../../atom/CustomButton';

const UserProfilePersonalInfo = (props) => {

    //catching props starts
    const { userProfileData, getUserDetails } = props;
    //catching props ends

    //state variables starts
    const [userData, setUserData] = useState(userProfileData);
    //state variables ends

    useEffect(() => {
        setUserData(userProfileData);
    }, [userProfileData])


    //post api data starts
    const handleClick = (e) => {
        const url = apiConfig.USER_DATA_API;
        const method = 'PUT';
        const payload = userModel(userData, method);
            const readCookies = new Cookies().read();
        const headers = {
            token: readCookies
        }
        apiService(url, method, payload, headers);
        getUserDetails();
    }
    //post api data ends

    //input fields on change starts
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e?.target?.name]: e?.target?.value
        })
    }
    //input fields on change ends

    return (
        <>
            <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField label='First Name' name='userFirstName' required={true} type='text' value={userData?.userFirstName || ''} onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField label='Last Name' name='userLastName' required={true} type='text' value={userData?.userLastName || ''} onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField label='Email' name='userEmail' required={true} type='email' value={userData?.userEmail || ''} onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField label='Mobile' name='userMobileNumber' required={true} type='tel' value={userData?.userMobileNumber || ''} onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField label='Gender' name='userGender' type='text' value={userData?.userGender || ''} onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <DatePicker lable='DOB' name='userDob' value={userData?.userDob || ''} />
                </Grid>
            </Grid>
            <Grid className='mt-10'>
                <CustomButton variant='contained' caption='Save' onClick={handleClick} />
            </Grid>
        </>
    );
}

export default UserProfilePersonalInfo;