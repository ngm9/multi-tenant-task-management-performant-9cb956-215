// API: List tasks for a tenant as admin (should be fast, paginated, status filter)
fetch('/api/tasks?status=pending', { headers:{'Authorization': 'Bearer <ADMIN_TOKEN>'}}).then(r=>r.json()).then(console.log);
// MongoDB: Task find with explain()
db.Tasks.find({ tenantId: ObjectId('...'), status:'pending' }).explain('executionStats');
// Assignment endpoint with forbidden user
fetch('/api/tasks/123/assign', { method:'POST', headers:{'Authorization':'Bearer <MEMBER_TOKEN>','Content-Type':'application/json'}, body:JSON.stringify({ assignee:'...' }) }).then(r=>r.json()).then(console.log);
// React: Load /tasks as viewer/editor, verify disabled/enabled actions
