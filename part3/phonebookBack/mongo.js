/*
const mongoose = require('mongoose')
let retrievePersons = false;
let addPerson = false;

if (process.argv.length == 3) retrievePersons = true

else if (process.argv.length == 5) addPerson = true

else {
    console.log('please provide arguments in the following format: [password] ["name"] [number]')
    process.exit(1)
}


const password = process.argv[2]

const url =
    `mongodb+srv://cjfullstack:${password}@fsop3.4hss8.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=FSOp3`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

if (addPerson) {
    person.save().then(result => {
        console.log('note saved!')
        mongoose.connection.close()
    })
}

else if (retrievePersons){
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
*/