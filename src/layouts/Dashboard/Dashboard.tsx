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
          imageUrl: process.env.PUBLIC_URL + '/assets/a3.png',
          title: 'Audi',
          description: 'a3',
      },
      {
        index:2,
        imageUrl: process.env.PUBLIC_URL + '/assets/q8.png',
        title: 'Audi',
        description: 'q8',
    },
    {
      index:3,
      imageUrl: process.env.PUBLIC_URL + '/assets/corolla.png',
      title: 'Toyota',
      description: 'Corolla',
    },
    {
      index:4,
      imageUrl: process.env.PUBLIC_URL + '/assets/mercedesCLA200D.png',
      title: 'Mercedes',
      description: 'CLA200',
    },
    {
      index:5,
      imageUrl: process.env.PUBLIC_URL + '/assets/polo.png',
      title: 'Volkswagen',
      description: 'Polo',
    },
    {
      index:6,
      imageUrl: process.env.PUBLIC_URL + '/assets/m3.png',
      title: 'BMW',
      description: 'm3',
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
