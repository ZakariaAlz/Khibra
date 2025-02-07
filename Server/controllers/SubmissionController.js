const Submission = require('../models/Submission');

class SubmissionController {
    static async createSubmission(req, res) {
        if (req.user.role !== 'student') return res.status(403).json({ msg: 'Only students can submit work' });

        try {
            const { taskId, fileUrl } = req.body;
            const submission = new Submission({ task: taskId, student: req.user.id, fileUrl });
            await submission.save();
            res.status(201).json(submission);
        } catch (err) {
            res.status(500).json({ msg: 'Server Error' });
        }
    }

    static async getSubmissions(req, res) {
        try {
            const submissions = await Submission.find().populate('student', 'name');
            res.json(submissions);
        } catch (err) {
            res.status(500).json({ msg: 'Server Error' });
        }
    }
}

module.exports = SubmissionController;
