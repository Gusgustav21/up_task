import mongoose, {Schema, Document, Types} from "mongoose"

export const taskStatus = {
    PENDING: "pending",
    ON_HOLD: "on_hold",
    IN_PROGRESS: "in_progress",
    UNDER_REVIEW: "under_review",
    COMPLETED: "completed"
} as const
    
export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface ITask extends Document {
    name: string
    description: string
    project: Types.ObjectId
    taskStatus: TaskStatus
}

const TaskSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    project: {
        type: Types.ObjectId,
        ref: "Project",
        required: true
    },
    taskStatus: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
    }
}, {timestamps: true})

const Task = mongoose.model<ITask>("Task", TaskSchema)
export default Task