import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TaskForm from "./TaskForm";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { Task, TaskFormData } from "@/types/index";
import { toast } from "react-toastify";
import { updateTask } from "@/api/TaskAPI";

interface EditTaskModalProps {
    data: Task
    show: boolean
}
/*
const statusTranslations: Record<"pending"|"on_hold"|"in_progress"|"under_review"|"completed", string> = {
    pending: "Pendiente",
    on_hold: "En Espera",
    in_progress: "En Progreso",
    under_review: "En Revisión",
    completed: "Completada"
}*/

export default function EditTaskModal({ data, show }: EditTaskModalProps) {

    const params = useParams()
    const projectId = params.projectId!

    const navigate = useNavigate()

    const initialValues: TaskFormData = {
        name: data.name,
        description: data.description
    }

    const queryClient = useQueryClient()
    
    const { register, handleSubmit, reset, formState: {errors} } = useForm<TaskFormData>({defaultValues: initialValues})

    
    const { mutate } = useMutation({
        mutationFn: updateTask,
        onError: (res) => {
            toast.error(res.message)
        },
        onSuccess: (res) => {
            toast.success(res)
            queryClient.invalidateQueries({queryKey: ["getProject", projectId]})
            queryClient.invalidateQueries({queryKey: ['editTask', projectId, data._id]})
            reset()
            navigate(`/projects/${projectId}`)
        }
    })
    
    const handleForm = (taskData: TaskFormData) => {
        const formData = {
            taskData,
            projectId,
            taskId: data._id
        }
        mutate(formData)
    }
        

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true}) }>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Editar Tarea
                                </Dialog.Title>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {""}
                                    <span className="text-fuchsia-600">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3 flex flex-col gap-6"
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                >
                                    <TaskForm errors={errors} register={register}/>

                                    {/*<div className="flex flex-col gap-5">
                                        <label
                                            className="font-normal text-2xl"
                                            htmlFor="taskStatus"
                                        >Estado de la tarea</label>
                                        <select 
                                            id="taskStatus"
                                            className="w-full p-3 rounded-sm border-gray-300 border"
                                            {...register("taskStatus", { required: true })}
                                        >
                                            {Object.entries(statusTranslations).map(([value, label]) => (
                                                <option key={value} value={value}>{label}</option>
                                            ))}
                                        </select>
                                    </div>*/}
                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold rounded-md transition-colors cursor-pointer"
                                        value="Guardar Tarea"
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}