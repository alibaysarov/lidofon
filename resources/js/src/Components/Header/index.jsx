import React from 'react';
import {Box, Button, Flex, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <Box p={"10px"} shadow={"md"}>
            <Flex justifyContent={"space-between"}>
                <Text fontWeight={800} fontSize={"30px"} as={"h1"}>Test task</Text>
                <Flex gap={"10px"}>
                    <Button onClick={() => navigate('/register')}>Регистрация</Button>
                    <Button onClick={() => navigate('/login')} variant="subtle">Войти</Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Header;
