import HeroSection    from "@/components/HeroSection";
import DetailsSection from "@/components/DetailsSection";
import InviteSection  from "@/components/InviteSection";
import ProgramSection from "@/components/ProgramSection";
import RsvpSection    from "@/components/RsvpSection";
import Footer         from "@/components/Footer";
import MusicPlayer    from "@/components/MusicPlayer";
import Stars          from "@/components/Stars";

export default function Home() {
  return (
    <>
      <Stars />
      <MusicPlayer />
      <main>
        <HeroSection />
        <DetailsSection />
        <InviteSection />
        <ProgramSection />
        <RsvpSection />
      </main>
      <Footer />
    </>
  );
}
