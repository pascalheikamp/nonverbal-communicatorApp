import Image from '../assets/hand-tracking-mediapipe.png';
import BackButton from '../assets/backButton.png';
import PoseOne from '../assets/pose1.png';
import ChinaFlag from '../assets/china-flag.png'
import ForwardButton from '../assets/forwardButton.png';
import {useRef, useState} from "react";
import Webcam from "react-webcam";
import './introduction.css';
import Slide from "./Slide.jsx";

const IntroductionSlide = () => {
    const webcamRef = useRef(null);
    // const slideContainer = useRef(null)
    // const secondSlide = <div className={" ml-7"}><h2 className={"font-bold text-xl"}>Step 2: Observation of the
    //     pose</h2><p className={"mt-3"}>Look at the pose that is displayed on the screen.</p>
    //     <p>Try that pose!if you do it correctly, it will show up some information.</p>
    //     <p>The information tells you what the pose means and from which country it is. </p>
    // </div>
    const resultContainer = useRef(null);
    const [showCamera, setShowCamera] = useState(true)

    const slideData = [
        {
            id: "1",
            title: "Step 1: Observation of the pose:",
            description: "Look at the pose that is displayed on the screen.n" +
                "                    Try that pose!if you do it correctly, it will show up some information.\n" +
                "                    The information tells you what the pose means and from which country it is.",
            imageUrl: "../assets/hand-tracking-mediapipe.png"
        },
        {
            id: "2",
            title: "Step 2",
            description: "Description of slide 2",
            imageUrl:<Image/>
        },
        {
            id: "3",
            title: "Step 3",
            description: "Look at the pose that is displayed on the screen.n" +
                "                    Try that pose!if you do it correctly, it will show up some information.\n" +
                "                    The information tells you what the pose means and from which country it is.",
            imageUrl:<Image/>
        },
    ]

    const data = slideData.map((x) => x);
    const title = data[0].title;
    const description = data[0].description;
    const image =  data[0].imageUrl;
    const id = data.map((y) => (y.id))
    console.log(id);
    let contentSlide1  = [ { id:data[0].id,  title: data[0].title,  description: data[0].description, imageUrl:data[0].imageUrl}]
    let contentSlide2  = [ { id:data[1].id,  title: data[1].title,  description: data[1].description, imageUrl:data[1].imageUrl}]
    let contentSlide3  = [ { id:data[2].id, title: data[2].title,  description: data[2].description, imageUrl:data[2].imageUrl}]
    let contentSlides = [contentSlide1, contentSlide2, contentSlide3]
    // console.log(id)

    function showNextSlide(id, data) {

    }

    return (
        <>
            <section onLoad={() => {
                setInterval(() => {
                    resultContainer.current.style.opacity = "100%";
                    resultContainer.current.style.transition = " 1s ease-in-out"
                }, 1000);
            }} className={"flex justify-center pt-6"}>
                <div className={"absolute flex justify-evenly top-23 bg-transparent w-full  pl-10 pr-10"}>
                    <div>
                        <Webcam className={"mr-96 w-96 h-72"} hidden={showCamera}></Webcam>
                        <div className={"mr-40 mt-3 flex justify-around"}>
                            <button onClick={() => {
                                setShowCamera(false)
                            }} className={"bg-primaryColor w-36 rounded shadow-2xl h-10"}><p
                                className={"text-white"}>Open camera</p></button>
                            <button onClick={() => {
                                setShowCamera(true)
                            }} className={"bg-primaryColor shadow-2xl rounded ml-10 w-36 h-10"}>Close camera
                            </button>
                        </div>
                    </div>
                    <img className={"h-72 pr-10"} src={PoseOne}/>
                    <div ref={resultContainer} className={"bg-gray-50 result-container shadow-2xl h-72 w-full"}><h2
                        className={"text-2xl font-bold text-center pt-5"}>Chinese greeting</h2>
                        <img className={"w-12 h-12 relative left-10 bottom-10 rounded-full"} src={ChinaFlag}/>
                        <div className={"flex w-full pl-10 pr-5 justify-center"}>
                            <p>Fist-and-palm salute, a Chinese tradition, is performed to greet each other on formal
                                occasions such as the Spring Festival and weddings. Take a look at how Chinese do it on
                                the occasion of the Lunar New Year.</p>
                        </div>
                    </div>
                </div>
                <div
                    className={"w-full justify-evenly flex content-between bg-red-500 pt-5 mt-80 h-72 border-gray-50"}>
                    <Slide id={id} content={contentSlides.map((x)=>(x))}/>
                </div>
            </section>
        </>
    )
}

export default IntroductionSlide;