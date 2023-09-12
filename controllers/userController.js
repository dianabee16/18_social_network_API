const {User, Thought} = require("../models")

const userController = {
async getUsers(req, res){
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

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
},

async createUser(req, res){
    try{

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
},

async updateUser(req, res){
    try{

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
},

async deleteUser(req, res){
    try{

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
},

async addFriend(req, res){
    try{

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
},

async deleteFriend(req, res){
    try{

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
},

}

module.exports = userController