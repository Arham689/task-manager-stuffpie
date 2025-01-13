import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type Task = {
  _id: string;
  status: TaskStatus;
  title: string;
  description: string;
};

export type ColumnType = {
  id: TaskStatus;
  title: string;
  color : string 
};

type ColumnProps = {
    column: ColumnType;
    tasks: Task[];
    handleDeleteTask: (taskId: string) => void;
  };

const Columns = ({column , tasks , handleDeleteTask } : ColumnProps) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
      });


  return (
    <div>
        <div key={column.id} ref={setNodeRef} className="bg-white/10  rounded-xl p-4">
            <div className={`bg-gradient-to-r ${column.color} p-3 rounded-lg mb-4`}>
                <h2 className="text-white font-semibold">{column.title}</h2>
            </div>

            <div className="space-y-3">
                {tasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                    <TaskCard key={task._id} task={task} handleDeleteTask={handleDeleteTask} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Columns
