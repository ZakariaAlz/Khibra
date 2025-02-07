const { model, Schema } = require('mongoose');

const TaskModel = new Schema({

    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    postedBy: { type: Schema.Types.ObjectId , ref: 'User', required: true}, //Company ID  
    applicants: [{ type: Schema.Types.ObjectId , ref: 'User', required: true }], //Students applying for the task
}, 
{ timestamps: true } // Auto manages created_at and updated_at
);

module.exports = model('Task', TaskModel, "tasks")




