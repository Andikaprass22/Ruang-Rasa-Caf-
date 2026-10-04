import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { Faq } from "./components/sections/Faq";
import { Gallery } from "./components/sections/Gallery";
import { Hero } from "./components/sections/Hero";
import { Location } from "./components/sections/Location";
import { Menu } from "./components/sections/Menu";
import { Promo } from "./components/sections/Promo";
import { Reservation } from "./components/sections/Reservation";
import { Reviews } from "./components/sections/Reviews";
import { Story } from "./components/sections/Story";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Menu />
        <Promo />
        <Gallery />
        <Reviews />
        <Location />
        <Reservation />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
