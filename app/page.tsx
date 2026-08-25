import LandingPageNameCard from "@/components/LandingPageNameCard";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className='h-svh'>
      <Navbar />
      <div className='h-full px-3'>
        <LandingPageNameCard />
      </div>
    </main>
  );
}
