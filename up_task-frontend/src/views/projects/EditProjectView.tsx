import { useParams } from "react-router-dom"

export default function EditProjectView() {

    const params = useParams()

    const projectId = params.projectId!

    return (
        <div>EditProjectView</div>
    )
}
