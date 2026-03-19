import type { Request, Response, NextFunction } from "express"
import Task, { ITask } from "../models/Task"

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

export default async function taskExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { taskId } = req.params
        const task = await Task.findById(taskId)

        if (!task) {
            return res.status(404).json({ error: "Tarea no encontrada" })
        }

        const isInProject = req.project.tasks.some(task => task.toString() === taskId)

        if (!isInProject) {
            return res.status(404).json({ error: "Tarea no encontrada" })
        }

        req.task = task

        next()
    } catch (error) {
        res.status(500).json({error: "There was an error"})        
    }
}