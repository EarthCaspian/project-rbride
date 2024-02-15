import React , {useState, useEffect} from 'react'
import ModelService from '../../../services/ModelService';
import { GetAllModelModel } from '../../../models/response/ModelModel';
import { toast } from 'react-toastify';


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
        <table className="table table-bordered">
      <thead>
        <tr>
          <th>Model Name</th>
          <th>Model ID</th>
          <th>Brand</th>
        </tr>
      </thead>
      <tbody>
        {models.map((model) => 
          <tr key={model.id}>
            <td>{model.name}</td>
            <td>{model.id}</td>
            <td>{model.brand.name}</td>
            <td>
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