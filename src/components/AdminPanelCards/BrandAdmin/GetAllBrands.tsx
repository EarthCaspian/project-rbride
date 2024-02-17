import React , {useState, useEffect} from 'react'
import { BrandModel } from '../../../models/response/BrandModel';
import BrandService from '../../../services/BrandService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

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
        <p>Table listing of all the brands currently in the database.Please refer to the update/delete column for related operations.</p>
        <table className="table table-bordered">
      <thead>
        <tr>
          <th>Brand Name</th>
          <th>Brand ID</th>
          <th>Brand Logo</th>
          <th>Update/Delete</th>
        </tr>
      </thead>
      <tbody>
        {brands.map((brand) => 
          <tr key={brand.id}>
            <td>{brand.name}</td>
            <td>{brand.id}</td>
            <td><img height={50} src={brand.logoPath} alt="brand-logo" /></td>
            <td>
              <Link to={`/admin/getAllBrands/update/${brand.id}`} className='btn btn-warning me-2'>Update</Link>
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