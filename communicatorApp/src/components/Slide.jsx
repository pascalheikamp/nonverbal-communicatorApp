import Image from "../assets/hand-tracking-mediapipe.png";
import {useRef, useState} from "react";
import BackButton from "../assets/backButton.png";
import ForwardButton from "../assets/forwardButton.png";

const Slide = ({content}) => {
    console.log(typeof(content));
    console.log(content);
    const res = content.map((x)=> (x))
    console.log(res[0])

    let title = ""
    let description = ""
    let id=""
    for(let objData of res[0]) {
        // console.log(objData.title)
        // console.log(objData)
        title = objData.title;
        description = objData.description;
        id = objData.id;
    }
    const titleSlide = useRef(null);
    const descriptionSlide = useRef(null)
    const [currentId, setCurrentId] = useState(id)
    const slideContainer = useRef(currentId);



    function showNextSlide() {
        let id_slide2 = ""
        let title_slide2 = ""
        let description_slide2 = ""
        for(let objData of res[1]) {
            title_slide2 = objData.title;
            description_slide2 = objData.description;
            id_slide2 = objData.id;
        }
        setCurrentId(id_slide2)
        if(currentId === "2"){
          titleSlide.current.innerHTML=title_slide2;
            descriptionSlide.current.innerHTML=description_slide2;
        }
       console.log(slideContainer.current)

        // let id_slide3 = ""
        // let title_slide3 = ""
        // let description_slide3 = ""
        // for(let objData of res[2]) {
        //     title_slide3 = objData.title;
        //     description_slide3 = objData.description;
        //     id_slide3 = objData.id;
        // }
        // setCurrentId(id_slide3)
        // if(currentId === "3"){
        //     titleSlide.current.style.transition="4s ease-out"
        //     titleSlide.current.innerHTML=title_slide3;
        //     descriptionSlide.current.innerHTML=description_slide3;
        // }
        // console.log(slideContainer.current)
    }


    return (
        <>
            <button className={"relative left-32"}><img src={BackButton}/></button>
            <div id={currentId} ref={slideContainer} className={"flex mt-10 w-full pl-40 pr-40 ml-32 mr-32  mb-10"}>
                <img className={"w-52 h-52"} src={Image}/>
                <div className={" ml-7"}><h2 ref={titleSlide} className={"font-bold text-xl"}>{title}</h2><p ref={descriptionSlide}>{description}</p>
                </div>
            </div>
            <button onClick={showNextSlide} className={"relative right-32"}><img src={ForwardButton}/></button>
        </>
    )
}

export default Slide