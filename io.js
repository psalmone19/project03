var io = require('socket.io')();
var moment = require('moment');
// Listen for new connections from clients (socket)
// io.on('connection', function (socket) {
//  console.log('Client connected to socket.io!');
// });

io.on('connection', function (socket) {
    console.log("user connected")
    socket.on('chat message', function (userData) {
        
        io.emit('chat message', userData);
    });
    // A User starts a path
    socket.on('startPath', function (data, sessionId) {
        console.log("start path")
        io.emit('startPath', data, sessionId);
    });
    // A User continues a path
    socket.on('continuePath', function (data, sessionId) {
        console.log("continue path")
        io.emit('continuePath', data, sessionId);
    });
    // A user ends a path
    socket.on('endPath', function (data, sessionId) {
        console.log("end path")
        io.emit('endPath', data, sessionId);
    });
    
    socket.on('clear-canvas', function () {
        io.emit('clear-canvas');
    });

    socket.on('enteredRoom', function(msg){
        io.emit('enteredRoom', msg);
    })
});


// io represents socket.io on the server - let's export it
module.exports = io;