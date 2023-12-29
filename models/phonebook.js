const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

// const person = new Person({
//     name: 'Gabriela',
//     number: '6789123',
// })

// person.save().then(result => {
//     console.log(`added ${result} to phonebook`);
//     mongoose.connection.close()
// })

// Person
//     .find({})
//     .then(result => {
//         result.forEach(person => {
//             console.log(person);
//         })
//         mongoose.connection.close()
//     })