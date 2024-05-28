import Image from "../assets/hand-tracking-mediapipe.png";
import {useRef, useState} from "react";
import BackButton from "../assets/backButton.png";
import ForwardButton from "../assets/forwardButton.png";

const Slide = ({content}) => {
    console.log(typeof (content));
    console.log(content);
    const res = content.map((x) => (x))

    let title = ""
    let description = ""
    let id = ""
    // for (let objData of res[0]) {
    //     // console.log(objData.title)
    //     // console.log(objData)
    //     title = objData.title;
    //     description = objData.description;
    //     id = objData.id;
    // }
    const titleSlide = useRef(null);
    const descriptionSlide = useRef(null)
    const [currentId, setCurrentId] = useState('1')
    const slideContainer = useRef(currentId);


    function showNextSlide() {
        // let id = ""
        let title = ""
        let description = ""


        for(let i = 0; i <= res.length; i++) {
            for(let data of res) {
                if(slideContainer.current.id === data[i].id)
                title = data[i].title
                description = data[i].description
                id = data[i].id

                titleSlide.current.innerHTML=title
                descriptionSlide.current.innerHTML=description
                // titleSlide.current.innerHTML=data[0].id
                // descriptionSlide.current.innerHTML=data[i].description
            }
        }
        // setCurrentId(id)

        // console.log(res[0])
        // let id = res.map((x) => x.id)
        // console.log(typeof(id));
        // console.log(id)
        // if(slideContainer.current.id === id[0]) {
        //     console.log("Works fine")
        // } else {
        //     console.log("Error")
        // }
        // console.log(objData[0].id)
        // if(slideContainer.current.id === objData[1].id) {
        //     title = objData[1].title;
        //     description = objData[1].description;
        //     id = objData[1].id;
        //     console.log(slideContainer.current)
        // } else {
        //     console.log("Error")
        // }

        // }

        //  if(currentId === "2"){
        //    titleSlide.current.innerHTML=title_slide2;
        //      descriptionSlide.current.innerHTML=description_slide2;
        //  }
        // console.log(slideContainer.current)

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
            <div id={currentId} ref={slideContainer} className={"flex mt-10 w-full pl-40 pr-40 ml-32 mr-32  mb-10"}>
                <img className={"w-52 h-52"} src={Image}/>
                <div className={" ml-7"}><h2 ref={titleSlide} className={"font-bold text-xl"}>{title}</h2><p
                    ref={descriptionSlide}>{description}</p>
                </div>
            </div>
        </>
    )
}

export default Slide