import React, {useEffect} from 'react';
import {Box} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Header from "../Header/index.jsx";

const AppLayout = ({children}) => {
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then((response) => {

            }).catch((error) => {
            if (error.response && error.response.status === 401) {
                navigate("/login")
            }
        })
    }, []);
    return (
        <Box>
            <Header/>
            {children}
        </Box>
    );
};

export default AppLayout;
