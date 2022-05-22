const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const Item = require('./models/items')
app.use(express.static('public'))

const port = process.env.PORT || 3000

app.use(express.urlencoded({extended: false}))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost/items"

const db = mongoose.connection

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => {
      console.log('database connected')
  })

  //optional good measures
db.on('error', (err) => {
    console.log('ERROR:', err)
  })
  db.on('connected', () => {
    console.log('mongo connected')
  })
  db.on('disconnected', () => {
    console.log('mongo disconnected')
  })

  //controller calls
  const invController = (require('./controllers/invController.js'))
  app.use('/', invController)

  app.get('/', (req, res) => {
    res.send('Hello World!'); // or do whatever you want with req or res
  })

  app.listen(port, () => {
    console.log('app is running on port ' + port)
  })