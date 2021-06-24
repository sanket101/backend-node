const User = require('../models/user');


const UserDao = {
    findOneUser : userObj => {
        return User.findOne(userObj);
    },    
    saveUser : userObj => {
        const newUser = new User(userObj);
        return newUser.save();
    },
    deleteUser : userObj => {
        return User.findOneAndDelete(userObj);
    }
};

module.exports = UserDao;