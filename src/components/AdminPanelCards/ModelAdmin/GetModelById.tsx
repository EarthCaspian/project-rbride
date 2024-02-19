import React, {useState} from 'react'
import ModelService from '../../../services/ModelService';
import { ModelModel } from '../../../models/response/ModelModel';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

type Props = {}

const GetModelById = (props: Props) => {
    const [id, setId] = useState<number | null>(null);
    const [model, setModel] = useState<ModelModel | null>(null);
  
    const getModel = () => {
      if (id !== null) {
        ModelService.getById(id).then(response => {
            setModel(response.data);
        });
      }
    };
  
    const deleteModel = (id: number) => {
        ModelService.delete(id).then((response) => {
            getModel();
        toast.success(response.data.message); 
      });
    };


    return (
      <div>
        <h1>Get Model By ID</h1>
        <p>Enter the model id to get the desired model entry.Please refer to the update/delete column for related operations.</p>
            <div className="d-flex align-items-center mt-3 mb-3">
            <input
                type="number"
                className="form-control me-2"
                onChange={(e) => setId(Number(e.target.value))}
                placeholder="Enter Model ID"
            />
            <button className="btn btn-primary" onClick={getModel}>
                Get Model
            </button>
            </div>
  
        {model && (
          <table className="table table-bordered">
            {/* Table headers */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Update/Delete</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              <tr>
                <td>{model.id}</td>
                <td>{model.name}</td>
                <td>{model.brand.name}</td>
                <td>
                  <Link to={`/admin/getAllModels/update/${model.id}`} className='btn btn-warning me-2'>Update</Link>
                  <button className='btn btn-danger' onClick={() => deleteModel(model.id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  };
  
  export default GetModelById;