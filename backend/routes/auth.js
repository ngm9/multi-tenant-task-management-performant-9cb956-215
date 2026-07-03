const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/login', async (req,res)=>{
  // {email, password}
  const user = await User.findOne({ email:req.body.email });
  if (!user) return res.status(401).json({error:'Invalid login'});
  if (!bcrypt.compareSync(req.body.password, user.password)) return res.status(401).json({error:'Invalid login'});
  const token = jwt.sign({ id:user._id, tenantId:user.tenantId, roles:user.roles, email:user.email }, 'TOPSECRET', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
