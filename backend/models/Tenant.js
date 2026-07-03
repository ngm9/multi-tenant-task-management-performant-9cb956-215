const mongoose = require('mongoose');
const TenantSchema = new mongoose.Schema({
  name: String,
  slug: String
});
module.exports = mongoose.model('Tenant', TenantSchema);
