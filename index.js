require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('./mongo')
const Person = require('./models/phonebook')

const app = express()

app.use(cors())
app.use(express.json())

// Middlewares
app.use(express.static('dist'))
morgan.token('body', (request, response) => {
        return JSON.stringify(request.body)
    })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = []

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const now = Date.now()
    const date = new Date(now)

    response.status(200).send(`<h1>Phonebook has info for ${persons.length} people</h1> <p>${date}</p>` )
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    const { id } = request.params

    Person.findById(id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const { id } = request.params

    Person.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    }).catch(error => next(error))

    console.log(id);
})

// const generateId = () => {
//     const maxId = persons.length > 0
//     ? Math.max(... persons.map(person => person.id))
//     : 0

//     return maxId + 1
// }

app.post('/api/persons', (request, response) => {
    const person = request.body
    const name = request.body.name
    console.log(person);

    const nameExists = persons.find(person => {
        return person.name === name
    })

    if(!person.name || !person.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    if(nameExists) {
        return response.status(400).json({
            error: 'name already exists',
            name: name
        })
    }

    const newPerson = new Person({
        name: person.name,
        number: person.number
    })
    console.log(newPerson);

    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).end()
}

app.use(unknownEndpoint)

app.use((error, request, response, next) => {
    console.error(error);

    if(error.name === 'CastError') {
        response.status(400).send({
            error: 'id used is malformed'
        })
    } else {
        response.status(500).end()
    }
})

const PORT =  process.env.PORT
app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
})