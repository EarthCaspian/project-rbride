import "../../components/DashboardCards/style.css";
import { FilterBarCard } from "../../components/DashboardCards/FilterBarCard";
import { useDispatch } from "react-redux";
import { setReferringPage } from "../../store/referringPageSlice";


const Dashboard = () => {
  const dispatch = useDispatch();
  dispatch(setReferringPage("/"));

  return (
    <div className="background-container position-relative">
      <div  id="hero">
        <div className="hero-image">
          <div className="hero-text">
            <h2>Welcome to RoboRide</h2>
            <p>Rental Services with Precision</p>
          </div>
        </div>
      </div>
      <div id="form" className="custom-form">
        <FilterBarCard />
      </div>
    </div>
  );
};

export default Dashboard;
