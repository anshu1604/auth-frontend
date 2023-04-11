import { Grid, Typography } from "@mui/material";
import TextField from "../components/atom/Input";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const Login = () => {
    return (
        <>
            <Grid container >
                <Grid lg={6} md={6} sm={5} xs={1} display="flex" className="overflow-hide">
                    <img src='https://picsum.photos/1400/1080' />
                </Grid>
                <Grid lg={6} md={6} sm={7} xs={11} display="flex">
                    <Grid item lg={4} md={3} sm={2} xs={1}></Grid>
                    <Grid item lg={4} md={6} sm={8} xs={10}>
                        <Grid className="vertical-center">
                            <Grid>
                                <Typography variant="h4">Please enter your mail id</Typography>
                                <TextField label='Email' />
                                <TrendingFlatIcon />
                            </Grid>
                            <Grid container spacing={2} className="mt-10">
                                <Grid className="mx-20">
                                    <Typography variant='h4' >verify your OTP</Typography>
                                    <Typography>An OTP has been sent to your mail id</Typography>
                                </Grid>
                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                    <TextField />
                                </Grid>
                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                    <TextField />
                                </Grid>
                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                    <TextField />
                                </Grid>
                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                    <TextField />
                                </Grid>
                            </Grid>
                            <Grid container className="mt-10">
                                <Grid item lg={10}><TrendingFlatIcon /></Grid>
                                <Grid item lg={2}><Typography>Resend</Typography></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>



            {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <TrendingFlatIcon
                    id="outlined-adornment-password"
                    endAdornment={
                        <TrendingFlatIcon position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                            >
                            </IconButton>
                        </TrendingFlatIcon>
                    }
                    label="Password"
                />
            </FormControl> */}
        </>
    );
}

export default Login;