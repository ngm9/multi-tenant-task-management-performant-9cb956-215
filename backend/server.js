const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const rbac = require('./middleware/rbac');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://utkrushtadmin:utkrushtpass@mongo:27017/utkrusht_taskmgr?authSource=admin');

app.get('/api/health', (req,res)=>res.send('ok'));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((err,req,res,next)=>res.status(500).json({error:'Internal Error'}));
app.listen(5000,()=>console.log('API running on 5000'));
