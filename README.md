### Task Overview
Utkrushtâ€™s multi-tenant task management platform enables organizations to track tasks across teams with secure, role-based access. You are provided with a working MERN stack skeleton: Express server with route scaffolding, MongoDB connection, and a React SPA with navigation and authentication stubs. Your primary objective is to complete and optimize the backend and schema logic and integrate sophisticated task-related APIs into the React frontend. Key requirements include: robust MongoDB schema (validation/indexes), secure JWT-protected Express routes using custom role-check middleware, correct transaction logic, and frontend integration to respect roles and tenant scoping.

### Objectives
- Complete and validate the Task MongoDB schema.
- Implement end-to-end secure task CRUD/assign routes in Express, with RBAC and transaction support.
- Optimize common task queries.
- Integrate at least two frontend React components wired to APIs, with correct loading/error states and permission-based controls.
- Ensure state management reflects roles/auth, and lazy-loads task details.

### How to Verify
- Run provided Jest (backend) and React Testing Library tests (frontend) for basic coverage.
- Validate MongoDB schema by inserting malformed tasks (should reject).
- Use API tools (Postman) to verify endpoint auth, permission-blocks, transaction safety.
- Use sample_queries.js for timing/key query tests.
- In React, login as different roles/tenants and confirm only permitted actions are enabled; check for correct error/loading UI, and lazy loading of details.

### Helpful Tips
- Apply JSON Schema validation for the Task collection; fields: tenantId, title, description, assignee, status enum, dueDate (ISO), audit fields, etc.
- Create appropriate indexes for query/filter efficiency.
- All task CRUD and assignment endpoints should use Express, Mongoose, and transaction APIs to atomically update user/task as required; use robust error handling.
- Secure API using JWT (with role claims); use a reusable RBAC middleware to restrict operations, and plug in on all task routes.
- React: Integrate API with TaskList, protected TaskDetail (lazy loaded), and permission-aware actions/forms (Formik/Yup). Manage auth and current user/roles in Context/global state. Use custom hooks for API and user/permission access.
