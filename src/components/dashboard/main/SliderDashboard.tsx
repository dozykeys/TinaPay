import { Carousel } from "react-responsive-carousel";
import slider1 from "../../../assets/dashboard/main/slider1.svg";

export default function SliderDashboard() {
  return (
    <div className="w-full">
      <Carousel autoPlay={true} showThumbs={false}>
        <div>
          <img src={slider1} />
          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <img src={slider1} />
          {/* <p className="legend">Legend 2</p> */}
        </div>
        <div>
          <img src={slider1} />
          {/* <p className="legend">Legend 3</p> */}
        </div>
      </Carousel>
    </div>
  );
}
