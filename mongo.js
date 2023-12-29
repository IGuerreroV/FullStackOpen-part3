const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URI

mongoose.connect(connectionString)
.then(result => {
    console.log('connected to MongoDB');
})
.catch((error) => {
    console.log('error connecting to MongoDB', error.message);
})
