import Navigation from "../components/Navigation.jsx";
import CameraArea from "../components/CameraArea.jsx";
import {Camera} from "@mediapipe/camera_utils";
import {FilesetResolver, HandLandmarker, DrawingUtils} from "@mediapipe/tasks-vision";
import GreenCheck from '../assets/green-check.png';
import WrongMarker from '../assets/wrong-marker.png'
import {useEffect, useRef, useState} from "react";
import kNear from "../kNear.js";
import Webcam from "react-webcam";


function GamePage() {
    const canvasRef = useRef(null);
    const resultContainer = useRef(null);
    const errorMessageRef = useRef(null);
    const webcamRef = useRef(null);
    const poseNameRef = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const [randomPoseName, setRandomPoseName] = useState("");
    const [prediction, setPrediction] = useState("");
    const [goodAnswer, setGoodAnwser] = useState(false);
    const [timer, setTimer] = useState(5);
    const [showMessage, setShowMessage] = useState("visible");
    const [disableToggle, setDisableToggle] = useState(true);
    let trainPose = false
    let currentPrediction = true;
    let lastVideoTime = -1
    let pose;
    let handLandMarker;
    let machine = new kNear(3);

    // function handleInputChange(event) {
    //     setInputValue(event.target.value);
    //     if (inputValue.trim() === "") {
    //         setShowMessage("visible")
    //         setDisableToggle(true);
    //     }
    //     else if(event.target.value.length === 0) {
    //         setShowMessage("visible")
    //         setDisableToggle(true)
    //     }
    //     else if(event.target.value.length > 0) {
    //         setShowMessage("hidden")
    //         setDisableToggle(false);
    //     }
    // }
    useEffect(() => {
        createHandLandMarker().then(detectLandMarks);
        getPosesFromLocalStorage();

        const interval = setInterval(() => {
            updateTime();
        }, 1000);

        return () => {
            console.log(`clearing interval`);
            clearInterval(interval);
        };

    }, [timer]);

    function updateTime() {
        const newTime = timer -1
        setTimer(newTime);
        if(timer === 0) {
            setTimer(5);
        }
    }

    const toggleTrainPose = () => {
        setInterval(() => {
            trainPose = !trainPose
            console.log(trainPose)
        }, 5000)
    }

    const togglePredictPose = () => {
        currentPrediction = !currentPrediction
    }


    const registerPose = (poseDetection, landmarkResults) => {
        if (!landmarkResults[0]) return
        let landmarkResultList = landmarkResults[0]?.flatMap(landmarkPose => [landmarkPose.x, landmarkPose.y]) || [];
        console.log(landmarkResultList)

        addToLocalStorage(poseDetection, landmarkResultList)
    }

    function getPosesFromLocalStorage() {
        let coordinates = JSON.parse(localStorage.getItem("coordinates"));
        if (!coordinates) return
        for (const coordinate of coordinates) {
            setRandomPoseName(coordinate.label);
            machine.learn(coordinate.landmarks, coordinate.label)
        }
        console.log(coordinates);
    }

    function getRandomPoseName() {
        let names = ["Angry Itilian", "Chinese greeting"]
        const randomIndex = Math.floor(Math.random() * names.length);
        setRandomPoseName(names[randomIndex]);
        console.log(randomPoseName);
    }

    const predictPose = (results) => {
        let landmarkResultList = [];
        if (!results[0]) return
        for (let landmarkPose of results[0]) {
            landmarkResultList.push(landmarkPose.x, landmarkPose.y);
        }
        console.log(landmarkResultList);
        let prediction = machine.classify(landmarkResultList);
        setPrediction(prediction);
        if(prediction === randomPoseName) {
            setGoodAnwser(true);
        } else {
            setGoodAnwser(false);
        }
    }

    const addToLocalStorage = (pose, landmarks) => {
        let poseObj = {
            label: pose,
            landmarks: landmarks
        }
        let storage = localStorage.getItem("coordinates")
        let parsedList = JSON.parse(storage);
        if (parsedList == null) {
            parsedList = []
        }
        parsedList.push(poseObj);
        let stringifiedList = JSON.stringify(parsedList);
        localStorage.setItem("coordinates", stringifiedList)
    }
    const createHandLandMarker = async () => {
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        handLandMarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                delegate: "GPU"
            },
            runningMode: "VIDEO",
            numHands: 2
        })
    }

    const detectLandMarks = () => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null
        ) {
            if (!webcamRef.current?.video) return
            const canvasElement = canvasRef.current;
            const canvasCtx = canvasElement.getContext("2d");
            const drawingUtils = new DrawingUtils(canvasCtx);
            const camera = new Camera(webcamRef.current.video, {
                onFrame: async () => {
                    if (!webcamRef.current?.video) return
                    let startTimeMs = performance.now();
                    if (lastVideoTime === webcamRef.current.video.currentTime) return
                    lastVideoTime = webcamRef.current.video.currentTime
                    const result = await handLandMarker.detectForVideo(webcamRef.current.video, startTimeMs);
                    canvasCtx.save();
                    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    if (result.landmarks) {
                        pose = result.landmarks
                        // console.log(pose);
                        if (currentPrediction) {
                            predictPose(pose);
                        }
                        for (const landmark of result.landmarks) {
                            drawingUtils.drawLandmarks(landmark, {
                                radius: 3, color: "green"
                            })
                            drawingUtils.drawConnectors(landmark, HandLandmarker.POSE_CONNECTIONS);
                        }
                        canvasCtx.restore();
                    }
                },
                width: 640,
                height: 480,
            });
            camera.start();
        }
    }

    const styling = {
        position: "absolute",
        top: 200,
        marginRight: "auto",
        marginLeft: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 9,
        width: 640,
        height: 480
    }
    return (
        <>
            <Navigation/>
            <main className={""}>
                <section className={"mt-20 ml-auto flex justify-center"}>
                    <Webcam ref={webcamRef} style={styling}/>
                    <canvas ref={canvasRef} style={{
                        position: "absolute",
                        top: 200,
                        marginRight: "auto",
                        marginLeft: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zIndex: 9,
                        width: 640,
                        height: 480
                    }}></canvas>
                </section>
                <div className={"relative bottom-10 flex justify-around"}>
                    <div className={""}>
                        <h2 className={"text-xl"}>Name of pose:</h2>
                        <p className={"text-center mt-10"}>{randomPoseName}</p>
                        <div ref={resultContainer} className={"mt-10"}>{goodAnswer ? <img src={WrongMarker}/> : <img src={GreenCheck}/> }</div>
                        <div className={"rounded-full border-black w-32 h-32 border-2"}><p className={"text-center pt-10"}>{timer}</p></div>
                    </div>
                    <div className={""}>
                        <h2 className={"text-2xl"}>The pose game</h2>
                    </div>
                    <div className={""}>
                        <h2 className={"text-xl"}>Total points</h2>
                    </div>
                </div>
            </main>
        </>
    )
}

export default GamePage