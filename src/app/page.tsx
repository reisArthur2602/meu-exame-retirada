import CTABanner from '@/components/CTABanner';
import FAQ from '@/components/FAQ';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Navbar from '@/components/Navbar';
import Testimonials from '@/components/Testimonials';

export const HomeRoute = () => {
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
export default HomeRoute;
