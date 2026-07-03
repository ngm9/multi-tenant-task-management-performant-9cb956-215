import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function AssignTaskForm({taskId}) {
  const [assignee, setAssignee] = useState('');
  const [msg, setMsg] = useState('');
  const { user } = useAuth();
  async function assign(e) {
    e.preventDefault(); setMsg('');
    try {
      await axios.post(`/api/tasks/${taskId}/assign`, { assignee }, { headers: { Authorization: `Bearer ${user.token}` } });
      setMsg('Assigned!');
    } catch {
      setMsg('Assignment error');
    }
  }
  return (
    <form onSubmit={assign}>
      <input value={assignee} onChange={e=>setAssignee(e.target.value)} placeholder="Assignee UserId" />
      <button type="submit">Assign</button>
      {msg && <div>{msg}</div>}
    </form>
  )
}
