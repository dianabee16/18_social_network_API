const { Thought, User } = require('../models');
const thoughtController = {
    async getThoughts(req, res) {
        try {
          const dbThoughtData = await Thought.find()
            .sort({ createdAt: -1 });
    
          res.json(dbThoughtData);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

      async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'Thought does not exist' });
            }
            res.json(thought);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id }},
                { new: true }
            );
            res.json(thought);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if (!thought) {
                return res.status(404).json({ message: 'Thought does not exist' });
            }
            res.json(thought);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'Thought does not exist' });
            }
            res.json({message: 'Thought removed!'});
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },
   
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            )
            if (!thought) {
                return res.status(404).json({ message: 'Thought does not exist' });
            }
            res.json(thought);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            )
            if (!thought) {
                return res.status(404).json({ message: 'Reaction does not exist' });
            }
            res.json({ message: 'Reaction removed!'});
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    }
};

module.exports = thoughtController;