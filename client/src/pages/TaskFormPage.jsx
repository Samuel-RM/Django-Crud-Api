import { useForm } from "react-hook-form";
import { createTask , deleteTask , updateTask , geatTasks} from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export function TaskFormPage() {
  const { register, handleSubmit ,formState:{errors}, setValue } = useForm()
  const navigate = useNavigate()
  const params =  useParams()

  const onSubmit = handleSubmit(async data =>{
    if (params.id){
      await updateTask(params.id, data)
      toast.success('Tarea Actualizada', {
        position: 'bottom-right',
        style :{
          background: "#1010101",
          color:"fff"
        }
      })
    }else{
      await createTask(data)
      toast.success('Tarea Creada', {
        position: 'bottom-right',
        style :{
          background: "#1010101",
          color:"fff"
        }
      })
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
      <div className="max-w-xl mx-auto">
        <form onSubmit={onSubmit} className="bg-zinc-800 p-10 rounded-lg mt-2">
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
            autoFocus
          />
  
          {errors.title && <span>This field is required</span>}
  
          <textarea
            placeholder="Description"
            {...register("description", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full"
          />
  
          {errors.description && <span>This field is required</span>}
  
          <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
            Save
          </button>
        </form>
  
        {params.id && (
          <div className="flex justify-end">
            <button
              className="bg-red-500 p-3 rounded-lg w-48 mt-3"
              onClick={async () => {
                const accepted = window.confirm("Are you sure?");
                if (accepted) {
                  await deleteTask(params.id);
                  toast.success("Task Removed", {
                    position: "bottom-right",
                    style: {
                      background: "#101010",
                      color: "#fff",
                    },
                  });
                  navigate("/tasks");
                }
              }}
            >
              delete
            </button>
          </div>
        )}
      </div>
    );
  }