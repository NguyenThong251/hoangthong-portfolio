'use client';

import { Navbar } from './components/navbar';
import { Header } from './components/header';
import { MarqueeText } from './components/marquee-text';
import { AboutPreview } from './components/about-preview';
import { InteractiveEyes } from './components/interactive-eyes';
import { ServicesSection } from './components/services-section';
import { ProjectSlider } from './components/project-slider';
import { FeaturedProjects } from './components/featured-projects';
import { TechStack } from './components/tech-stack';
import { Timeline } from './components/timeline';
import { AnimatedCounter } from './components/animated-counter';
import { ReviewCards } from './components/review-cards';
import { CTASection } from './components/cta-section';
import { Contact } from './components/contact';
import { Transition } from './components/transition';
import { Offcanvas, OffcanvasProvider } from './components/offcanvas';

const stats = [
    { value: 50, suffix: '+', label: 'Projects Completed' },
    { value: 5, suffix: '+', label: 'Years Experience' },
    { value: 500, suffix: '+', label: 'Students Taught' },
    { value: 100, suffix: '%', label: 'Satisfaction' },
];

export default function Home() {
    return (
        <Transition>
            <OffcanvasProvider>
                <Offcanvas />
                <Navbar />
                <Header />

                {/* Marquee Section */}
                <MarqueeText
                    text="Junior Fullstack Developer"
                    bgColor="bg-primary"
                    textColor="text-background"
                />

                <main>
                    {/* About Preview Section */}
                    <AboutPreview />

                    {/* Interactive Eyes Section - Fun Element */}
                    <InteractiveEyes />

                    {/* Stats Counter */}
                    <AnimatedCounter stats={stats} />

                    {/* Services Section */}
                    <ServicesSection />

                    {/* Project Slider - Parallax Gallery */}
                    <ProjectSlider />

                    {/* Featured Projects Grid */}
                    <FeaturedProjects />

                    {/* Tech Stack Section */}
                    <TechStack />

                    {/* Journey/Timeline */}
                    <Timeline />

                    {/* Reviews/Testimonials */}
                    <ReviewCards />

                    {/* Second Marquee */}
                    <MarqueeText
                        text="Let's Work Together"
                        direction="right"
                        bgColor="bg-foreground"
                        textColor="text-background"
                    />

                    {/* CTA Section */}
                    <CTASection />
                </main>

                <Contact />
            </OffcanvasProvider>
        </Transition>
    );
}
