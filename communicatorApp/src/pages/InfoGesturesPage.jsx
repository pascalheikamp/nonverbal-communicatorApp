import Navigation from "../components/Navigation.jsx";
import './css/infogestures.css'
import ChinaFlag from '../assets/china-flag.png'


function InfoGesturesPage() {

    return (
        <>
            <Navigation/>
            <section
                className={"mt-32 container md:[clip-path:polygon(0%_0%,100%_0%,100%_90%,0%_50%)]  bg-green-300  h-auto w-auto"}>
                <div className={"flex ml-auto mr-auto flex-col"}>
                    <h1 className={"text-3xl text-center text-white"}>International gestures</h1>
                    <div className={"pb-96  grid mt-10 grid-cols-5"}>
                        <div className={"col-span-4"}></div>
                        <div className={"col-start-2 flex justify-between"}>
                        <div className={"content pt-5  shadow-2xl w-auto flex flex-row h-32 rounded"}><img
                            className={"w-14 h-14 rounded-full"} src={ChinaFlag}/> <h2
                            className={"mr-auto ml-auto"}>Test</h2> <h2 className={"mr-auto ml-auto"}>Test</h2></div>
                            <div>Hello</div>
                        </div>
                        <div className={"col-span-4"}></div>
                        <div className={"content  col-start-4 shadow-2xl w-auto h-32 rounded"}>1</div>
                        <div className={"col-span-4"}></div>
                        <div className={"content col-start-2 w-auto shadow-2xl h-32 rounded"}>1</div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default InfoGesturesPage