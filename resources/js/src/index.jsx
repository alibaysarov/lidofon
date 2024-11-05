import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {ChakraProvider,defaultSystem} from "@chakra-ui/react";

import React from "react";

ReactDOM.createRoot(document.getElementById("app")).render(
    <ChakraProvider value={defaultSystem}>
        <App/>
    </ChakraProvider>);
