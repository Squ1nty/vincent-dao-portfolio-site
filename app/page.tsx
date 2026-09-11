import LandingPageNameCard from "@/components/LandingPageNameCard";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Bio from "@/components/Bio";
import AdventurePath from "@/components/AdventurePath";

export default function Home() {
  return (
    <main>
      <AdventurePath>
        <section id="home" className="h-svh px-3">
          <LandingPageNameCard />
        </section>
        <section id="about">
          <Bio />
        </section>
        <section id="projects">
          <Projects />
        </section>
      </AdventurePath>
    </main>
  );
}