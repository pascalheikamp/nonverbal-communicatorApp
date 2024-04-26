import NonVerbal from "../assets/Non-Verbal-Communication.png";
import Header from "../components/Header.jsx";
import './css/home.css';

function HomePage() {

    return(
        <>
            <Header/>
            <main>
                <div className={"grid-cols-4 bg-transparent gap-5 col-span-4"}>
                    <div className={"flex relative main-container top-16"}>
                    <section className={"flex content-center bg-white w-40 h-64 justify-center"}>
                        <button className={"bg-blue-600 mx-auto mt-auto mb-auto rounded h-16 w-40"}><h4 className={" text-2xl text-white"}>Play the game</h4></button>
                    </section>
                    <section className={"flex content-center bg-white w-40 h-32 justify-center"}>
                        <button className={"bg-blue-600 mx-auto mt-auto mb-auto rounded h-16 w-40"}><h4 className={" text-2xl text-white"}>Plafrey the game</h4></button>
                    </section>
                    <section className={"flex content-center bg-white w-40 h-32 justify-center"}>
                        <button className={"bg-blue-600 mx-auto mt-auto mb-auto rounded h-16 w-40"}><h4 className={" text-2xl text-white"}>Play the game</h4></button>
                    </section>
                    </div>
                </div>
            </main>
            <aside>

            </aside>
            <footer></footer>
        </>
    )
}

export default HomePage;
