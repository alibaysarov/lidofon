import React from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import LoginForm from "../../Components/LoginForm/index.jsx";

const Login = () => {
    return (
        <Box py={"40px"}>
            <Flex justifyContent={"center"} alignItems={"center"}>
                <LoginForm/>
            </Flex>
        </Box>
    );
};

export default Login;
