import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AssignTaskForm = React.lazy(() => import('../components/AssignTaskForm'));
export default function TaskDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    axios.get(`/api/tasks/${id}`, { headers:{ Authorization: `Bearer ${user?.token}` } })
    .then(res=>setTask(res.data)).catch(()=>setError('Task not found'));
  }, [id, user]);
  if (!user) return <div>Please login</div>;
  if (error) return <div>{error}</div>;
  if (!task) return <div>Loading...</div>;
  return (
    <div>
      <h3>{task.title}</h3>
      <div>{task.description}</div>
      <div>Status: {task.status}, Due: {new Date(task.dueDate).toLocaleDateString()}</div>
      <Suspense fallback={<div>Loading assign form...</div>}>
        {user.roles.includes('admin') && <AssignTaskForm taskId={id} />}
      </Suspense>
    </div>
  )
}
