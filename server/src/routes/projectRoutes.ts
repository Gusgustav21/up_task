import { Router } from "express"
import { body, param } from "express-validator"
import { ProjectController } from "../controllers/ProjectController"
import { handleInputErrors } from "../middleware/validation"
import { TaskController } from "../controllers/TaskController"
import { taskStatus, type TaskStatus } from "../models/Task"
import projectExists from "../middleware/project"
import taskExists from "../middleware/task"

const router = Router()

router.post("/", 
    
    body("projectName").notEmpty().withMessage("Project name cannot be empty"),

    body("clientName").notEmpty().withMessage("Client name cannot be empty"),

    body("description").notEmpty().withMessage("Description cannot be empty"),
    
    handleInputErrors,

    ProjectController.createProject
)

router.get("/", ProjectController.getAllProjects)

router.get("/:id", 
    
    param("id").isMongoId().withMessage("ID not valid"),

    handleInputErrors,
    
    ProjectController.getProject
)

router.put("/:id", 

    param("id").isMongoId().withMessage("ID not valid"),

    body("projectName").notEmpty().withMessage("Project name cannot be empty"),

    body("clientName").notEmpty().withMessage("Client name cannot be empty"),

    body("description").notEmpty().withMessage("Description cannot be empty"),
    
    handleInputErrors,

    ProjectController.updateProject
)

router.delete("/:id", 
    
    param("id").isMongoId().withMessage("ID not valid"),

    handleInputErrors,
    
    ProjectController.deleteProject
)

// Tasks Routes
router.param("projectId", projectExists)
router.param("taskId", taskExists)

router.post("/:projectId/tasks",

    body("name").notEmpty().withMessage("Name cannot be empty"),

    body("description").notEmpty().withMessage("Description cannot be empty"),

    handleInputErrors,

    TaskController.createTask
)

router.get("/:projectId/tasks",

    param("projectId").isMongoId().withMessage("Project ID not valid"),

    handleInputErrors,

    TaskController.getAllTasksFromSingleProject
)

router.get("/:projectId/tasks/:taskId", 

    param("projectId").isMongoId().withMessage("Project ID not valid"),
    
    param("taskId").isMongoId().withMessage("Task ID not valid"),

    handleInputErrors,
    
    TaskController.getTaskFromProject
)

router.put("/:projectId/tasks/:taskId", 

    param("projectId").isMongoId().withMessage("Project ID not valid"),

    param("taskId").isMongoId().withMessage("Task ID not valid"),

    body("name").notEmpty().withMessage("Name cannot be empty"),

    body("description").notEmpty().withMessage("Description cannot be empty"),
    
    handleInputErrors,

    TaskController.updateTaskFromProject
)

router.patch("/:projectId/tasks/:taskId", 

    param("projectId").isMongoId().withMessage("Project ID not valid"),

    param("taskId").isMongoId().withMessage("Task ID not valid"),

    body("taskStatus").notEmpty().withMessage("Status cannot be empty")
                      .custom(status => Object.values(taskStatus).includes(status as TaskStatus))
                      .withMessage("Status isn't a valid status"),
    
    handleInputErrors,

    TaskController.patchStatusTaskFromProject
)

router.delete("/:projectId/tasks/:taskId", 

    param("projectId").isMongoId().withMessage("Project ID not valid"),
    
    param("taskId").isMongoId().withMessage("Task ID not valid"),

    handleInputErrors,
    
    TaskController.deleteTaskFromProject
)

export default router