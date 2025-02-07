const { model, Schema } = require('mongoose');

// Connect to MongoDB
const userModel = new Schema({
    
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phonenumber: { type: String, required: true },
    role: { type: String, enum: ['student', 'admin', 'startup'], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


module.exports = model('User', userModel, "users");
