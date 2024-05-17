import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import IntroPage from "./pages/IntroPage.jsx";
import App from './App.jsx'
import './index.css'
import HomePage from "./pages/HomePage.jsx";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children: [{
            path: "/",
            element: <HomePage/>
        }],
    },
    {
        path:'introduction',
        element:<IntroPage/>
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}>
            <App/>
        </RouterProvider>
    </React.StrictMode>,
)
