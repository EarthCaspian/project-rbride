import React , {useState, useEffect} from 'react'
import { BrandModel } from '../../../models/response/BrandModel';
import BrandService from '../../../services/BrandService';
import { toast } from 'react-toastify';

type Props = {}

const GetAllBrands = (props: Props) => {

    const [brands, setBrands] = useState<BrandModel[]>([]);

    useEffect(() => {
      fetchBrands();
    }, [])

    const fetchBrands = () => {
      BrandService.getAllBrands().then(setBrands)
    }

    const deleteBrand = (id: number) => {
      BrandService.delete(id).then((response) => {
        fetchBrands();
        toast.success(response.data.message); 
      });
    };

  return (
    <div>
        <h2>All Brands</h2>
        <table className="table table-bordered">
      <thead>
        <tr>
          <th>Brand Name</th>
          <th>Brand ID</th>
          <th>Brand Logo</th>
        </tr>
      </thead>
      <tbody>
        {brands.map((brand) => 
          <tr key={brand.id}>
            <td>{brand.name}</td>
            <td>{brand.id}</td>
            <td><img height={50} src={brand.logoPath} alt="brand-logo" /></td>
            <td>
              <button className='btn btn-danger' onClick={() => deleteBrand(brand.id)}>Delete</button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  )
}

export default GetAllBrands