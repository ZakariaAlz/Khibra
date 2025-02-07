const { model, Schema } = require('mongoose');

// Connect to MongoDB
const UserModel = new Schema({
    
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true }, //Store hashed password
    role: { type: String, enum: ['student', 'company', 'admin'], required: true },
    points: { type: Number, default: 0 },// for students ranking 
}, 
    { timestamps: true } // Auto manages created_at and updated_at
);

module.exports = model('User', UserModel, "users");
