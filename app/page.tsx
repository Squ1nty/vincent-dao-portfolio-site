import LandingPageNameCard from "@/components/LandingPageNameCard";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Bio from "@/components/Bio";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section id="home" className="h-svh px-3">
        <LandingPageNameCard />
      </section>
      <section 
        id="about" 
        className='w-full grid place-items-center xl:mb-10'
      >
        <Bio />
      </section>
      <section id="projects">
        <Projects />
      </section>
    </main>
  );
}