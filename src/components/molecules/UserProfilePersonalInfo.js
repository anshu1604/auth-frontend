import { Grid } from '@mui/material';
import InputField from '../atom/Input';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const UserProfilePersonalInfo = () => {

    return (
        <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputField label='First Name' required={true} type='email' />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputField label='Last Name' required={true} type='email' />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputField label='Email' required={true} type='email' />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputField label='Gender' type='email' />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid components={['DatePicker']}>
                        <DatePicker sx={{width:'100%'}} label="DOB" />
                    </Grid>
                </LocalizationProvider>
            </Grid>
        </Grid>
    );
}

export default UserProfilePersonalInfo;