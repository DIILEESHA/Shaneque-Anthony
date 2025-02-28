import Countdown from "../../components/countdown/Countdown";
import Location from "../../components/location/Location";
import Main from "../../components/main/Main";
import Parallax from "../../components/parallax/Parallaxy";
import Story from "../../components/story/Story";
import Gallery from "../../components/gallery/Gallery";
import Gift from "../../components/story/Gift";

const Home = () => {
  return (
    <div>
      <Main />
      <Story />
      <Countdown />
      <Location />
      <Gallery />
      <Gift />
      <Parallax />
    </div>
  );
};

export default Home;
