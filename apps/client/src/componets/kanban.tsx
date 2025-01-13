import { useEffect, useState } from 'react';
import {  Plus } from 'lucide-react';
import axios from 'axios';
import TaskModal from './TaskModal';
import { toast } from 'react-toastify';
import {  DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import Columns from './Columns';
import type {  Column as ColumnType, TaskStatus , TaskUpdate } from '../types';

import { NavLink } from 'react-router-dom';
const base_url = import.meta.env.VITE_BASE_API_URL 

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

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, '_id' | 'status'>>({ title: '', description: '', tags: [] });

  useEffect(() => {
    fetchTasks();
  }, []);


  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${base_url}/tasks`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      });
      setTasks(res.data);
      console.log(res.data)
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    console.log('Delete initiated for task:', taskId); 
    try {
      await axios.delete(`${base_url}/tasks/${taskId}`, {
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

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
  
    if (!over) return;
  
    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];
  
    try {

      const response = await axios.put(
        `${base_url}/tasks/${taskId}`,
        {
          status: newStatus
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      if (response.status === 200) {
       
        setTasks(prevTasks =>
          prevTasks.map((task) =>
            task._id === taskId
              ? { ...task, status: newStatus }
              : task
          )
        );
        toast.success('Task status updated successfully');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status');
      
      fetchTasks(); 
    }
  }


  const handleUpdateTask = async (updatedTask: TaskUpdate & { _id: string; status: TaskStatus }) => {
    try {
      // Make a PUT request to update the task
      const response = await axios.put(`${base_url}/tasks/${updatedTask._id}`, {
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status, 
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (response.status === 200) {

        setTasks(prevTasks =>
          prevTasks.map(task =>
            task._id === updatedTask._id ? { ...task, ...updatedTask } : task
          )
        );
        toast.success('Task updated successfully');
      }
    } catch (error ) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating task:', error.response?.data || error.message);
      } else {
        console.error('Error updating task:', error);
      }
      toast.error('Failed to update task');
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 }
    })
  );

  return (
    <div className="min-h-screen bg-gradient-to-br w-screen from-purple-500 via-blue-300 to-blue-500 p-6">
      <div className=" mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">  <NavLink to={'/'}>Task Board</NavLink></h1>
          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            className="bg-white text-purple-600 rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            Add Task
          </button>
        </div>

        <DndContext  onDragEnd={handleDragEnd} sensors={sensors} >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => {
            return (
              <Columns
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
                handleDeleteTask={handleDeleteTask}
                handleUpdateTask={handleUpdateTask}
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
            onTaskAdded={fetchTasks}
          />
        )}
      </div>
    </div>
  );
}

