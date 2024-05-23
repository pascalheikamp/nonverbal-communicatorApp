import Navigation from "../components/Navigation.jsx";
import CameraArea from "../components/CameraArea.jsx";
import {Camera} from "@mediapipe/camera_utils";
import {FilesetResolver, HandLandmarker, DrawingUtils} from "@mediapipe/tasks-vision";
import {useEffect, useRef, useState} from "react";
import kNear from "../kNear.js";
import Webcam from "react-webcam";


function TrainPosePage() {
    const canvasRef = useRef(null);
    const webcamRef = useRef(null);
    const poseNameRef = useRef(null);
    const [prediction, setPrediction] = useState("")
    let trainPose = false
    let currentPrediction = false
    let lastVideoTime = -1
    let pose;
    let handLandMarker;
    let machine = new kNear(3);


    const toggleTrainPose = () => {
        trainPose = !trainPose
    }

    const togglePredictPose = () => {
        currentPrediction = !currentPrediction
    }

    const removePoses = () => {
        localStorage.removeItem("coordinates");
        localStorage.clear();
    }

    const registerPose = (poseDetection, landmarkResults) => {
        if (!landmarkResults[0]) return
        let landmarkResultList = landmarkResults[0]?.flatMap(landmarkPose => [landmarkPose.x, landmarkPose.y]) || [];

        addToLocalStorage(poseDetection, landmarkResultList)
    }

    function getPosesFromLocalStorage() {
        let coordinates = JSON.parse(localStorage.getItem("coordinates"));
        if (!coordinates) return
        for (const coordinate of coordinates) {
            machine.learn(coordinate.landmarks, coordinate.label)
        }
        console.log(coordinates);
    }

    const predictPose = (results) => {
        let landmarkResultList = [];
        if (!results[0]) return
        for (let landmarkPose of results[0]) {
            landmarkResultList.push(landmarkPose.x, landmarkPose.y);
        }
        console.log(landmarkResultList);
        let prediction = machine.classify(landmarkResultList);
        console.log(prediction);
        setPrediction(prediction);
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
                        if (trainPose) {
                            registerPose(poseNameRef.current.value, pose)
                        }
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

    useEffect(() => {
        createHandLandMarker().then(detectLandMarks);
        getPosesFromLocalStorage()
    }, []);
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
            <main>
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
                <div className={"relative bottom-10 flex justify-evenly"}>
                    <div className={""}>
                        <input ref={poseNameRef} placeholder={"pose name..."}
                               className={"mr-10 pl-3 border-2 border-primaryColor rounded-3xl"} type={"text"}/>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={toggleTrainPose} type="checkbox" className="sr-only peer toggle" />
                            <div className={"w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"}></div>
                            <p className={"ml-5"}>Train pose</p>
                        </label>
                        <p className={"absolute top-10 font-bold"}>The prediction is: {prediction}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={togglePredictPose} type="checkbox" className="sr-only peer toggle" />
                        <div className={"w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"}></div>
                        <p className={"ml-5"}>Predict pose</p>
                    </label>
                    <button onClick={removePoses} className={"rounded shadow-xl w-32 bg-primaryColor"}>Remove poses
                    </button>
                    <button className={"rounded shadow-xl w-32 bg-primaryColor"}>Open camera</button>
                    <button className={"rounded shadow-xl w-32 bg-primaryColor"}>Close camera</button>
                </div>
            </main>
        </>
    )
}

export default TrainPosePage