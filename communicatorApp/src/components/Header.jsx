import './css/header.css';
import NonVerbal from "../assets/Non-Verbal-Communication.png";
function Header() {
    return(
        <>
            <header className={"bg-gradient-to-bl header from-indigo-50 via-blue-100 to-blue-100 h-96 w-full"}>
                <div className={"grid pt-10"}>
                    {/*<img src={NonVerbal} className={"h-60"}/>*/}
                    {/*<section>This is section one</section>*/}
                    {/*<section>This is section one</section>*/}
                </div>
            </header>
            <div className={"wave"}></div>
        </>
    )
}
export default Header;