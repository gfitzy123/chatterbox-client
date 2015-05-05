// YOUR CODE HERE:



var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
}
app.init = function(){

$(document).ready(function(){
  $('body').on('click','.username', function(){
    console.log('clicked the '+ this)
    app.addFriend($(this))
  });
});

}
app.send = function(message, data){
  // args should be an object with
  // keys:
  //      type
  //      data
  //      url
  //      callback
  // if (!args['type'] || !args['data'] || !args['url']){
  //   return Error('oops missing some args "type", "data", "url"')
  // }

  $.ajax({ 
        type: "POST",
        url: app.server, // this is where we might add some API stuff
        data: JSON.stringify(message),
        success: function(data){
          console.log('chatterbox: message sent')
        },
        error: function(data){
          console.log('oops: chatterbox boxchattered')
        }
      })
}


app.fetch = function(message, data){

  var result = $.ajax({ 
        type: "GET",
        url: app.server,
        data: JSON.stringify(message),
        success: function(returnedData){
          return returnedData;
        },
        error: function(data){
          console.log('oops: chatterbox boxchattered')
        }
      })

}

app.clearMessages = function(){
  $('#chats').text('')
}

app.addMessage = function(message){
  // look into how to properly append
  var $chats = $('#chats')
  var $messageContainer = $('<div class="chat"></div>')
  $messageContainer.attr('username',message.username)
  var $username = $('<div class="username"></div>')
  var $text = $('<div class="text"></div>')
  var $roomname = $('<div class="roomname"></div>') // FIXME: // should be .room add an attribute such as roomname="namehere" ??

  $chats.append($messageContainer
    .append(
      $username.text(message.username), 
      $text.text(message.text), 
      $roomname.text(message.roomname)))

}

app.addRoom = function(roomName){
    // FIXME: add id roomname
  $('#roomSelect').append('<div class="rooms">' + JSON.stringify(roomName) + '</div>')
}

app.addFriend = function($userNameContext){
  var boldUser = $userNameContext.parent('div[username]').attr('username')
  $("div[username='" + boldUser + "']").css('font-weight','bold')
}

app.init()


// jQuery.post( url [, data ] [, success ] [, dataType ] )
// shorthand for
// $.ajax({
//   type: "POST",
//   url: url,
//   data: data,
//   success: success,
//   dataType: dataType
// });