import React from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import RegisterForm from "../../Components/RegisterForm/index.jsx";

const Register = () => {
    return (
        <Box py={"40px"}>
            <Flex justifyContent={"center"} alignItems={"center"}>
                <RegisterForm/>
            </Flex>
        </Box>
    );
};

export default Register;
