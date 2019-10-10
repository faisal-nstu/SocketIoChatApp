const express = require('express');
const app = express();

// template engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
    res.render('index');
});

// port specify
server = app.listen(3000);

// initialize socket
const socketIo = require('socket.io')(server)

// listen on every connection
socketIo.on('connection', (socket) => {
    console.log('new user connected');

    // default username
    socket.username = 'ANONYMOUS';

    // listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username;
    });

    // listen on new_message
    socket.on('new_message', (data) => {
        // broadcast the new message
        socketIo.sockets.emit('new_message', { message: data.message, username: socket.username });
    })

     //listen on typing
     socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
});