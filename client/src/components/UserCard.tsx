import { FC } from "react";
import { UserCardProps } from "../types";
import { Avatar, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const UserCard: FC<UserCardProps> = ({ item: { firstName, lastName } }) => {
    return (
        <Stack
            className="user_card"
            direction={'row'}
            spacing={2}
            sx={{ py: 1 }}
            alignItems={'center'}
            padding={1}
        >
            <Avatar
                src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${firstName} ${lastName}`}
                sx={{
                    width: 32,
                    height: 32,
                    bgcolor: grey[400]
                }}
            />
            <Typography variant='subtitle2'>{firstName} {lastName}</Typography>
        </Stack>
    )
}

export default UserCard;