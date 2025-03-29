// src/pages/Home.tsx

import Attractions from "../components/Attraction/Attractions";

type HomeProps = {
  isAdmin: boolean;
};

const Home = ({ isAdmin }: HomeProps) => {
  return (
    <div>
      <h1>Список достопримечательностей</h1>
      {isAdmin ? <p>Режим администратора включён</p> : <p>Обычный режим</p>}
      <Attractions isAdmin={isAdmin} />
    </div>
  );
};

export default Home;
