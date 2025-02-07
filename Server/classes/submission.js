const SubmissionModel = require("../models/submissionModel");

class Submission {
  // Create a new submission
  static async create(submission) {
    return await SubmissionModel.create(submission);
  }

  // Find all submissions
  static async find() {
    return await SubmissionModel.find().populate("studentId", "name").exec();
  }

  // Find submission by ID
  static async findById(submissionId) {
    return await SubmissionModel.findById(submissionId).populate("studentId", "name").exec();
  }

  // Update submission status
  static async update(id, status) {
    return await SubmissionModel.updateOne({ _id: id }, { $set: { status } }).exec();
  }

  // Delete submission
  static async delete(submissionId) {
    return await SubmissionModel.deleteOne({ _id: submissionId }).exec();
  }
}

module.exports = Submission;
