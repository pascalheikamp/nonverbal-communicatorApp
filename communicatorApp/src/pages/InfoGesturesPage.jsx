import Navigation from "../components/Navigation.jsx";
import './css/infogestures.css'
import ChinaFlag from '../assets/china-flag.png'
import BrazilianFlag from '../assets/brazil-flag.png';
import OkaySign from '../assets/okay-sign.png'
import ArrowRight from '../assets/arrow-diagnaltoright.png'


function InfoGesturesPage() {

    return (
        <>
            <Navigation/>
            <section
                className={"mt-32 md:[clip-path:polygon(0%_0%,100%_0%,100%_90%,0%_50%)] bg-gray-100  h-auto w-auto"}>
                <div className={"flex ml-auto mr-auto flex-col"}>
                    <h1 className={"text-3xl text-center text-black"}>International gestures</h1>
                    <div className={"pb-96  grid mt-10 grid-cols-8 gap-6"}>
                        <div className={"col-start-2 flex justify-between"}>
                            <img
                            className={"w-10 mr-10 h-10 rounded-full"} src={ChinaFlag}/>
                            <img
                                className={"w-10 h-10 rounded-full"} src={BrazilianFlag}/>
                            <img className={"w-48 h-48"} src={OkaySign}/>
                        </div>
                        <div className={"col-span-4"}></div>
                        <div className={"flex relative right-96 justify-around"}>
                            <div className={"w-full pr-20"}><h2 className={"text-2xl text-left"}>THE OKAY</h2></div>
                            <div className={" content  h-auto pl-10 pr-10  w-full  shadow-2xl  rounded"}><h2
                                className={"text-2xl text-center"}>Brazil</h2><p>This is seen as obscene, and is equivalent to the one finger salute </p></div>
                            <div className={" content col-start-4 w-full pl-10 pr-10  ml-10 shadow-2xl  h-auto rounded"}>
                                <h2 className={"text-2xl text-center"}>China</h2><p>Indicates satisfaction</p></div>
                            <div className={" content col-start-4 pl-10 pr-10 w-full ml-10  shadow-2xl  h-32 rounded"}>
                                <h2 className={"text-2xl text-center"}>China</h2></div>
                        </div>
                        <div className={"col-start-2 flex justify-between"}>
                            <img
                                className={"w-10 mr-10 h-10 rounded-full"} src={ChinaFlag}/>
                            <img
                                className={"w-10 h-10 rounded-full"} src={BrazilianFlag}/>
                            <img className={"w-48 h-48"} src={OkaySign}/>
                        </div>
                        <div className={"col-span-4"}></div>
                        <div className={"flex relative right-96  justify-around"}>
                            <div className={"w-full pr-20 "}><h2 className={"text-2xl"}>THE HORN FINGERS</h2></div>
                            <div className={" content  h-auto pl-10 pr-10  w-full  shadow-2xl  rounded"}><h2
                                className={"text-2xl text-center"}>Brazil</h2><p>This is seen as obscene, and is equivalent to the one finger salute </p></div>
                            <div className={" content col-start-4 w-full pl-10 pr-10  ml-10 shadow-2xl  h-auto rounded"}>
                                <h2 className={"text-2xl text-center"}>China</h2><p>Indicates satisfaction</p></div>
                            <div className={" content col-start-4 pl-10 pr-10 w-full ml-10  shadow-2xl  h-32 rounded"}>
                                <h2 className={"text-2xl text-center"}>China</h2></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default InfoGesturesPage