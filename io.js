var io = require('socket.io')();
var moment = require('moment');
var _ = require('underscore');
// Listen for new connections from clients (socket)
// io.on('connection', function (socket) {
//  console.log('Client connected to socket.io!');
// });
var users = [];
var dictionary = ['apple', 'banana', 'chocolate', 'dog', 'duck', 'burrito', 'bone', 'skateboard', 'pumpkin', 'cactus', 'unicorn', 'ladder', 'taco', 'cat', 'dollar', 'bean', 'alien', 'diamond', 'frog', 'cookie'];

io.on('connection', function (socket) {
    console.log("user connected")
    socket.on('chat message', function (userData) {
        io.emit('chat message', userData);
    });
    // A User starts a path
    socket.on('startPath', function (data, sessionId) {
        io.emit('startPath', data, sessionId);
    });
    // A User continues a path
    socket.on('continuePath', function (data, sessionId) {
        io.emit('continuePath', data, sessionId);
    });
    // A user ends a path
    socket.on('endPath', function (data, sessionId) {
        io.emit('endPath', data, sessionId);
    });

    socket.on('clear-canvas', function () {
        io.emit('clear-canvas');
    });

    socket.on('enteredRoom', function (msg) {
        io.emit('enteredRoom', msg);
    });

    socket.on('addUser', function (sessionId) {
        users.push(sessionId);
        console.log(users);
    });

    socket.on('removeUser', function (sessionId) {
        var index = users.indexOf(sessionId);
        users.splice(index, 1);
    })

    socket.on('userTurn', function () {})

}); // io represents socket.io on the server - let's export it

setInterval(function () {
    io.emit('userTurn', {
        users: users[0],
        words: _.sample(dictionary)
    })
    var end = users.splice(0, 1)[0];
    users.push(end);
}, 10000);

module.exports = io;