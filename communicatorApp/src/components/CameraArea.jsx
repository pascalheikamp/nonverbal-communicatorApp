import Webcam from "react-webcam";


const CameraArea = ({Camref, style, width, height, showCam})=> {
    return (
        <>
            <Webcam ref={Camref} style={style} width={width} height={height} hidden={showCam}/>
        </>
    )
}

export default CameraArea;