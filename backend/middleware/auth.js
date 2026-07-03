const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
  let header=req.headers['authorization']||'';
  if (!header.startsWith('Bearer ')) return res.status(401).json({error:'No token'});
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, 'TOPSECRET');
    req.user = payload;
    next();
  } catch(e) {
    return res.status(401).json({error:'Invalid token'});
  }
};
