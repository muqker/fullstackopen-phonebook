const express = require('express')
const app = express()
app.use(express.json())

let persons = [
  {
    name: 'Mup Daemon',
    number: "0040-799-888",
    id: 1
  },
  {
    name: 'Jock Sporow',
    number: "0010-444-333",
    id: 2
  },
  {
    name: 'Pataly Nortman',
    number: "0031-123-456",
    id: 3
  },
  {
    name: 'Chalie Z the Ronn',
    number: "0066-1000-22-44",
    id: 4
  },      
]

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>` 
    + `<p>${new Date()}</p>`
  )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (!person)
    return response.status(404).end()
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
  const body = request.body

  // validation
  if (!body.name)
    return response.status(400).json({error: 'name missing'})

  if (!body.number)
    return response.status(400).json({error: 'number missing'})

  if (persons.find(person => person.name === body.name))
    return response.status(400).json({error: 'name exists'})

  // add it 
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
  }
  persons = persons.concat(person)
  response.json(person)
})

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
