import { useEffect, useState } from 'react';
import {  Plus } from 'lucide-react';
import axios from 'axios';
import TaskModal from './TaskModal';
import { toast } from 'react-toastify';
import {  DndContext, DragEndEvent } from '@dnd-kit/core';
import Columns from './Columns';
import type {  Column as ColumnType } from '../types';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  tags: string[];
}


const columns : ColumnType[]  = [
  { id: 'TODO', title: 'To Do', color: 'from-red-600 to-orange-500' },
  { id: 'IN_PROGRESS', title: 'In Progress', color: 'from-yellow-500 to-yellow-400' },
  { id: 'DONE', title: 'Done', color: 'from-green-400 to-green-300' },
];

const tagColors = {
  'High Priority': 'bg-red-100 text-red-800',
  'Medium Priority': 'bg-yellow-100 text-yellow-800',
  'Low Priority': 'bg-green-100 text-green-800',
  'Bug': 'bg-purple-100 text-purple-800',
  'Feature': 'bg-blue-100 text-blue-800',
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, '_id' | 'status'>>({ title: '', description: '', tags: [] });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/tasks", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      setTasks(res.data);
      console.log(res.data)
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    }
  };

  const toggleTag = (tag: string) => {
    setNewTask(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleDeleteTask = async (taskId: string) => {
    console.log('Delete initiated for task:', taskId); 
    try {
      await axios.delete(`http://localhost:4000/api/v1/tasks/${taskId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      setTasks(tasks.filter(t => t._id !== taskId));
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    setTasks(() =>
      tasks.map((task) =>
        task._id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br w-screen from-purple-400 via-blue-400 to-blue-500 p-6">
      <div className=" mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Task Board</h1>
          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            className="bg-white text-purple-600 rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            Add Task
          </button>
        </div>

        <DndContext  onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => {
            return (
              <Columns
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
                handleDeleteTask={handleDeleteTask}
              />
            );
          })}
          </div>
        </DndContext> 

        {isNewTaskModalOpen && (
          <TaskModal
            setIsNewTaskModalOpen={setIsNewTaskModalOpen}
            newTask={newTask}
            setNewTask={setNewTask}
            toggleTag={toggleTag}
            tagColors={tagColors}
            onTaskAdded={fetchTasks}
          />
        )}
      </div>
    </div>
  );
}

