import React from 'react';
import {Box, Flex} from "@chakra-ui/react";
import UserList from "../../Components/UserList/index.jsx";

const Home = () => {
    return (
        <Box py={"40px"}>
            <Flex justifyContent={"center"} alignItems={"center"}>
                <UserList/>
            </Flex>
        </Box>
    );
};

export default Home;
