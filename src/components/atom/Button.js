import { Button } from "@mui/material";

const BUtton = (props) => {
    const { variant, href, caption } = props;
    return (
        <Button variant={variant} href={href}>
            {caption}
        </Button>
    );
}

export default BUtton;