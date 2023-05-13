import { Grid } from '@mui/material';
import InputField from '../atom/Input';

const UserProfileSecurityInfo = () => {
    return (
        <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputField label='password' required={true} type='Password' />
            </Grid>
        </Grid>
    );
}

export default UserProfileSecurityInfo;