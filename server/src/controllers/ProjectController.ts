import type { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
    
    static createProject = async (req: Request, res: Response) => {

        const newProject = new Project(req.body)

        try {
            await newProject.save()
            res.send("Proyecto creado correctamente")
        } catch (error) {
            console.log(error)
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log(error)
        }
    }

    static getProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findById(id).populate("tasks")
            if (!project) {
                return res.status(404).json({ error: "Proyecto no encontrado" })
            }
            res.json(project)
        } catch (error) {
            
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const project = await Project.findByIdAndUpdate(id, req.body)
            if (!project) {
                return res.status(404).json({ error: "Proyecto no encontrado" })
            }

            project.save()
            res.json("Proyecto actualizado")
        } catch (error) {
            res.status(500).json({ error: "Error obteniendo el proyecto" })
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findByIdAndDelete(id)
            if (!project) {
                return res.status(404).json({ error: "Proyecto no encontrado" })
            }
            //project.deleteOne({id : project.id})
            res.json("Proyecto borrado")
        } catch (error) {
            res.status(500).json({ error: "Error obteniendo el proyecto" })
        }
    }
}