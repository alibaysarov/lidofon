import React, {useEffect} from 'react';
import {Text, Toaster} from "@chakra-ui/react";
import {Route, BrowserRouter as Router, Routes, useNavigate} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register/index.jsx";
import Home from "./Pages/Home/index.jsx";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import Header from "./Components/Header/index.jsx";
import axios from "axios";
import AppLayout from "./Components/AppLayout/index.jsx";
import EditUserPage from "./Pages/EditUserPage/index.jsx";

const App = () => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <AppLayout>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/edit/:id"} element={<EditUserPage/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/register"} element={<Register/>}/>
                    </Routes>
                </AppLayout>
            </Router>
        </QueryClientProvider>
    );
};

export default App;
