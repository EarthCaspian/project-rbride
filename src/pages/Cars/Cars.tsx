import CarList from '../../layouts/CarList/CarList'
import FilterBar from '../../layouts/FilterBar/FilterBar'




const Cars = () => {
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