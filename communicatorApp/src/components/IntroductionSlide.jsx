import Image from '../assets/hand-tracking-mediapipe.png';
import BackButton from '../assets/backButton.png';
import PoseOne from '../assets/pose1.png';
import ChinaFlag from '../assets/china-flag.png'
import Camera from "@mediapipe/camera_utils";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Slider from 'react-slick';
import ForwardButton from '../assets/forwardButton.png';
import {useEffect, useRef, useState} from "react";
import Webcam from "react-webcam";
import CameraArea from "./CameraArea.jsx";
import './introduction.css';
import Slide from "./Slide.jsx";
import kNear from "../kNear.js";
import {DrawingUtils, FilesetResolver, HandLandmarker} from "@mediapipe/tasks-vision";

const IntroductionSlide = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const resultContainer = useRef(null);
    const [showCamera, setShowCamera] = useState(true);
    let handLandMarker;
    let lastVideoTime = -1;
    let pose;
    let currentPrediction = true
    let machine = new kNear(3);

    // useEffect(() => {
    //     createHandLandMarker().then(detectLandMarks);
    //     getPosesFromLocalStorage()
    // }, []);

    // const createHandLandMarker = async () => {
    //     const vision = await FilesetResolver.forVisionTasks(
    //         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    //     );
    //     handLandMarker = await HandLandmarker.createFromOptions(vision, {
    //         baseOptions: {
    //             modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
    //             delegate: "GPU"
    //         },
    //         runningMode: "VIDEO",
    //         numHands: 2
    //     })
    // }

    // const detectLandMarks = () => {
    //     if (
    //         typeof webcamRef.current !== "undefined" &&
    //         webcamRef.current !== null
    //     ) {
    //         if (!webcamRef.current?.video) return
    //         const canvasElement = canvasRef.current;
    //         const canvasCtx = canvasElement.getContext("2d");
    //         const drawingUtils = new DrawingUtils(canvasCtx);
    //         const camera = new Camera(webcamRef.current.video, {
    //             onFrame: async () => {
    //                 if (!webcamRef.current?.video) return
    //                 let startTimeMs = performance.now();
    //                 if (lastVideoTime === webcamRef.current.video.currentTime) return
    //                 lastVideoTime = webcamRef.current.video.currentTime
    //                 const result = await handLandMarker.detectForVideo(webcamRef.current.video, startTimeMs);
    //                 canvasCtx.save();
    //                 canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    //                 if (result.landmarks) {
    //                     console.log(result)
    //                     pose = result.landmarks
    //                     // console.log(pose);
    //                     if (currentPrediction) {
    //                         predictPose(pose);
    //                     }
    //                     for (const landmark of result.landmarks) {
    //                         drawingUtils.drawLandmarks(landmark, {
    //                             radius: 3, color: "green"
    //                         })
    //                         drawingUtils.drawConnectors(landmark, HandLandmarker.POSE_CONNECTIONS);
    //                     }
    //                     canvasCtx.restore();
    //                 }
    //             },
    //             width: 640,
    //             height: 480,
    //         });
    //         camera.start();
    //     }
    // }


    // function getPosesFromLocalStorage() {
    //     let coordinates = JSON.parse(localStorage.getItem("coordinates"));
    //     if (!coordinates) return
    //     for (const coordinate of coordinates) {
    //         machine.learn(coordinate.landmarks, coordinate.label)
    //     }
    //     console.log(coordinates);
    // }

    // const predictPose = (results) => {
    //     let landmarkResultList = [];
    //     if (!results[0]) return
    //     for (let landmarkPose of results[0]) {
    //         landmarkResultList.push(landmarkPose.x, landmarkPose.y);
    //     }
    //     console.log(landmarkResultList);
    //     let prediction = machine.classify(landmarkResultList);
    //     console.log(prediction);
    // }


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
            title: "Step 2: Remember the pose name",
            description: "Do the pose without seeing how the pose looks! The only thing that is displayed is the pose name.\n" +
                "If you do it correctly there will show up a green marker other wise you receive a red marker. (Note: take a look at international gestures page to learn the poses)"
            ,
            imageUrl: <Image/>
        },
        {
            id: "3",
            title: "Step 3: Play the game!",
            description: "If you know the poses, you will be ready for a new challenge! Click on the button to play the game",
            imageUrl: <Image/>
        },
    ]

    const data = slideData.map((x) => x);
    const title = data[0].title;
    const description = data[0].description;
    const image = data[0].imageUrl;
    const id = data.map((y) => (y.id))
    console.log(id);
    let contentSlide1 = [{
        id: data[0].id,
        title: data[0].title,
        description: data[0].description,
        imageUrl: data[0].imageUrl
    }]
    let contentSlide2 = [{
        id: data[1].id,
        title: data[1].title,
        description: data[1].description,
        imageUrl: data[1].imageUrl
    }]
    let contentSlide3 = [{
        id: data[2].id,
        title: data[2].title,
        description: data[2].description,
        imageUrl: data[2].imageUrl
    }]
    let contentSlides = [contentSlide1, contentSlide2, contentSlide3];
    // const renderContentSlides = ()=> {
    //     contentSlides.map((content, key) => <Slide key={key} content={content}/> )
    // }
    // console.log(id)

    const styleCam = {
        zIndex: 9,
        width: 390,
        height: 300,
        position: "absolute",
        visibility: true
    }

    const styleCanvas = {
        zIndex: 9,
        width: 390,
        height: 300,
        position: "absolute",
        visibility: true
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
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
                        <section>
                            <Webcam ref={webcamRef} hidden={showCamera} style={styleCam}/>
                            <canvas ref={canvasRef} style={styleCanvas}></canvas>
                        </section>
                        <div className={"mr-40 mt-80 flex justify-around"}>
                            <button onClick={() => {
                                setShowCamera(false)
                            }} className={"bg-green-300 w-36 rounded shadow-2xl h-10"}><p
                                className={"text-black"}>Open camera</p></button>
                            <button onClick={() => {
                                setShowCamera(true)
                            }} className={"bg-green-300 shadow-2xl rounded ml-10 w-36 h-10"}>Close camera
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
                    className={"w-full mb-10 bg-blue-50 justify-evenly flex content-between pt-5 mt-80 h-72 border-gray-50"}>
                    {/*<Slide id={id} content={contentSlides.map((x)=>(x))}/>*/}
                    <AliceCarousel  renderPrevButton={() => {
                        return  <button className={"relative right-32"}><img src={BackButton}/></button>
                    }}
                                    renderNextButton={() => {
                                        return  <button className={"relative left-32"}><img src={ForwardButton}/></button>
                                    }}>
                        {contentSlides.map((content, key) => <Slide key={key} content={content}/>)}
                    </AliceCarousel>
                </div>
            </section>
        </>
    )
}

export default IntroductionSlide;