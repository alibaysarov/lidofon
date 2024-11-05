import React from 'react';
import {
    Box,
    Button,
    DialogActionTrigger,
    DialogTrigger,
    DrawerTrigger,
    Flex,
    Text,
    Tooltip,
    TooltipRoot
} from "@chakra-ui/react";
import {FaTrashAlt} from "react-icons/fa";
import {forwardRef} from "react";
import {useNavigate} from "react-router-dom";
import useRestoreUserMutation from "../../hooks/useRestoreUserMutation.js";
const UserItem = ({item}) => {
    const navigate = useNavigate();
    const restoreUser = useRestoreUserMutation(item.id)
    const restoreHandler = () =>{
        restoreUser.mutate();
    }
    return (
        <Box w={"100%"} key={item.id} shadow={"sm"} rounded={"5px"} p={"10px"}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"22px"} fontWeight={600} as={"h3"}>{item.name} {item.last_name}</Text>
                <Flex gap={"10px"} alignItems={"center"}>
                    {
                        item.inTrash
                            ?<Button onClick={restoreHandler}  colorPalette={"green"}>Восстановить</Button>
                            :<Button onClick={()=>navigate(`/edit/${item.id}`)} variant={"subtle"}>Изменить</Button>
                    }
                </Flex>
            </Flex>
        </Box>
    );
};

export default UserItem;
