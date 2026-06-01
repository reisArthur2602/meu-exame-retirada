import CTABanner from './cta-banner';
import FAQ from './faq';
import Features from './features';
import Footer from './footer';
import Hero from './hero';
import HowItWorks from './how-it-works';
import Navbar from './navbar';

export const AppRoute = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <HowItWorks />
                <Features />
                <FAQ />
                <CTABanner />
            </main>
            <Footer />
        </>
    );
};
export default AppRoute;
