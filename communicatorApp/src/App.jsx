import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NonVerbal from '../src/assets/Non-Verbal-Communication.png'
import Logo from '../src/assets/logo-nonverbal.jpg'

function App() {

    return (
        <>
            <nav className={"block shadow-2xl nav bg-gray-50 h-28 w-full"}>
                <div className={"flex pt-10 list-none justify-around"}>
                    <li><h2 className={"text-2xl text-white"}>Communicator App</h2></li>
                    <li><h3 className={"text-white"}>Non vs verbal communication</h3></li>
                    <div className={''}>
                    <li><h3 className={"text-white"}>Signs</h3></li>
                    </div>
                    <li><h3 className={"text-white"}>Create your own sign</h3></li>
                </div>
            </nav>
            <header className={"bg-gradient-to-bl from-indigo-50 via-blue-100 to-blue-100 h-96 w-full"}>
                <div className={"grid pt-10"}>
                    <img src={NonVerbal} className={"h-60"}/>
                    <section>This is section one</section>
                    <section>This is section one</section>
                </div>
            </header>
            <main>
                <div className={"grid mt-10"}>
                    <section className={"flex justify-center"}>
                        <button className={"bg-blue-600 rounded h-16 w-40"}><h4 className={" text-2xl text-white"}>Play the game</h4></button>
                    </section>
                </div>
            </main>
            <aside>

            </aside>
            <footer></footer>
        </>
    )
}

export default App
