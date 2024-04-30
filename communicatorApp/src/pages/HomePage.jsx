import NonVerbal from "../assets/Non-Verbal-Communication.png";
import ArrowRight from '../assets/icons8-arrow-right-100.png';
import Header from "../components/Header.jsx";
import Instruction from '../assets/hand-tracking-mediapipe.png';
import './css/home.css';

function HomePage() {

    return(
        <>
            <Header/>
            <main>
                <div className={"grid-cols-4 pb-32 bg-transparent gap-5 col-span-4"}>
                    <div className={"flex relative main-container top-16"}>
                    <section className={"flex shadow-2xl pl-5 pt-10 content-center bg-white w-96 h-64 justify-center"}>
        <img src={Instruction} className={'w-32 rounded-full h-32'}/>
                        <div className={"flex ml-5  flex-col"}>
                            <h2 className={"font-bold text-2xl"}>Follow the Instructions</h2>
                            <p className={"mt-3"}>The instructions will be displayed on the screen. First you got tutorial to learn gestures from different countries!</p>
                        </div>
                    </section>
                      <img className={'w-32 h-32'} src={ArrowRight}/>
                        <section className={"flex shadow-2xl pl-5 pt-10 content-center bg-white w-96 h-64 justify-center"}>
                            <img src={NonVerbal} className={'w-32 rounded-full h-32'}/>
                            <div className={"flex ml-5  flex-col"}>
                                <h2 className={"font-bold text-2xl"}>Learn and recognize gestures</h2>
                                <p className={"mt-3"}>The instructions will be displayed on the screen. First you got tutorial to learn gestures from different countries!</p>
                            </div>
                        </section>
                        <img className={'w-32 h-32'} src={ArrowRight}/>
                        <section className={"flex shadow-2xl pb-1 pl-5 pt-10 content-center bg-white w-96 h-64 justify-center"}>
                            <img src={Instruction} className={'w-32 rounded-full h-32'}/>
                            <div className={"flex ml-5  flex-col"}>
                                <h2 className={"font-bold text-2xl"}>Play the game!</h2>
                                <p className={"mt-3"}>The instructions will be displayed on the screen. First you got tutorial to learn gestures from different countries!</p>
                                <button className={"mt-3 bg-green-900 w-32 rounded h-10"}><h4 className={"text-white text-xl"}>Play</h4></button>
                            </div>
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
