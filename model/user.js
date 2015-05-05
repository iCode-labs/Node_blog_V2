var user = {};
exports = module.exports = user;

user.Schema = {
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    regist_time: {
        type: Date,
        default: Date.now
    }
};

user.collection = {
    collection: 'Users'
};

user.statics = {
    getAccounts: function() {
        return this.find().exec();
    }
};
