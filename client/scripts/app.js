// YOUR CODE HERE:
// TODO:
// preload lobby as default
// return lobby messages
// return unique roomnames
//  load previous room list

// Craft GET / POST messages
// and callback handling
//  load previous room messages
//  create new room
//  create friend list
//
//  setInterval? for refresh
//  refresh on addMessage



var app = {
  currentroom : 'FIXME!',
  server: 'https://api.parse.com/1/classes/chatterbox',
}
app.init = function(){
  app.fetch({'order':'-updatedAt'})
  $(document).ready(function(){
    $('body').on('click','.username', function(){
      console.log('clicked the '+ this)
      app.addFriend($(this))
    });

    $('.submit').on('click', function(){
      var inputMessage = $('.inputMessage').val();
      var userName = $('.loginName').val();
      // validating that text is entered
      if(inputMessage && userName){
        var message = { username : userName,
                         text : inputMessage,
                         roomname : app.currentroom  }
        app.addMessage(message)
        app.handleSubmit(message)
        $('.inputMessage').val('')
      }
    })
  });
}
app.send = function(message, data, relativeApiPath){
  // args should be an object with
  // keys:
  //      type
  //      data
  //      url
  //      callback
  // if (!args['type'] || !args['data'] || !args['url']){
  //   return Error('oops missing some args "type", "data", "url"')
  // }

  // check if send request contains a relative path API call
  // else default appends to 'app.server'
  relativeApiPath ? relativeApiPath : relativeApiPath = ''
  $.ajax({ 
        type: "POST",
        url: app.server + relativeApiPath, // this is where we might add some API stuff
        data: message,
        success: function(data){
          console.log(data)
          console.log('chatterbox: message sent')
        },
        error: function(data){
          console.log('oops: chatterbox boxchattered')
        }
      })
}


app.fetch = function(message, data, relativeApiPath){
  // check if fetch request contains a relative API call
  // else default
  relativeApiPath ? relativeApiPath : relativeApiPath = ''
  debugger;
  var result = $.ajax({ 
        type: "GET",
        url: app.server + relativeApiPath,
        data: message,
        success: function(returnedData){
          console.log(returnedData)
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

app.handleSubmit = function(message){
  var data = 'FIXME' // [u'username', u'objectId', u'text', u'roomname', u'updatedAt', u'createdAt']
  var relativeApiPath = undefined // FIXME
  app.send(message, data, relativeApiPath)
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