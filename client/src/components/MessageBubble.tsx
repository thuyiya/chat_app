import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { MessageProps } from "../types";
import { formatDateToTime } from "../utils/common";

const MessageBubble: FC<MessageProps> = ({ item: { text, createdAt, direction } }) => {
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
                >{formatDateToTime(createdAt)}</Typography>
            </Box>
        </Box>
    )
}

export default MessageBubble;