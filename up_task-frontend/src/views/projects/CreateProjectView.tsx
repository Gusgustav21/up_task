import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import ProjectForm from "@/components/projects/ProjectForm"
import { createProject } from "@/api/ProjectAPI"
import type { ProjectFormData } from "@/types/index"

export default function CreateProjectView() {

    const navigate = useNavigate()

    const initialValues: ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }
    const { register, handleSubmit, formState: {errors} } = useForm<ProjectFormData>({defaultValues: initialValues})

    const { mutate } = useMutation({
        mutationFn: createProject,
        onError: (res) => {
            toast.error(res.message)
        },
        onSuccess: (res) => {
            toast.success(res)
            navigate("/")
        }
    })

    const handleForm = (data: ProjectFormData) => mutate(data)

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Crear Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario</p>

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
                        value="Crear Proyecto"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold rounded-md transition-colors"
                    />
                </form>
            </div>
        </>
    )
}
