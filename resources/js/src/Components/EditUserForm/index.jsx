import React, {useEffect} from 'react';
import {Box, Flex, Input, Text, VStack, Fieldset, Field, Button, createToaster,} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useToast} from "@chakra-ui/toast"
import useUserRegistrationMutation from "../../hooks/useUserRegistrationMutation.js";
import {useNavigate} from "react-router-dom";
import {FaTrashAlt} from "react-icons/fa";
import useUserEditMutation from "../../hooks/useUserEditMutation.js";
import useDeleteUserMutation from "../../hooks/useDeleteUserMutation.js";

const EditUserForm = ({user}) => {
    const navigate = useNavigate();
    const mutation = useUserEditMutation(user.id);
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = data => {
        mutation.mutate(data)
    }
    const deleteToTrashMutation = useDeleteUserMutation(user.id);
    const deleteHardMutation = useDeleteUserMutation(user.id, "hard");
    const trashHandler = () => {
        deleteToTrashMutation.mutate()
    }
    const deleteHandler = () => {
        deleteHardMutation.mutate()
    }
    useEffect(() => {
        if (deleteToTrashMutation.isSuccess) {
            navigate("/");
        }
        if (deleteHardMutation.isSuccess) {
            navigate("/");
        }
    }, [deleteHardMutation, deleteHardMutation])
    return (
        <Box w={"100%"} maxW={"600px"} shadow="md" p={"10px"} rounded={"sm"}>
            <VStack w={"100%"}>


                <form style={{width: "100%"}} onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap={"10px"}>
                        <Text fontSize={"22px"} fontWeight={700} as={"h2"}>Регистрация</Text>

                        <VStack w={"100%"} alignItems={"start"} gap={"5px"}>
                            <Text fontSize={"14px"}>Имя</Text>
                            <Input {...register('name', {value: user.name, required: 'Имя обязательно!'})}/>
                            {
                                errors.name && <Text colorScheme={"red"}>{errors.name.message}</Text>
                            }
                        </VStack>
                        <VStack w={"100%"} alignItems={"start"} gap={"5px"}>
                            <Text fontSize={"14px"}>Фамилия</Text>
                            <Input {...register('last_name', {
                                value: user.last_name,
                                required: 'Фамилия обязательна!'
                            })}/>
                            {
                                errors.last_name && <Text colorScheme={"red"}>{errors.last_name.message}</Text>
                            }
                        </VStack>
                        <VStack w={"100%"} alignItems={"start"} gap={"5px"}>
                            <Text fontSize={"14px"}>Email</Text>
                            <Input type={"email"} {...register('email', {
                                value: user.email,
                                required: 'Email обязателен!'
                            })}/>
                            {
                                errors.email && <Text colorScheme={"red"}>{errors.email.message}</Text>
                            }
                        </VStack>
                        <Flex w={"100%"} mt={"40px"} justifyContent={"space-between"}>
                            <Flex gap={"5px"}>
                                <Button onClick={trashHandler} variant={"subtle"} colorPalette={"red"}>
                                    <FaTrashAlt/>
                                    В корзину
                                </Button>
                                <Button onClick={deleteHandler} colorPalette={"red"}>Удалить</Button>
                            </Flex>
                            <Button type={"submit"}>Сохранить</Button>
                        </Flex>
                    </VStack>

                </form>
            </VStack>
        </Box>
    );
};

export default EditUserForm;
