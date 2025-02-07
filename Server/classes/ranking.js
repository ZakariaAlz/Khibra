//  const Ranking = require('../models/Ranking');

// class RankingController {
//     static async getRankings(req, res) {
//         try {
//             const rankings = await Ranking.find().populate('student', 'name points');
//             res.json(rankings);
//         } catch (err) {
//             res.status(500).json({ msg: 'Server Error' });
//         }
//     }
// }

// module.exports = RankingController; 
