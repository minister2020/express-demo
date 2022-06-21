require('dotenv').config()
const Joi = require('joi')
const express = require('express');
const app = express();

const port = process.env.PORT

app.use(express.json())
app.listen(3000, () => {
    console.log(`  I am listening on port ${port}`)
})
const courses = [
    {id: 1, name: 'Mathematics'},
    {id: 2, name: 'English'},
    {id: 3, name: 'Chemistry'},
    {id: 4, name: 'Biology'},
    {id: 5, name: 'Physics'},
]

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) {
       
        return res.status(404).send('The course with the given ID was not found')
    }

})

app.post('/api/courses' , (req, res) =>{
    const { error } = validateCourse(req.body)
    if(error){
        res.status(400).send(result.error.details[0].message )
        return
    }
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name
    }
        courses.push(newCourse)
        res.send(newCourse)

})

app.put('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) {
      return  res.status(404).send('The course with the given ID was not found')
    }
    const { error } = validateCourse(req.body)
    if(error){
       return res.status(400).send(result.error.detail[0].message )
        
    }

    course.name = req.body.name
    req.send(course)

})

function validateCourse(course){
    const schema = {
        name: Joi.string().required()
    }
    return Joi.validate(course, schema)
}

app.delete('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course){
       return  res.status(404).send('The course with the given ID was not found')
    }
    const index = courses.indexOf(course)

    courses.splice(index, 1)
    res.send(course)
})