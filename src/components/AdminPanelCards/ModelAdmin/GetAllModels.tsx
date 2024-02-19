import React , {useState, useEffect} from 'react'
import ModelService from '../../../services/ModelService';
import { GetAllModelModel } from '../../../models/response/ModelModel';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


type Props = {}

const GetAllModels = (props: Props) => {

    const [models, setModels] = useState<GetAllModelModel[]>([]);

    useEffect(() => {
      fetchModels();
    }, [])

    const fetchModels = () => {
      ModelService.getAllModels().then(setModels)
    }

    const deleteModel = (id: number) => {
      ModelService.delete(id).then((response) => {
        fetchModels();
        toast.success(response.data.message); 
      });
    };

  return (
    <div>
        <h2>All Models</h2>
        <p>Table listing of all the models currently in the database.Please refer to the update/delete column for related operations.</p>
        <table className="table table-bordered">
      <thead>
        <tr>
          <th>Model Name</th>
          <th>Model ID</th>
          <th>Brand</th>
          <th>Update/Delete</th>
        </tr>
      </thead>
      <tbody>
        {models.map((model) => 
          <tr key={model.id}>
            <td>{model.name}</td>
            <td>{model.id}</td>
            <td>{model.brand.name}</td>
            <td>
              <Link to={`/admin/getAllModels/update/${model.id}`} className='btn btn-warning me-2'>Update</Link>
              <button className='btn btn-danger' onClick={() => deleteModel(model.id)}>Delete</button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  )
}

export default GetAllModels