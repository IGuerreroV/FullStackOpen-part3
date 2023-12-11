const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

// Middlewares
app.use(express.static('dist'))
morgan.token('body', (request, response) => {
        return JSON.stringify(request.body)
    })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "1234567"
    },
    {
        id: 4,
        name: "Ivan Guerrero",
        number: "987654321"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const now = Date.now()
    const date = new Date(now)

    response.status(200).send(`<h1>Phonebook has info for ${persons.length} people</h1> <p>${date}</p>` )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id);
    const person = persons.find(person => {
        return person.id === id
    })

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
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

    const newPerson = {
        id: Math.floor(Math.random() * 10000),
        name: person.name,
        number: person.number
    }
    console.log(newPerson);

    persons = [...persons, newPerson]

    response.json(newPerson)
})

const PORT =  process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
})