import Hero from "@/components/sections/hero";
import Marquee from "@/components/sections/marquee";
import ReelWall from "@/components/sections/reel-wall";
import Expertise from "@/components/sections/expertise";
import ServicesList from "@/components/sections/services-list";
import ParallaxBand from "@/components/sections/parallax-band";
import StraightTalk from "@/components/sections/straight-talk";
import Founders from "@/components/sections/founders";
import Process from "@/components/sections/process";
import Capabilities from "@/components/sections/capabilities";
import Faq from "@/components/sections/faq";
import Cta from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ReelWall />
      <Expertise />
      <ServicesList />
      <ParallaxBand />
      <StraightTalk />
      <Founders />
      <Process />
      <Capabilities />
      <Faq />
      <Cta />
    </>
  );
}
