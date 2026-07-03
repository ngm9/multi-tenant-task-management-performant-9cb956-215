const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
  title: { type: String, required: true },
  description: String,
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum:['pending','in_progress','done'], required:true },
  dueDate: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  audit: {
    createdAt: Date,
    updatedAt: Date
  }
});
TaskSchema.index({ tenantId:1, status:1, dueDate:1 });
TaskSchema.index({ assignee:1 });
module.exports = mongoose.model('Task', TaskSchema);
