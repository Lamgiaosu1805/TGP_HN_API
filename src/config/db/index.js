//connect db
const mongoose = require('mongoose')

const connect = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        await mongoose.connect(
          'mongodb+srv://vercel-admin-user:ByDlO0CLmNYrMZDK@cluster0.9eytviv.mongodb.net/test?retryWrites=true&w=majority',
          connectionParams
        )
        console.log("complete")
      } catch (error) {
        console.log("failure")
    }
}

module.exports = { connect }