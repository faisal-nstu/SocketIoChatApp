$(function(){
    // make connection
    var socket = io.connect('http://localhost:3000');

    // buttons and inputs
    var message = $('#message');
    var username = $('#username');
    var sendMessage = $('#send_message');
    var sendUsername = $('#send_username');
    var chatRoom = $('#chat_room');
    var feedback = $('#feedback');

    // emit message
    sendMessage.click(function(){
        socket.emit('new_message', { message: message.val() });
        message.val('');
    });

    // listen in  new_message
    socket.on('new_message', (data) => {
        console.log('NEW MESSAGE: ', data.message);

        // clear
        feedback.html('');

        chatRoom.append(`<p class='message'> ${data.username}: ${data.message} </p>`)
    });
    
    // emit a username
    sendUsername.click(function(){
        console.log('USER NAME: ', username.val());
        socket.emit('change_username', { username: username.val() })
    });

    // notify typing
    message.bind('keypress', () => {
        socket.emit('typing');
    });

    // listen on typing
    socket.on('typing', (data) => {
        feedback.html(`<p><i>${data.username} is typing message...</i></p>`);
    });
});