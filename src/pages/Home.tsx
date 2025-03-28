type HomeProps = {
  isAdmin: boolean;
};

const Home = ({ isAdmin }: HomeProps) => {
  return (
    <div>
      <h1>Главная страница</h1>
      {isAdmin ? <p>Режим администратора включён</p> : <p>Обычный режим</p>}
    </div>
  );
};

export default Home;
