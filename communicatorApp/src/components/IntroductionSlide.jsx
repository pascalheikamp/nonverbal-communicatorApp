import Image from '../assets/hand-tracking-mediapipe.png';
import BackButton from '../assets/backButton.png';
import ForwardButton from '../assets/forwardButton.png';
import {useRef, useState} from "react";
import Webcam from "react-webcam";

const IntroductionSlide = () => {
    const webcamRef = useRef(null);
    const[showCamera, setShowCamera] = useState(false)
    return (
        <>
            <section className={"flex justify-center pt-6"}>
                <div className={"absolute flex justify-evenly top-23 bg-transparent w-full  pl-10 pr-10"}>
                    <div>
                        <Webcam className={"mr-96 w-96 h-72"} hidden={showCamera}></Webcam>
                        <div className={"mr-40 mt-3 flex justify-around"}>
                            <button className={"bg-primaryColor h-10"}><p className={"text-white"}>Open camera</p></button>
                        <button className={"bg-primaryColor h-10"}>Close camera</button>
                        </div>
                    </div>
                    <div className={"bg-gray-50 shadow-2xl h-72 w-full"}></div>
                </div>
                <div
                    className={"w-full justify-evenly flex content-between bg-gray-200 pt-5 mt-80 h-72 border-gray-50"}>
                    <div className={"flex"}>
                        <button className={"mr-20"}><img src={BackButton}/></button>
                        <img className={"w-52 h-52"} src={Image}/>
                        <div className={" ml-7"}><h2 className={"font-bold text-xl"}>Step 1: Observation of the
                            pose</h2><p className={"mt-3"}>Look at the pose that is displayed on the screen.</p>
                            <p>Try that pose!if you do it correctly, it will show up some information.</p>
                            <p>The information tells you what the pose means and from which country it is. </p>
                        </div>
                        <button className={"mr-32"}><img src={ForwardButton}/></button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default IntroductionSlide;