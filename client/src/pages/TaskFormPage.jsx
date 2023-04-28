import { useForm } from "react-hook-form";
import { createTask , deleteTask , updateTask , geatTasks} from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export function TaskFormPage() {
  const { register, handleSubmit ,formState:{errors}, setValue } = useForm()
  const navigate = useNavigate()
  const params =  useParams()

  const onSubmit = handleSubmit(async data =>{
    if (params.id){
      await updateTask(params.id, data)
    }else{
      await createTask(data)
    }
    navigate("/tasks")
    });

    useEffect(() => {
     async function loaddTask (){
      if (params.id){
        const res = await geatTasks(params.id);
        console.log(res);
        setValue('title', res.data.title)
        setValue('description', res.data.description)
        
      }
     }
     loaddTask()
    }, []);


    return (
      <div>
        <form onSubmit={onSubmit}>
          <input type="text"
           placeholder="title" 
          {...register("title", {required: true})}
          />
          {errors.title && <span> Title is required</span>}
          <textarea rows="3" 
          placeholder="description"
          {...register("description", {required: true})}
          ></textarea>
          {errors.description && <span>Description is required</span>}

          <button>Save</button>
        </form>
        {params.id && (<button onClick={async () => {
          const response = window.confirm("Are you sure?");
          if (response){
           await  deleteTask(params.id);
           navigate("/tasks/");
          }
          }}>
            Delete</button>)}
      </div>
    );
}
  