import { Button } from "@mui/material";

const CustomButton = (props) => {
    const { variant, href, caption, onClick } = props;
    return (
        <Button variant={variant} href={href} onClick={onClick}>
            {caption}
        </Button>
    );
}

export default CustomButton;