
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid } from '@mui/material';

const MyDatePicker = (props1) => {
    const { label, value } = props1;
    return (
        < LocalizationProvider dateAdapter={AdapterDayjs} >
            <Grid components={['DatePicker']}>
                <DatePicker sx={{ width: '100%' }} label={label} value={value} />
            </Grid>
        </LocalizationProvider >
    );
}

export default MyDatePicker;