const express = require('express')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const cors = require('cors')

// ====== PATH PUBLIC ======
var path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html')
})

// ====== CORS ======
app.use(cors())

// ====== Socket.io ======

io.on('connection', (socket) => {
  console.log('user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
  })
  socket.broadcast.emit('Welcome!')
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

http.listen(8080, () => {
  console.log('listening on:8080')
})
