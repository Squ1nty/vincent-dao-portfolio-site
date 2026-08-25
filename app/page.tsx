import LandingPageNameCard from "@/components/LandingPageNameCard";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className='px-3'>
        <LandingPageNameCard />
      </div>
    </main>
  );
}
