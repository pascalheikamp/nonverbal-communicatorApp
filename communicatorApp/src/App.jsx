import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NonVerbal from '../src/assets/Non-Verbal-Communication.png'
import Logo from '../src/assets/logo-nonverbal.jpg'
import HomePage from "./pages/HomePage.jsx";
import Navigation from "./components/Navigation.jsx";
import Footer from "./components/Footer.jsx";

function App() {

    return (
        <>
            <body>
          <Navigation/>
            <HomePage/>
            <Footer/>
            </body>
        </>
    )
}

export default App
