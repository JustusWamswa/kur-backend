require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
// const eventRoutes = require('./routes/eventRoutes')
// const opportunityRoutes = require('./routes/opportunityRoutes')
// const messageRoutes = require('./routes/messageRoutes')



const app = express()

// enable CORS for all routes
app.use(cors());

const port = process.env.PORT || 5000
const dbUri = process.env.MONGODB_URI;

// middleware to parse request body
app.use(express.json())

// routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
// app.use('/api/event', eventRoutes)
// app.use('/api/opportunity', opportunityRoutes)
// app.use('/api/message', messageRoutes)

// const http = require('http')
// const server = http.createServer(app)
// const { Server } = require("socket.io")
// const io = new Server(server, {
//   cors: {
//     origin: "*"
//   }
// })

// io.on('connection', (socket) => {

//   socket.on('send_post', (data) => {
//     // TODO 
//     // save the post to db

//     // show post to everyone
//     socket.broadcast.emit('receive_post', data)
//   })
// })

// connect to mongodb
mongoose.connect(dbUri)
  .then((res) => {
    console.log("Successfully connected to MongoDB")
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch(err => console.log(err))



app.get('/', function (req, res) {
  res.send('Hello World')
})

module.exports = app