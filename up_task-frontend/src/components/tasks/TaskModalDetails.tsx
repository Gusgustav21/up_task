import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { changeStatusTask, getTaskById } from '@/api/TaskAPI';
import { formatDate } from '@/utils/index';
import { statusTranslations } from '@/locales/index';
import { toast } from 'react-toastify';
import type { TaskStatus } from '@/types/index';

export default function TaskModalDetails() {

    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get("taskView")
    const show = taskId ? true : false

    const { data } = useQuery({
        queryKey: ['task', projectId, taskId],
        queryFn: () => getTaskById({projectId, taskId: taskId!}),
        retry: 2,
        enabled: !!taskId
    })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: changeStatusTask,
        onError: (res) => {
            toast.error(res.message)
        },
        onSuccess: (res) => {
            toast.success(res)
            queryClient.invalidateQueries({queryKey: ["getProject", projectId]})
            queryClient.invalidateQueries({queryKey: ['task', projectId, taskId]})
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const statusData = {
            taskId: taskId!,
            projectId: projectId!,
            taskStatus: e.target.value.toString() as TaskStatus
        }
        mutate(statusData)
    }

    const task = data!
  
    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: {formatDate(task?.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatDate(task?.updatedAt)}</p>
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{task?.name}
                                    </DialogTitle>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {task?.description}</p>
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual: {task?.taskStatus}</label>
                                        <div className="flex flex-col gap-5">
                                        <label
                                            className="font-normal text-2xl"
                                            htmlFor="taskStatus"
                                        >Estado de la tarea</label>
                                        <select 
                                            id="taskStatus"
                                            className="w-full p-3 rounded-sm border-gray-300 border"
                                            onChange={handleChange}
                                            defaultValue={data?.taskStatus}
                                        >
                                            {Object.entries(statusTranslations).map(([value, label]) => (
                                                <option key={value} value={value}>{label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}