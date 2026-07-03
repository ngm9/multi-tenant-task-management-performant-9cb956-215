const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbac');
const tasksCtrl = require('../controllers/tasksController');

router.use(auth);
router.get('/', rbac.any(['admin','member','viewer']), tasksCtrl.listTasks);
router.post('/', rbac.only('admin'), tasksCtrl.createTask);
router.get('/:id', rbac.any(['admin','member','viewer']), tasksCtrl.getTask);
router.put('/:id', rbac.any(['admin','member']), tasksCtrl.updateTask);
router.delete('/:id', rbac.only('admin'), tasksCtrl.deleteTask);
router.post('/:id/assign', rbac.only('admin'), tasksCtrl.assignTask);

module.exports = router;
