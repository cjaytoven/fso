const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')

const Person = require('./models/person')

app.use(express.static('dist'))

morgan.token('request-body', (req) => JSON.stringify(req.body))

const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/info', (request, response) => {
    response.send(
        `Phonebook has info for ${persons.length} people
        <br/>
        ${new Date(Date.now()).toString()}`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(persons => persons.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    //persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})


app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({error: 'name and/or number missing'})
    }
    /*
    if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    */

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
      })
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
