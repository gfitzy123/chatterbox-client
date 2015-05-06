// YOUR CODE HERE:
// TODO:

// preload lobby as default
// return lobby messages
// return unique roomnames
//  load previous room list

//  load previous room messages
//  create new room
//  create friend list
//


// The idea here is to get a basic idea of how to
// create an object structure to interact and log
// users, friends, and related functions between
// the two.
var users = {'JohnSnow' :{
                        'uid':1,
                        'friendlist':{'gretchin':{'uid':3}},
                        'password':'saltedHashBrowns',
                        'email':'johnsnow@castleblack.gov',
                        'messages':[1,2,3,4]
                      },
            'AnonUser_42' :{
                        'uid':2,
                        'friendlist':{'JohnSnow':{'uid':1}},
                        'password':'saltedHashBrowns2',
                        'email':'johnsnow@castleblack.gov',
                        'messages':[1,2,3,4]
                      },
            'gretchin' :{
                        'uid':3,
                        'friendlist':{'JohnSnow':{'uid':1}},
                        'password':'saltedHashBrowns2',
                        'email':'getchin@hillville.com',
                        'messages':[1,2,3,4]
                      }
            }


var app = {
  currentroom : 'FIXME!',
  server: 'https://api.parse.com/1/classes/chatterbox',
  returnedData : undefined
}

app.init = function(){
  
  $(document).ready(function(){
  // login box credentials
  $("#login").click(function(){
    var email = $("#email").val();
    var password = $("#password").val();
    // Checking for blank fields.
      if( email =='' || password ==''){
        // styling for empty/incorrect entry
        $('input[type="text"],input[type="password"]').css("border","2px solid red");
        $('input[type="text"],input[type="password"]').css("box-shadow","0 0 3px red");
        alert("Some fields were empty.");
      }else {
        // TODO
        // here we would do the login process
        // if email && password
        console.log(email, password)
      }
    });
    // TODO
    // Intention: addFriend to users[user].friendlist
    // Change styling on click?
    $('body').on('click','.username', function(){
      console.log('clicked the '+ this)
      app.addFriend($(this))
    });

    $('.inputMessage').on('keydown', function(e){
      if(e.keyCode === 13){
        e.preventDefault()
        var message = app.formMessage()
        app.addMessage(message)
        app.handleSubmit(message)
        $('.inputMessage').val('')
        app.fetchAndRenderMessages();
      }
    })

    $('form.new-message').on('submit', function(e){
      e.preventDefault()
      var message = app.formMessage()
      app.addMessage(message)
      app.handleSubmit(message)
      $('.inputMessage').val('')
      app.fetchAndRenderMessages();
      }
    )
  });
  app.pollMessages()
}
app.send = function(message, data, relativeApiPath){
  // check if send request contains a relative path API call
  // else default appends to 'app.server'
  relativeApiPath ? relativeApiPath : relativeApiPath = ''
  $.ajax({ 
        type: "POST",
        url: app.server + relativeApiPath,
        data: JSON.stringify(message),
        contentType: 'application/json',
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
  relativeApiPath ? relativeApiPath : relativeApiPath = '?order=-createdAt'
  return $.ajax({ 
        type: "GET",
        url: app.server + relativeApiPath,
        data: message,
        success: function(returnedData){
          return returnedData
        },
        error: function(data){
          console.log('oops: chatterbox boxchattered')
        }
      })

}

app.clearMessages = function(){
  $('#chats').text('')
}

app.formMessage = function(){
  var inputMessage = $('.inputMessage').val();
  var userName = $('.loginName').val();
  // validating that text is entered
  if(inputMessage && userName){
    var message = { username : userName,
                     text : inputMessage,
                     roomname : app.currentroom  }
  }
  return message
}


app.renderMessages = function(messages){

  $('#chats').empty().append(
    _.map(messages.results,function(msg) {
      return $('<div class="chat">').append(
        $('<span class="roomname">').text("[" + msg.roomname + "] "),
        $('<strong class="username">').text(msg.username),
        $('<span class="text">').text(" " + msg.text)
      )
    })  
)}

app.fetchAndRenderMessages = function () {
  console.log('tick')
  app.fetch().then(app.renderMessages)
}

app.pollMessages = function(){
  app.fetchAndRenderMessages();
  setInterval(app.fetchAndRenderMessages, 20000)
}



app.addMessage = function(message){
  // look into how to properly append
  var $chats = $('#chats')
  var $messageContainer = $('<div class="chat"></div>')
  $messageContainer.attr('username',message.username ? message.username : 'ANON')
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

  var boldUser = $userNameContext.siblings('span');
  console.log(boldUser)
  $(boldUser).each(function(i){
    $(boldUser[i]).css('font-weight','bold')
  })
}

app.handleSubmit = function(message){
  var data = 'FIXME' // [u'username', u'objectId', u'text', u'roomname', u'updatedAt', u'createdAt']
  var relativeApiPath = undefined // FIXME
  app.send(message, data, relativeApiPath)
}


app.init()