db = db.getSiblingDB('utkrusht_taskmgr');
db.createUser({user:'utkrushtadmin', pwd:'utkrushtpass', roles:[{role:'readWrite',db:'utkrusht_taskmgr'}]});

// Tenants
const tenants = [
  { _id:ObjectId(), name:'Acme', slug:'acme' },
  { _id:ObjectId(), name:'Globex', slug:'globex' }
];
db.Tenants.drop(); db.Tenants.insertMany(tenants);

// Users
const users = [
  { _id:ObjectId(), tenantId:tenants[0]._id, email:'admin1@acme.com', password:'$2b$10$HashedAdminPw', roles:['admin'], name:'Acme Admin' },
  { _id:ObjectId(), tenantId:tenants[0]._id, email:'member1@acme.com', password:'$2b$10$HashedMemberPw', roles:['member'], name:'Acme Member' },
  { _id:ObjectId(), tenantId:tenants[1]._id, email:'admin1@globex.com', password:'$2b$10$HashedAdminPw', roles:['admin'], name:'Globex Admin' },
  { _id:ObjectId(), tenantId:tenants[1]._id, email:'viewer1@globex.com', password:'$2b$10$HashedViewerPw', roles:['viewer'], name:'Globex Viewer' }
];
db.Users.drop(); db.Users.insertMany(users);

// Tasks (minimal seed, varied status, dueDates)
const tasks=[];
const statuses=["pending","in_progress","done"];
for (let i=0; i<30; i++) {
  let tid = tenants[i%2]._id;
  let assignee = users.filter(u=>u.tenantId.equals(tid))[i%2]._id;
  tasks.push({
    _id:ObjectId(),
    tenantId:tid,
    title:`Task ${i+1}`,
    description:`Task description for task ${i+1}`,
    assignee,
    status:statuses[i%3],
    dueDate:new Date(2024,3 + (i%2),1 + (i%6)),
    createdBy:users[0]._id,
    audit:{ createdAt: new Date(2024,2,1), updatedAt: new Date(2024,2,1) }
  })
}
db.Tasks.drop(); db.Tasks.insertMany(tasks);

// Add validations to Tasks
const taskSchema = {
  bsonType: "object",
  required: [ "tenantId", "title", "description", "status", "dueDate" ],
  properties: {
    tenantId: { bsonType: "objectId" },
    title: { bsonType: "string", minLength:2 },
    description: { bsonType: "string" },
    assignee: { bsonType: ["objectId","null"] },
    status: { enum:["pending","in_progress","done"] },
    dueDate: { bsonType: "date" },
    createdBy: { bsonType: "objectId" },
    audit: {
      bsonType: "object",
      properties: {
        createdAt: {bsonType:"date"},
        updatedAt: {bsonType:"date"}
      }
    }
  }
};
db.runCommand({ collMod: "Tasks", validator:{ $jsonSchema: taskSchema } });
db.Tasks.createIndex({tenantId:1, status:1, dueDate:1});
db.Tasks.createIndex({assignee:1});
