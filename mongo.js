const mongoose = require('mongoose')

const password = process.argv[2]
// const name = process.argv[3]
// const number = process.argv[4]

const validateArgs = () => {

    if(password.length < 8) {
        console.log('Error: Password must be at least 8 characters long');
        process.exit(1)
    }

    // if(!name) {
    //     console.log('Error: Name cannont be empty');
    //     process.exit(1)
    // }

    // if(!number) {
    //     console.log('Errpr: Number cannont be empty');
    //     process.exit(1)
    // }
}

validateArgs()

const url = `mongodb+srv://ivan:${password}@cluster0.ew2dyig.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)
    .then(() => {
        console.log('Database connected')
    }).catch(err => {
        console.log(err);
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//     name: 'Gabriela',
//     number: '6789123',
// })

// person.save().then(result => {
//     console.log(`added ${result} to phonebook`);
//     mongoose.connection.close()
// })

Person
    .find({})
    .then(result => {
        result.forEach(person => {
            console.log(person);
        })
        mongoose.connection.close()
    })