const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

const connectDB = async () => {
    mongoose.connect(MONGO_URL,
        async (err) => {
            if (err) throw err;
            console.log('Connected with database.');
        }
    )
};

module.exports = connectDB;