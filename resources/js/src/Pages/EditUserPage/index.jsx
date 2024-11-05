import React, {useEffect} from 'react';
import {Box, Flex} from "@chakra-ui/react";
import EditUserForm from "../../Components/EditUserForm/index.jsx";
import useSingleUserQuery from "../../hooks/useSingleUserQuery.js";
import {useParams} from "react-router-dom";

const EditUserPage = () => {
    const params = useParams();
    console.log("params ", params);
    const {data, isSuccess} = useSingleUserQuery(params.id);
    useEffect(() => {
        if (isSuccess) {
            console.log(data)
        }
    }, [isSuccess])
    return (
        <Box p={"40px"}>
            <Flex justifyContent={"center"} alignItems={"center"}>
                {
                    isSuccess && <EditUserForm user={data.data} />
                }
            </Flex>
        </Box>
    );
};

export default EditUserPage;
