import React , {useState}from 'react'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import BrandService from '../../../services/BrandService';
import { BrandModel } from '../../../models/response/BrandModel';

type Props = {}

const GetBrandById = (props: Props) => {
    const [id, setId] = useState<number | null>(null);
    const [brand, setBrand] = useState<BrandModel | null>(null);
  
    const getBrand = () => {
      if (id !== null) {
        BrandService.getById(id).then(response => {
            setBrand(response.data);
        });
      }
    };
  
    const deleteBrand = (id: number) => {
        BrandService.delete(id).then((response) => {
        getBrand();
        toast.success(response.data.message); 
      });
    };


    return (
      <div>
        <h1>Get Brand By ID</h1>
        <p>Enter the brand id to get the desired brand entry.Please refer to the update/delete column for related operations.</p>
            <div className="d-flex align-items-center mt-3 mb-3">
            <input
                type="number"
                className="form-control me-2"
                onChange={(e) => setId(Number(e.target.value))}
                placeholder="Enter Brand ID"
            />
            <button className="btn btn-primary" onClick={getBrand}>
                Get Brand
            </button>
            </div>
  
        {brand && (
          <table className="table table-bordered">
            {/* Table headers */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>LogoPath</th>
                <th>Update/Delete</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              <tr>
                <td>{brand.id}</td>
                <td>{brand.name}</td>
                <td><img height={50} src={brand.logoPath} alt="brand-image" /></td>
                <td>
                  <Link to={`/admin/getAllBrands/update/${brand.id}`} className='btn btn-warning me-2'>Update</Link>
                  <button className='btn btn-danger' onClick={() => deleteBrand(brand.id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  };

export default GetBrandById