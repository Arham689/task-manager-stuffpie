import { useDraggable } from "@dnd-kit/core";

export type Task = {
  _id: string;
  status: TaskStatus;
  title: string;
  description: string;
};

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

type TaskCardProp = {
    task : Task
    handleDeleteTask: (taskId: string) => void;
}

const TaskCard = ({task , handleDeleteTask} : TaskCardProp) => {
    const { attributes, listeners, setNodeRef, transform , isDragging } = useDraggable({
        id: task._id,

      });
    
      const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        zIndex: isDragging ? 1000 : 'auto',
    };

    const handleDelete = (e: React.MouseEvent) => {
        console.log(e)
        handleDeleteTask(task._id);
      };

  return (
    <div ref={setNodeRef}
    {...listeners}
    {...attributes}>
      <div
        key={task._id}
        className="bg-white rounded-lg p-4 shadow-sm cursor-move relative"
        style={style}>
        <h3 className="font-medium text-gray-800 pr-8">{task.title}</h3>
        <p className="text-sm text-gray-600 mt-1">
            {task.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
        {/* {task.tags && task.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {task.tags.map((tag) => (
                        <span
                            key={tag}
                            className={`text-xs px-2 py-1 rounded-full ${tagColors[tag as keyof typeof tagColors]}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )} */}
        </div>

        <button
            onClick={ handleDelete }
            
            className="absolute top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer "
        >
            Delete
        </button>

        </div>
    </div>
  )
}

export default TaskCard
