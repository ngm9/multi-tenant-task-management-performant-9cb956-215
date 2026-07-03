const Task = require('../models/Task');
const mongoose = require('mongoose');
// Note: Error handling/basic validation only for brevity
exports.listTasks = async (req,res) => {
  // Query: status, dueDate (range), paginated, tenant scoped
  const { status, dueAfter, dueBefore, page=1, limit=10 } = req.query;
  const q = { tenantId: req.user.tenantId };
  if (status) q.status=status;
  if (dueAfter || dueBefore) q.dueDate={};
  if (dueAfter) q.dueDate['$gte']=new Date(dueAfter);
  if (dueBefore) q.dueDate['$lte']=new Date(dueBefore);
  const tasks = await Task.find(q).skip((page-1)*limit).limit(Number(limit)).sort({ dueDate:1 });
  res.json(tasks);
};
exports.createTask = async (req,res) => {
  // Only admin, validate body
  const t = new Task({ ...req.body, tenantId: req.user.tenantId, createdBy: req.user.id, audit:{ createdAt:new Date(), updatedAt:new Date()} });
  await t.save();
  res.status(201).json(t);
};
exports.getTask = async (req,res) => {
  const task = await Task.findOne({ _id:req.params.id, tenantId:req.user.tenantId });
  if (!task) return res.status(404).json({error:'Not found'});
  res.json(task);
};
exports.updateTask = async (req,res) => {
  const task = await Task.findOneAndUpdate({ _id:req.params.id, tenantId:req.user.tenantId },
    { ...req.body, 'audit.updatedAt':new Date() }, { new:true });
  if (!task) return res.status(404).json({error:'Not found'});
  res.json(task);
};
exports.deleteTask = async (req,res) => {
  await Task.deleteOne({ _id:req.params.id, tenantId:req.user.tenantId });
  res.json({ success:true });
};
exports.assignTask = async (req,res) => {
  // Atomically assign to user within transaction
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const task = await Task.findOneAndUpdate(
      { _id:req.params.id, tenantId:req.user.tenantId },
      { assignee:req.body.assignee, 'audit.updatedAt':new Date() },
      { new:true, session }
    );
    if (!task) throw new Error('Task not found');
    // Could update user doc or audit log if needed here
    await session.commitTransaction();
    res.json(task);
  } catch(e) {
    await session.abortTransaction();
    res.status(400).json({error: e.message||'Assignment failed'});
  } finally {
    session.endSession();
  }
};
