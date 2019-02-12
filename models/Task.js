const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const taskSchema = new Schema({
  task: String,
  description: String,
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  status: {
    type: String,
    enum: ['To do','Doing', 'Done'],
    default: 'To do'
  },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;