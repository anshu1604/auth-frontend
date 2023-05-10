import { Grid, TextField } from '@mui/material';

const InputField = (props) => {
    const { name, label, value, helperText, onChange, onKeyDown, onKeyUp, type, required, inputProps, id } = props;
    return (
        <Grid>
            <TextField fullWidth id={id} name={name} label={label} value={value} type={type} required={required} inputProps={inputProps} helperText={helperText} onChange={onChange} onKeyDown={onKeyDown} onKeyUp={onKeyUp} />
        </Grid>
    );
}

export default InputField;