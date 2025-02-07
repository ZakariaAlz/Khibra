const { model, Schema } = require('mongoose');

const taskModel = new Schema({

    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
    createdBy: { type: Types.ObjectId, ref: 'User' },
    submissions: [{ type: Types.ObjectId, ref: 'Submission' }],
    createdAt: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});


module.exports = model('Task', taskModel, "tasks")




