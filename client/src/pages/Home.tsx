import { Box } from "@mui/material";
import SideBar from "../components/SideBar";
import { Route, Routes } from 'react-router-dom'
import Welcome from "./Welcome";
import Chat from "../components/Chat";
import { FC } from "react";
import { HomeProps } from "../types";

const AllRoutes = () => {
    return (<Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/:id/:name" element={<Chat />} />
    </Routes>)
}

const Home: FC<HomeProps> = ({ setLoggedIn }) => {
    return (<Box
    display={'flex'}
    >
        <SideBar setLoggedIn={setLoggedIn} />
        <AllRoutes />
    </Box>)
}

export default Home;