//connect db
const mongoose = require('mongoose')

console.log("Test");

const connect = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        await mongoose.connect(
          process.env.MONGODB_URI_PRODUCT,
          connectionParams
        )
        console.log("complete")
      } catch (error) {
        console.log("failure")
    }
}

module.exports = { connect }