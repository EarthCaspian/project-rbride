import "../../components/DashboardCards/style.css";
import { FilterBarCard } from "../../components/DashboardCards/FilterBarCard";
import { useDispatch } from "react-redux";
import { setReferringPage } from "../../store/referringPageSlice";
import ContactCards from "../../components/HomePageContactCards/ContactCards";
import CarsSlider from "../../components/CarsSlider/CarsSlider";


const Dashboard = () => {
  const dispatch = useDispatch();
  dispatch(setReferringPage("/"));

  const slides = [
      {
          index:1,
          imageUrl: 'https://www.enterprise.com.tr/upload/vehicles/imagew/950/hyundaii20dizelotomatik1280x720copy6374441175630565315.png',
          title: 'Hyundai',
          description: 'i20',
      },
      {
        index:2,
        imageUrl: 'https://www.enterprise.com.tr/upload/vehicles/imagew/950/hybridsongorsel_637511609023466148.png',
        title: 'Toyota',
        description: 'Corolla Hybrid',
    },
    {
      index:3,
      imageUrl: 'https://www.enterprise.com.tr/upload/vehicles/imagew/950/slider_637828528256829182.png',
      title: 'Toyota',
      description: 'C-HR',
    },
    {
      index:4,
      imageUrl: 'https://www.enterprise.com.tr/upload/vehicles/imagew/950/mercedesvitodizelotomatik1280x720copy_637444127797506898.png',
      title: 'Mercedes',
      description: 'Vito',
    },
    {
      index:5,
      imageUrl: 'https://www.enterprise.com.tr/upload/vehicles/imagew/950/bmwx1dizelotomatik1280x720slider_637459052554892031.png',
      title: 'BMW',
      description: 'X1',
    },
    {
      index:6,
      imageUrl: 'https://www.enterprise.com.tr/upload/vehicles/imagew/950/bmwx1dizelotomatik1280x720slider_637459052554892031.png',
      title: 'Lexus',
      description: 'RX 300',
    }
  ];

  return (
    <div className="background-container position-relative">
      <div  id="hero">
        <div className="hero-image">
          <div className="hero-text">
            {/* <h2>Welcome to RoboRide</h2>
            <p>Rental Services with Precision</p> */}
          </div>
        </div>
      </div>
      <div id="form" className="custom-form">
        <FilterBarCard />
      </div>
      <div className="cars-slider">
        <CarsSlider slides={slides} />
      </div>
      <div className="contact-cards">
        <ContactCards />
      </div>
    </div>
    
  );
};

export default Dashboard;
