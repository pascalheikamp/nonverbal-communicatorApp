import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import IntroPage from "./pages/IntroPage.jsx";
import App from './App.jsx'
import './index.css'
import HomePage from "./pages/HomePage.jsx";
import TrainPosePage from "./pages/TrainPosePage.jsx";
import InfoGesturesPage from "./pages/InfoGesturesPage.jsx";
import GamePage from "./pages/GamePage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [{
            path: "/",
            element: <HomePage/>
        }],
    },
    {
        path: 'introduction',
        element: <IntroPage/>
    },
    {
        path: "trainpose",
        element: <TrainPosePage/>
    },
    {
        path:"international-gestures",
        element: <InfoGesturesPage/>
    },
    {
        path:"game",
        element: <GamePage/>
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}>
            <App/>
        </RouterProvider>
    </React.StrictMode>,
)
