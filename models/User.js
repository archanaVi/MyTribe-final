const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    //unique: true,
    //match: /^.+@.+\..+$/
},
  password: { 
    type: String,
    required: true, 
    bcrypt: true 
},
  role: Boolean,
  color: String,
  //tribe: [ { type: Schema.Types.ObjectId, ref: 'Tribe' } ],
  createdTasks: [ { type: Schema.Types.ObjectId, ref: 'Task' } ],
  assignedTasks: [ { type: Schema.Types.ObjectId, ref: 'Task' } ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;