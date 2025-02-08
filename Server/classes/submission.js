const SubmissionModel = require("../models/submissionModel");
const UserModel = require("../models/userModel");
const TaskModel = require("../models/taskModel");

class Submission {
  // ✅ Create a new submission (Student submits a task)
  static async create(submission) {
    return await SubmissionModel.create(submission);
  }

  // ✅ Find all submissions (Admin or Company can see them)
  static async find() {
    return await SubmissionModel.find().populate("studentId", "name").exec();
  }

  // ✅ Find submission by ID
  static async findById(submissionId) {
    return await SubmissionModel.findById(submissionId).populate("studentId", "name").exec();
  }

  // ✅ Company reviews (approve/reject) submissions
  static async reviewSubmission({ submissionId, status }) {
    const submission = await SubmissionModel.findById(submissionId);
    if (!submission) throw new Error("Submission not found");

    if (status !== "approved" && status !== "rejected") throw new Error("Invalid status");

    // Fetch task difficulty to determine points
    const task = await TaskModel.findById(submission.taskId);
    if (!task) throw new Error("Task not found");

    let points = 0;
    if (status === "approved") {
      if (task.difficulty === "Easy") points = 5;
      if (task.difficulty === "Medium") points = 10;
      if (task.difficulty === "Hard") points = 20;

      submission.pointsAwarded = points;

      // ✅ Update Student Points
      await UserModel.findByIdAndUpdate(submission.studentId, { $inc: { points } });
    }

    submission.status = status;
    await submission.save();

    return { submission, message: `Submission ${status}, ${points} points awarded.` };
  }

  // ✅ Delete a submission
  static async delete(submissionId) {
    return await SubmissionModel.deleteOne({ _id: submissionId }).exec();
  }

  // ✅ Get student rankings (Leaderboard)
  static async getLeaderboard() {
    return await UserModel.find({ role: "student" })
      .sort({ points: -1 }) // Sort descending by points
      .select("name email points")
      .limit(10);
  }
}

module.exports = Submission;
