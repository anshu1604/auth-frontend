import { Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { openSnackbar } from "../../app/commonSlice";

const SnackBar = () => {

    const isSnackbarOpen = useSelector((state) => state.common.isSnackbarOpen);
    const message = useSelector((state) => state.common.snackbarMessage);
    const dispatch = useDispatch();

    return (
        <Snackbar
            open={isSnackbarOpen}
            onClose={() =>  dispatch(openSnackbar(false))}
            autoHideDuration={3000}
            message={message}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
    );
}

export default SnackBar;