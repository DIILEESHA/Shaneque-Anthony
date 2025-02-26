import Countdown from "../../components/countdown/Countdown";
import Location from "../../components/location/Location";
import Main from "../../components/main/Main";
import Nav from "../../components/nav/Nav";
import Parallax from "../../components/parallax/Parallaxy";
import Story from "../../components/story/Story";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <div>
      <Main />
      <Story />
      <Countdown />
      <Location />
      <Parallax />
    </div>
  );
};

export default Home;
