import { Box } from "@mui/material";
import SideBar from "../components/SideBar";
import { Route, Routes } from 'react-router-dom'
import Welcome from "./Welcome";
import Chat from "../components/Chat";

const AllRoutes = () => {
    return (<Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/:id/:name" element={<Chat />} />
    </Routes>)
}

const Home = () => {
    return (<Box
    display={'flex'}
    >
        <SideBar />
        <AllRoutes />
    </Box>)
}

export default Home;