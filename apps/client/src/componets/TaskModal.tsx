import { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';

interface Task {
  title: string;
  description: string;
  tags: string[];
}

interface TaskModalProps {
  setIsNewTaskModalOpen: (isOpen: boolean) => void;
  newTask: Task;
  setNewTask: (task: Task) => void;
  toggleTag: (tag: string) => void;
  tagColors: Record<string, string>;
  onTaskAdded: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  setIsNewTaskModalOpen,
  newTask,
  setNewTask,
  toggleTag,
  tagColors,
  onTaskAdded,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTask = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await axios.post(
        'http://localhost:4000/api/v1/tasks',
        {
          title: newTask.title,
          description: newTask.description,
          tags: newTask.tags,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success('Task created!');
      onTaskAdded();
      setIsNewTaskModalOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">New Task</h2>
          <button
            onClick={() => setIsNewTaskModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Enter task title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Enter task description"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(tagColors).map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-2 py-1 rounded-full ${
                    newTask.tags.includes(tag)
                      ? tagColors[tag as keyof typeof tagColors]
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddTask}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg py-2 font-medium disabled:opacity-50"
          >
            {isSubmitting ? 'Adding Task...' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

