//connect db
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

const connect = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        await mongoose.connect(
          process.env.MONGODB_URI,
          connectionParams
        )
        console.log("complete")
      } catch (error) {
        console.log("failure")
    }
}

module.exports = { connect }