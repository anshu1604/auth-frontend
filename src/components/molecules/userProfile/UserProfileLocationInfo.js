import { Grid } from '@mui/material';
import InputField from '../../atom/Input';

const UserProfileLocationInfo = () => {
    return (
        <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputField label='Country' required={true} type='String' />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputField label='State' required={true} type='String' />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputField label='City' required={true} type='String' />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputField label='ZipCode' required={true} type='number' />
            </Grid>
        </Grid>
    );
}

export default UserProfileLocationInfo;