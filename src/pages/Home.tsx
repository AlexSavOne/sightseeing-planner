// src\pages\Home.tsx

import Attractions from "../components/Attraction/Attractions";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

type HomeProps = {
  isAdmin: boolean;
  toggleAdmin: () => void;
};

const Home = ({ isAdmin, toggleAdmin }: HomeProps) => (
  <div>
    <Header isAdmin={isAdmin} toggleAdmin={toggleAdmin} />
    <Attractions isAdmin={isAdmin} />
    <Footer />
  </div>
);

export default Home;
