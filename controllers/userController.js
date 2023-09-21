const {User, Thought} = require("../models")

const userController = {
async getUsers(req, res){
    console.log("here")
    try{
        const userData = await User.find().select("-__v")
        res.json(userData)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
},

async getOneUser(req, res){
    try{
        const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate({ path: 'thoughts' })
        .populate({ path: 'friends' });

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        res.json(user);

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
},

async createUser(req, res){
    try{
        const user = await User.create(req.body)
        res.json(user);

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
},

async updateUser(req, res){
    try{
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        res.json(user);

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
},

async deleteUser(req, res){
    try{
        const user = await User.findByIdAndRemove({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' })
        }

        await Thought.deleteMany({ _id: { $in: user.thoughts }})
        res.json({ message: 'User deleted!' });

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
},

async addFriend(req, res){
    try{
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { new: true }
        )
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' })
        }
        res.json(user);


    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
},

async deleteFriend(req, res){
    try{
        const user = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true }
        )
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' })
        }
        res.json({ message: 'Friend removed!'});

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
},

}

module.exports = userController