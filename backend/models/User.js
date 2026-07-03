const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required:true, ref:'Tenant' },
  email: { type: String, required:true },
  password: { type: String, required:true },
  roles: [ String ],
  name: String
});
UserSchema.index({ tenantId:1, email:1 }, { unique: true });
module.exports = mongoose.model('User', UserSchema);
