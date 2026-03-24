import type { Request, Response } from "express";
import Task, { ITask } from "../models/Task";
import Project from "../models/Project";
import { Types } from "mongoose";

export class TaskController {
    
    static createTask = async (req: Request, res: Response) => {
        
        try {
            const task = new Task(req.body)
            task.project = (req.params.projectId as unknown) as Types.ObjectId
            req.project.tasks.push((task.id as unknown) as Types.ObjectId)
            await Promise.allSettled([task.save(), req.project.save()]) 
            res.send("Tarea creada correctamente")
        } catch (error) {
            console.log(error)
        }
    }

    
    static getAllTasksFromSingleProject = async (req: Request, res: Response) => {

        try {
            const tasks = await Task.find({project: req.params.projectId}).populate("project")
            res.json(tasks)
        } catch (error) {
            console.log(error)
        }
    }

    
    static getTaskFromProject = async (req: Request, res: Response) => {

        try {
            res.json(req.task)
        } catch (error) {
            console.log(error)
        }
    }

    static updateTaskFromProject = async (req: Request, res: Response) => {

        try {
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            res.json("Task Updated")
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Error obteniendo la tarea" })
        }
    }

    static patchStatusTaskFromProject = async (req: Request, res: Response) => {

        const { taskId } = req.params
        const isInProject = req.project.tasks.some(task => task.toString() === taskId)

        if (!isInProject) {
            return res.status(404).json({ error: "Tarea no encontrada" })
        }

        try {
            const existTask = Task.exists({taskId})
            if (!existTask) {
                return res.status(404).json({ error: "Tarea no encontrada" })
            }
            const task = await Task.findByIdAndUpdate(taskId, req.body)

            await task.save()
            res.json("Task Updated")
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Error obteniendo la tarea" })
        }
    }

    static deleteTaskFromProject = async (req: Request, res: Response) => {

        try {
            const { taskId } = req.params
            const newTasks = req.project.tasks.filter(task => task.toString() !== taskId)
            req.project.tasks = newTasks
            await Promise.allSettled([req.task.deleteOne(), req.project.save()])
            res.json("Tarea eliminada")
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Error obteniendo la tarea" })
        }
    }
}