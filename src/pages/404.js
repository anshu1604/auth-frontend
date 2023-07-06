import { Box, Typography, Avatar } from "@mui/material";
import CustomButton from "../components/atom/CustomButton";

const Page404 = () => {

    return (
        <>
            <Avatar alt='page-not-found' className="deviceHorizontalCenter" sx={{ width: 800, height: 800 }} src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000" />
            <Typography className="center-text">Click the link below to continue browsing</Typography>
            <Box className="center-text">
                <CustomButton caption={'Get back to Home'} href='/' />
            </Box>
        </>
    );
}

export default Page404;