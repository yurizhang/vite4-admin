// import { Global, css } from '@emotion/react';
import React from "react";
import ReactDOM from "react-dom/client";
import {
    TonicProvider,
    colorStyle, // [optional] It's required only when you want to customize the color style
} from "@tonic-ui/react";

import { ConfigProvider, theme } from 'antd';
// import { StyleProvider } from '@ant-design/cssinjs';

import { BrowserRouter } from "react-router-dom";
import App from "./pages/App";
import "./assets/antd_reset.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("RootContainer") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <TonicProvider
                colorMode={{
                    defaultValue: "dark", // One of: 'dark', 'light'
                }}
                colorStyle={{
                    defaultValue: colorStyle, // Custom color style
                }}
                useCSSBaseline={true} // If `true`, apply CSS reset and base styles
            >
                
                    <ConfigProvider theme={{algorithm: theme.darkAlgorithm, token: {colorPrimary: '#1e5ede'}}}>
                        <App />
                    </ConfigProvider>
                
            </TonicProvider>
        </BrowserRouter>
    </React.StrictMode>
);
