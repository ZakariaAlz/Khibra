const { model, Schema } = require('mongoose');

const SubmissionModel = new Schema({

    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    solution: {type: String, required: true}, //Link or description of the solution
    status: {type: String, enum : ['pending', 'approved', 'rejected'], default: 'pending'},
    pointsAwarded: { type: Number, default: 0 } // ✅ Store points earned
},
  { timestamps: true } // Auto manages created_at and updated_at
);

module.exports = model ('Submission', SubmissionModel, "submissions");