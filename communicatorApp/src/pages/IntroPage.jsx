import Navigation from "../components/Navigation.jsx";
import Footer from "../components/Footer.jsx";
import IntroductionSlide from "../components/IntroductionSlide.jsx";


function IntroPage() {
    return(
        <>
           <Navigation />
            <main>
                <IntroductionSlide/>
            </main>
            <Footer />
        </>
    )
}
export default IntroPage;