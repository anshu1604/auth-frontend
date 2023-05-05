import { Snackbar } from "@mui/material";

const Snackbar = (props) => {

    const { message } = props;
    return (
        <Snackbar
            open={openSnackbar}
            onClose={() => { setOpenSnackbar(false) }}
            autoHideDuration={3000}
            message={message}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
    );
}

export default Snackbar;