import './css/nav.css'

function Navigation() {

    return(
        <>
            <nav className={"block shadow-2xl nav bg-gray-50 h-28 w-full"}>
                <div className={"flex pt-10 list-none justify-around"}>
                    <li><h2 className={"text-2xl text-white"}>Communicator App</h2></li>
                    <li><h3 className={"text-white"}>Non vs verbal communication</h3></li>
                    <div className={''}>
                        <li><h3 className={"text-white"}>Signs</h3></li>
                    </div>
                    <li><h3 className={"text-white"}>Create your own sign</h3></li>
                </div>
            </nav>
        </>
    )
}
export default Navigation;