import React, { useState } from 'react';
import {  TaskStatus , TaskUpdate } from '../types';
  
interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: { title: string; description: string; _id: string  , status : TaskStatus};
  onSave: (updatedTask: TaskUpdate & { _id: string; status: TaskStatus , title : string , description : string  }) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, task, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ _id: task._id, status: task.status, title, description });
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md px-4 py-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
