import LandingPageNameCard from "@/components/LandingPageNameCard";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section id="home" className="h-svh px-3">
        <LandingPageNameCard />
      </section>

      <section id="projects">
        <Projects />
      </section>
    </main>
  );
}