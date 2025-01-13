import { useDraggable  } from "@dnd-kit/core";
import { Trash , Edit } from "lucide-react";
import EditTaskModal from "./EditTaskModal";
import { useState } from "react";
import { Task  , TaskStatus , TaskUpdate } from "../types";

type TaskCardProp = {
    task : Task
    handleDeleteTask: (taskId: string) => void;
    handleUpdateTask: (updatedTask: Task) => void;
}

const TaskCard = ({task , handleDeleteTask , handleUpdateTask} : TaskCardProp) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const { attributes, listeners, setNodeRef, transform , isDragging } = useDraggable({
        id: task._id,

      });
    
      const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        zIndex: isDragging ? 1000 : 'auto',
    };

    const handleSave = (updatedTask: TaskUpdate & { _id: string; status: TaskStatus , title : string , description : string}) => {
      handleUpdateTask(updatedTask); 
    };

  return (
    <div 
    ref={setNodeRef}
    {...listeners}
    {...attributes}
    >
      <div
        key={task._id}
        className="bg-white rounded-lg p-4 shadow-sm cursor-move relative"
        style={style}>
        <h3 className="font-medium text-gray-800 pr-8">{task.title}</h3>
        <p className="text-sm text-gray-600 mt-1">
            {task.description}
        </p>
        

        <button
            onClick={ ()=>handleDeleteTask(task._id) }
            
            className=" absolute top-2 right-2 text-red-600  hover:text-red-800 cursor-pointer "
        >
            <Trash/>
        </button>
        
        <button
            className=" absolute top-2 right-10 text-gray-600  hover:text-blue-800 cursor-pointer "
            onClick={()=>setIsModalOpen(true)}
        >
            <Edit/>
        </button>
        
        </div>
        <EditTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          task={task}
          onSave={handleSave}
        />
    </div>
  )
}

export default TaskCard
