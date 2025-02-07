const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

class User {
  // Create a new user
  static async create(user) {
    user.password = await bcrypt.hash(user.password, 10);
    return await UserModel.create(user);
  }

  // Find all users
  static async find() {
    return await UserModel.find().select("-password").exec();
  }

  // Find a user by ID
  static async findById(userId) {
    return await UserModel.findById(userId).select("-password").exec();
  }

  // Update user by ID
  static async update(id, user) {
    if (user.password) user.password = await bcrypt.hash(user.password, 10);
    return await UserModel.updateOne({ _id: id }, { $set: user }).exec();
  }

  // Delete user by ID
  static async delete(userId) {
    return await UserModel.deleteOne({ _id: userId }).exec();
  }

  // Find user by email
  static async findByEmail(email) {
    return await UserModel.findOne({ email }).exec();
  }
}

module.exports = User;
