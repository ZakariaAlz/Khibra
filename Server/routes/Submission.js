const { model, Schema } = require('mongoose');

const submissionModel = new Schema({

    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fileUrl: { type: String },
    score: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = model ('Submission', submissionModel, "submissions");