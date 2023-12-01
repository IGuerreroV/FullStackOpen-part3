const express = require('express')
const app = express()

let = persons = [
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
        numer: "12345678"
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
})