const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')

const Person = require('./models/person')

app.use(express.static('dist'))

morgan.token('request-body', (req) => JSON.stringify(req.body))

const cors = require('cors')
const person = require('./models/person')

app.use(cors())

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    Person.find({}).then(persons => {
        response.send(`Phonebook has info for ${persons.length} people
        <br/>
        ${new Date(Date.now()).toString()}`)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({error: 'name and/or number missing'})
    }
 
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
    .then(savedPerson => {
        response.json(savedPerson)
      })
      .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true})
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.staus(400).send({ error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
