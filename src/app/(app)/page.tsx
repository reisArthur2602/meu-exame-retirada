import CTABanner from './cta-banner';
import FAQ from './faq';
import Features from './features';
import Footer from './footer';
import Hero from './hero';
import HowItWorks from './how-it-works';
import Navbar from './navbar';
import Testimonials from './testimonials';

export const AppRoute = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <HowItWorks />
                <Features />
                <Testimonials />
                <FAQ />
                <CTABanner />
            </main>
            <Footer />
        </>
    );
};
export default AppRoute;
