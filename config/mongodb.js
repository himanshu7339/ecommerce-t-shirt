const mongoose = require('mongoose');

const mongodb = async(url) => {
try {
    await mongoose.connect(url)
    console.log("Mongodb connection established")
} catch (error) {
    console.log(error)
}
}


module.exports = mongodb