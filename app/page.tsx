import Hero from "@/components/sections/hero";
import Marquee from "@/components/sections/marquee";
import AboutOrbit from "@/components/sections/about-orbit";
import CtaBand from "@/components/sections/cta-band";
import SolutionsGrid from "@/components/sections/solutions-grid";
import PhotoBand from "@/components/sections/photo-band";
import StraightTalk from "@/components/sections/straight-talk";
import Founders from "@/components/sections/founders";
import Process from "@/components/sections/process";
import Faq from "@/components/sections/faq";
import ProposalForm from "@/components/sections/proposal-form";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutOrbit />
      <CtaBand />
      <SolutionsGrid />
      <PhotoBand />
      <StraightTalk />
      <Founders />
      <Process />
      <Faq />
      <CtaBand
        heading="Let's work together — tell us what you sell and where it is stuck"
        cta="Book a call"
        image="/reel/studio-dark.jpg"
      />
      <ProposalForm />
    </>
  );
}
