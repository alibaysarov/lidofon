import React, {useState} from 'react';
import useUserListQuery from "../../hooks/useUserListQuery.js";
import {Box, Flex, Input} from "@chakra-ui/react";
import UserItem from "../UserItem/index.jsx";
import Select from "../Select/index.jsx";
import Pagination from "../Pagination/index.jsx";

const UserList = () => {
    const [filter, setFilter] = useState({
        name: "",
        sort_name: "asc",
        sort_last_name: "asc",
        page: 1
    })
    const {isSuccess, data} = useUserListQuery(filter);
    const changePageHandler = (page) => {
        setFilter(prev => ({
            ...prev,
            page
        }))
    }
    const inputHandler = (e) => {
        console.log(e.target.value)
        setFilter(prev => ({
            ...prev,
            name: e.target.value,
        }))
    }
    const changeNameOrder = (e) => {
        setFilter(prev => ({
            ...prev,
            sort_name: e.value,
        }))
    }
    const changeLastNameOrder = (e) => {
        setFilter(prev => ({
            ...prev,
            sort_last_name: e.value,
        }))
    }
    const options = [
        {label: "А-Я", value: "asc"},
        {label: "Я-А", value: "desc"},

    ]
    return (
        <Box w={"100%"} maxW={"700px"} minW={"700px"}>
            <Flex alignItems={"center"} gap={"15px"} justifyContent={"space-between"}>
                <Input placeholder={"Поиск"} value={filter.name} onChange={inputHandler}/>
                <Flex gap={"5px"}>
                    <Select title={"Сортировать по имени"} value={filter.sort_name} handleChange={changeNameOrder}
                            width={"150px"} variants={options}/>
                    <Select title={"Сортировать по фамилии"} value={filter.sort_last_name}
                            handleChange={changeLastNameOrder} width={"150px"} variants={options}/>
                </Flex>
            </Flex>
            <Flex direction={"column"}>
                {
                    isSuccess &&
                    data.data.users.map((item) => (
                        <UserItem key={item.id} item={item}/>
                    ))
                }
            </Flex>
            {
                isSuccess && (
                    <Flex mt={"40px"} justifyContent={"center"} alignItems={"center"}>
                        <Pagination totalPages={data.data.total_pages} onPageChange={changePageHandler}/>
                    </Flex>
                )
            }

        </Box>
    );
};

export default UserList;
