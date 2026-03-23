import { Link, useNavigate } from "react-router-dom"
import { updateProject } from "@/api/ProjectAPI"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Project, ProjectFormData } from "@/types/index"
import { toast } from "react-toastify"
import ProjectForm from "./ProjectForm"

interface EditProjectFormProps {
    data: ProjectFormData
    projectId: string
}

export default function EditProjectForm({ data, projectId }: EditProjectFormProps) {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: {errors} } = useForm<Project>({defaultValues: data})

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (res) => {
            toast.error(res.message)
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ["editProject", projectId]})
            queryClient.invalidateQueries({queryKey: ["projects"]})
            toast.success(res)
            navigate("/")
        }
    })

    const handleForm = (data: Project) => {
        const formData = {
            formData: data,
            projectId
        }
        mutate(formData)
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Editar Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Edite los datos de su proyecto</p>

                <nav className="my-10">
                    <Link
                        to={"/"}
                        className="bg-purple-400 hover:bg-purple-500 rounded-lg hover:rounded-3xl font-bold px-10 py-3 text-white text-xl cursor-pointer transition-all"
                    >
                        Volver a Proyectos
                    </Link>
                </nav>
                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />

                    <input
                        type="submit"
                        value="Guardar"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold rounded-md transition-colors"
                    />
                </form>
            </div>
        </>
    )
}
