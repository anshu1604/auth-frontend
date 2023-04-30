import { Grid, Link, Typography, Box } from "@mui/material";
import TempIcons from "../components/atom/TempIcons";

const Homepage = () => {

    let handleClick = () => {
        console.log('hi');
    }
    return (
        <>
            <Grid className="full-height home-bg" >
                <Grid className="center-text mt-20vh">
                    <Typography className="home-image-style" variant="h2" >Keep Calm</Typography>
                    <img src="https://uploads-ssl.webflow.com/5c1fc19d114105df46ff4ddb/5d640d75b1c595797842b305_man-meditating-in-nature-and-leaves-concept-illustration-for-yoga-meditation-relax-recreation-healthy-lifestyle-vector-illustration-in-flat-cartoon-style.png" />
                </Grid>
                <Grid className="center-text">
                    <TempIcons />
                </Grid>
            </Grid>

            <Grid id="section" class="demo">
                <Link onClick={handleClick}><Typography component="span" /></Link>
            </Grid>
        </>
    );
}

export default Homepage;