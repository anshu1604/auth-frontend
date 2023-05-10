import { Typography } from "@mui/material";
import Button from '../components/atom/Button';

const Page404 = () => {
    return (
        <>
            <Typography>404</Typography>
            <Typography>NOT FOUND</Typography>
            <Typography>Click the link below to continue browsing</Typography>
            <Button caption={'Get back to Home'} />
        </>
    );
}

export default Page404;