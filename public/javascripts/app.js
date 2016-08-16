// socket by Egan & Antonio
document.addEventListener("DOMContentLoaded", function() {

   // get our connection to the socket.io server
   var socket = io();
//    console.log(socket);

  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<i class="fa fa-commenting-o" aria-hidden="true" id="upMsg">').text(msg));
  })
});
