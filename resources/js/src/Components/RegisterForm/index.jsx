import React, {useEffect} from 'react';
import {Box, Flex, Input, Text, VStack, Fieldset, Field, Button, createToaster,} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useToast} from "@chakra-ui/toast"
import useUserRegistrationMutation from "../../hooks/useUserRegistrationMutation.js";
import {useNavigate} from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate();
    const mutation = useUserRegistrationMutation()
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = data => {
        mutation.mutate(data)
    }
    useEffect(() => {
        if(mutation.isError) {
            console.log("an error occured");
        }
        if(mutation.isSuccess) {
            navigate("/");
        }
    })
    return (
        <Box w={"100%"} maxW={"600px"} shadow="md" p={"10px"} rounded={"sm"}>
            <VStack w={"100%"}>


                <form style={{width: "100%"}} onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap={"10px"}>
                        <Text fontSize={"22px"} fontWeight={700} as={"h2"}>Регистрация</Text>

                        <VStack w={"100%"} alignItems={"start"} gap={"5px"}>
                            <Text fontSize={"14px"}>Имя</Text>
                            <Input {...register('name', {required: 'Имя обязательно!'})}/>
                            {
                                errors.name && <Text colorScheme={"red"}>{errors.name.message}</Text>
                            }
                        </VStack>
                        <VStack w={"100%"} alignItems={"start"} gap={"5px"}>
                            <Text fontSize={"14px"}>Фамилия</Text>
                            <Input {...register('last_name', {required: 'Фамилия обязательна!'})}/>
                            {
                                errors.last_name && <Text colorScheme={"red"}>{errors.last_name.message}</Text>
                            }
                        </VStack>
                        <VStack w={"100%"} alignItems={"start"} gap={"5px"}>
                            <Text fontSize={"14px"}>Email</Text>
                            <Input type={"email"} {...register('email', {required: 'Email обязателен!'})}/>
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
                        <VStack w={"100%"} alignItems={"start"} gap={"5px"}>
                            <Text fontSize={"14px"}>Подтвердить Пароль</Text>
                            <Input {...register('password_confirmation', {required: 'Пароль обязателен!'})}/>
                            {
                                errors.password_confirmation &&
                                <Text colorScheme={"red"}>{errors.password_confirmation.message}</Text>
                            }
                        </VStack>
                        <Button type={"submit"}>Зарегистрироваться</Button>
                    </VStack>

                </form>
            </VStack>
        </Box>
    );
};

export default RegisterForm;
