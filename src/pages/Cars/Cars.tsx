import CarList from '../../layouts/CarList/CarList'
import FilterBar from '../../layouts/FilterBar/FilterBar'
import { useDispatch } from "react-redux";
import { setReferringPage } from '../../store/referringPageSlice';




//When the page is loaded, existing brand, color, model, cars and rentals datas are fetched. However, newly added brands, models, colors, cars, or rentals in the database can only be accessed after the page is reloaded.
const Cars = () => {
  const dispatch = useDispatch();
  dispatch(setReferringPage("/cars"));

  return (

    <div className='container'>
      <div className='row'>
        <FilterBar></FilterBar>
      </div>
      <div className='container mt-5'>
          <CarList></CarList>
      </div>
    </div>
  )
}

export default Cars