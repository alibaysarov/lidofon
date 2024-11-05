import React, {useEffect} from 'react';
import {Box, Flex, Input, Text, VStack, Button} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import useUserLoginMutation from "../../hooks/useUserLoginMutation.js";

const RegisterForm = () => {
    const navigate = useNavigate();
    const mutation = useUserLoginMutation()
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = data => {
        mutation.mutate(data)
    }
    useEffect(() => {
        if (mutation.isError) {
            console.log("an error occured");
        }
        if (mutation.isSuccess) {
            navigate("/");
        }
    })
    return (
        <Box w={"100%"} maxW={"600px"} shadow="md" p={"10px"} rounded={"sm"}>
            <VStack w={"100%"}>


                <form style={{width: "100%"}} onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap={"10px"}>
                        <Text fontSize={"22px"} fontWeight={700} as={"h2"}>Войти</Text>

                        <VStack w={"100%"} alignItems={"start"} gap={"5px"}>
                            <Text fontSize={"14px"}>Email</Text>
                            <Input {...register('email', {required: 'Email обязателен!'})}/>
                            {
                                errors.email && <Text colorScheme={"red"}>{errors.email.message}</Text>
                            }
                        </VStack>
                        <VStack w={"100%"} alignItems={"start"} gap={"5px"}>
                            <Text fontSize={"14px"}>Пароль</Text>
                            <Input {...register('password', {required: 'Пароль обязателен!'})}/>
                            {
                                errors.password && <Text colorScheme={"red"}>{errors.password.message}</Text>
                            }
                        </VStack>
                        <Button type={"submit"}>Войти</Button>
                    </VStack>

                </form>
            </VStack>
        </Box>
    );
};

export default RegisterForm;
