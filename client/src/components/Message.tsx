import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { MessageProps } from "../types";

const Message: FC<MessageProps> = ({ item: { text, date, direction } }) => {
    return (
        <Box
            display={'flex'}
            justifyContent={direction}
        >
            <Box
            >
                <Typography
                    sx={{ p: 1 }}
                    bgcolor={'white'}
                    variant='subtitle2'
                >{text}</Typography>
                <Typography
                    variant='caption'
                >{date}</Typography>
            </Box>
        </Box>
    )
}

export default Message;