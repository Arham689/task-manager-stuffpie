
import Task from "../models/task.model";
import { Request, Response } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import User from "../models/user.model";

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'your-secret-key';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log( "user" , req.user)
        const { _id , email } = req.user || {};
        
        const tasks = await Task.find({ userId  : _id  });
        console.log(tasks)
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const { _id , email } = req.user || {};

        const { title, description } = req.body;
        console.log("user" , req.user   )
        if (!title || !description) {
            res.status(400).json({ message: 'Title and description are required' });
            return;
        }
        // Create a new task
        const newTask = new Task({
            userId : _id,
            title,
            description,
        });
        await newTask.save();
        const task = await Task.findOne({userId : _id })
        if(!task) return 

        const userUpdateResult = await User.updateOne({ _id  } , { $push: { taskIds: task._id }} )
       
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const {_id , email } = req.user || {};
        const { taskId } = req.params; 
        const { title, description } = req.body;

        // Find the task and update it
        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, userId : _id  },
            { title, description },
            { new: true }
        );

        if (!updatedTask) {
            res.status(404).json({ message: 'Task not found or not authorized' });
            return;
        }

        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { _id , email } = req.user || {};
        const { taskId } = req.params;

        const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId : _id  });

        if (!deletedTask) {
            res.status(404).json({ message: 'Task not found or not authorized' });
            return;
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
