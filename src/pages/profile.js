import { Container, Grid, Typography } from "@mui/material";
import PrimarySearchAppBar from "../components/atom/Navbar";
import Avatar from '@mui/material/Avatar';
import UserProfiletabs from '../components/molecules/UserProfileTabs';

const Profile = () => {

    return (
        <>
            <PrimarySearchAppBar />
            <Container className="mt-5vh">
                <Grid container spacing={2}>
                    <Grid item lg={6} className="mt-5vh">
                        <Typography className="profile-hi">Hi</Typography>
                        <Typography className="profile-fst-name">Anshu</Typography>
                        <Typography className="profile-lst-name">Sharma</Typography>
                        <Typography className="mt-5vh">Note:</Typography>
                        <Typography variant="caption">The personal information collected is only used by Info entrepreneurs staff for the purposes defined at the time of the collection or a use that complies with these purposes. We do not share your information with any third parties.</Typography>
                    </Grid>
                    <Grid item lg={6} >
                        <Avatar className="deviceCenter" sx={{ width: 500, height: 500 }} alt="Remy Sharp" src="https://media.istockphoto.com/id/1344963248/photo/studio-shot-of-an-attractive-young-woman-posing-against-a-grey-background.jpg?b=1&s=170667a&w=0&k=20&c=PrSBe8t1BEB4nBb67qldfLvmaBmTaUi6qQwl_H8X6rM=" />
                    </Grid>
                </Grid>
                <UserProfiletabs />
            </Container>
        </>
    );
}

export default Profile;