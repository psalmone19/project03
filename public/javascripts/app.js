// socket by Egan & Antonio
document.addEventListener("DOMContentLoaded", function () {
    var socket = io();
    var nickName = '';
    var $nickName = $('#nickName');
    var start = $('#startButton');

    $('#nicknamePOP').modal('show');
    $('form').submit(function () {
        socket.emit('chat message', `${$('#m').val()};${nickName}`);
        $('#m').val('');
        return false;
    });


    socket.on('chat message', function (userData) {
        var data = userData.split(';');
        var momentTimestamp = moment.utc(data[0].timestamp);
        if (nickName.length > 0) {
            data[0].timestamp = moment().valueOf()
            $('#messages').append($('<i class="fa fa-commenting-o" aria-hidden="true" id="upMsg">').text(' ' + data[1] + ': ' + data[0] + ' ' + momentTimestamp.local().format('h:mm a')));
        } else {
            $('#nicknamePOP').modal('show');
        }
    })

    $('#submitName').click(function () {
        nickName = $nickName.val()
        $('#nicknamePOP').modal('hide');
        if (nickName.length > 0) {
            socket.emit('enteredRoom', nickName)
        }
    })
    
    socket.on('enteredRoom', function (msg) {
        $('#messages').append($('<i class="fa fa-commenting-o" aria-hidden="true" id="upMsg">').text(' ' + msg + ' has entered the room '))
    });
    
    socket.on('startGame', function (timer) {
         $('#timer').html(timer);
    })

    start.click(function() {
        socket.emit('startGame');
    })
});