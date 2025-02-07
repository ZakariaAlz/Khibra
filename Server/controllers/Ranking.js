
const { model, Schema } = require('mongoose');

const rankingModel = new Schema({
    student: { type: Types.ObjectId, ref: 'User' },
    points: { type: Number, default: 0 },
    completedTasks: [{ type: Types.ObjectId, ref: 'Task' }],
    createdAt: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports  = mongoose.model('Ranking', rankingModel, "rankings");
