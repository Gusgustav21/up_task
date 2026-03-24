import { getTaskById } from '@/api/TaskAPI'
import { useQuery } from '@tanstack/react-query'
import { useParams, useLocation } from 'react-router-dom'
import EditTaskModal from './EditTaskModal'

export default function EditTaskData() {
    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get("taskId")
    const show = taskId ? true : false
    
    const { data } = useQuery({
            queryKey: ['editTask', projectId, taskId],
            queryFn: () => getTaskById({projectId, taskId: taskId!}),
            retry: 2,
            enabled: !!taskId
    })

    if(data) return <EditTaskModal data={data} show={show} />
}
