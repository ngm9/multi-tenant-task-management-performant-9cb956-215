// Usage: rbac.only('role') OR rbac.any(['role1',...])
exports.only = role => (req,res,next) => (req.user && req.user.roles.includes(role)) ? next() : res.status(403).json({error:'Forbidden'});
exports.any = roles => (req,res,next) => (req.user && roles.some(r=>req.user.roles.includes(r))) ? next() : res.status(403).json({error:'Forbidden'});
