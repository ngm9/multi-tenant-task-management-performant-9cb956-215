import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios.get('/api/tasks', {
      headers:{ Authorization: `Bearer ${user?.token}` }, params:{ status }
    }).then(res=>setTasks(res.data)).finally(()=>setLoading(false));
  }, [user, status]);
  if (!user) return navigate('/login');
  return (
    <div>
      <select value={status} onChange={e=>setStatus(e.target.value)}>
        <option value="">All statuses</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      {loading ? 'Loading...' : (
        <ul>
          {tasks.map(t => (
            <li key={t._id}><Link to={`/tasks/${t._id}`}>{t.title}</Link> ({t.status})</li>
          ))}
        </ul>
      )}
    </div>
  );
}
