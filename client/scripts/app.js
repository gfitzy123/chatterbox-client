// establish a basic object/database schema structure to interact and log
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

<<<<<<< HEAD
var app = {
  currentroom : 'public',
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

    // On pressing "enter" submit ".inputMessage" to
    // server and window 
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

    // On clicking/pressing "enter" submit new
    // message
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

  // begin setInterval to pull in new
  // messages
  app.pollMessages()
}

app.ajaxCall = function(message, type, relativeApiPath){
  // check if type of ('GET', 'POST', ???) 
  // POST requires a JSON.strinify
  // request contains a relative path API call
  // or ObjectID
  // else default to 'app.server'
  // relativeApiPath ? relativeApiPath : relativeApiPath = ''
  //
  // Example Usage
  //  See: app.send() OR app.fetch()
  //  app.fetch({'order':'-createdAt', 'limit':'10'}).then(callback)
  //  app.fetch().then(app.renderMessages)
  relativeApiPath ? relativeApiPath : relativeApiPath = ''
  if (type === 'POST'){
    message = JSON.stringify(message)
  }
  return $.ajax({ 
        type: type,
        url: app.server + relativeApiPath,
        data: message,
        contentType: 'application/json',
        success: function(data){
          console.log('chatterbox: message sent')
          return data
        },
        error: function(data){
          console.log('oops: chatterbox boxchattered')
        }
      })
}

app.send = function(message, relativeApiPath){
  return app.ajaxCall(message,'POST', relativeApiPath)
}


app.fetch = function(message, relativeApiPath){
  return app.ajaxCall(message, 'GET', relativeApiPath)

}

app.clearMessages = function(){
  $('#chats').text('')
}

app.formMessage = function(){
  // create a message object from the
  // ".inputbox" 
  var inputMessage = $('.inputMessage').val();
  var userName = $('.loginName').val();
  // validating that text is entered
  if(inputMessage && userName){
    var message = { username : userName,
                     text : inputMessage,
                     roomname : app.currentroom  }
  }
  return message;
}


app.renderMessages = function(messages){
  // renders sanitized jQuery text
  // being used as a callback i.e.
  // app.fetch().then(app.renderMessages)
  // See: function below

  // TODO ???
  // check if msg.roomname && msg.username && msg.text
  $('#chats').empty().append(
    // message ==== [u'results': [msgObject, msgObject, msgObject]]
    _.map(messages.results, function(msg) {
      return $('<div class="chat">').append(
        $('<span class="roomname">').text("[" + msg.roomname + "] "),
        $('<strong class="username">').text(msg.username),
        $('<span class="text">').text(" " + msg.text)
      )
    })  
)}

app.fetchAndRenderMessages = function () {
  app.fetch().then(app.renderMessages)
}

app.pollMessages = function(){
  // begin messages refresh
  app.fetchAndRenderMessages();
  setInterval(app.fetchAndRenderMessages, 20000)
}



app.addMessage = function(message){
  $('#chats')
    .append($('<div class="chat"></div>')
        // check if message.username exists else default to ANON
        .attr('username',message.username ? message.username : 'ANON')
    )
    .append($('<div class="username"></div>').text(message.username), 
            $('<div class="text"></div>').text(message.text), 
            $('<div class="roomname"></div>').text(message.roomname)
    )
}

//TODO Allows the user to implement a new room of choice
app.addRoom = function(roomName){
  $('#roomSelect').append('<div class="rooms">' + JSON.stringify(roomName) + '</div>')
}

//TODO enable the user to add and view an arbitrary number of selected friends
//include implmenetation of a friends list/container/buttonthing
app.addFriend = function($userNameContext){
  var boldUser = $userNameContext.siblings('span');
  console.log(boldUser)
  $(boldUser).each(function(i){
    $(boldUser[i]).css('font-weight','bold')
  })
}


app.handleSubmit = function(message){
  var data = 'FIXME missing data?' // [u'username', u'objectId', u'text', u'roomname', u'updatedAt', u'createdAt']
  app.send(message)
}


app.init()
=======

 var app = {
	server: 'https://api.parse.com/1/classes/chatterbox',
	friends: [],
	rooms: {},
  currentRoom: "Global",
  collectionOfRoomNames: [],
	init: function() {
    app.fetch()
  },
	send: function(message) { 
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function() {
        console.log('chatterbox: Successfully posted message');
      },
      error: function() {
        console.log('chatterbox: Failed to post message');
      }
    });
  },

  //Create function "get" messages, with setInterval, fetch, parse data, call displayMessages

  displayMessages: function(messages) {
    for (var i = 0; i < messages.length; i++) {

      if (messages[i].roomname === app.currentRoom) {
        var message = messages[i];
        var username = app.htmlEscape(message.username);
        var text = message.text;
        var roomname = app.htmlEscape(message.roomname);

        var messageClean = { 
        "username": username,
        "message": text,
        "roomname" : roomname
        }
          app.addMessage(messageClean);
      }
      }
    },
	fetch: function() { 
		$.ajax({
			url: 'https://api.parse.com/1/classes/chatterbox',
			type: 'GET',
			data: "unknown",
			success: function(response) {
        // Grab the message array, call displayMessages with it
        var messages = response.results;

        app.displayMessages(messages)
        app.addNewRooms(messages)
				console.log("chatterbox: Sucessfully fetched");
				},
			error: function() {
				console.log('chatterbox: Failed to get message');
				}
		});
	},
	clearMessages: function() { 
	 $('#chats').children().remove();
	},
	addMessage: function(message) {
    var username = message.username;
    var text = message.message
    console.log("supsup", text)
    var roomname = message.roomname
    
		var messageAppend =
          '<div class="message">' +
              '<button class="username">' + username + '</button>' + 
              '<a class="roomname">' + roomname + '</a>' +
          '<p class="' + username + '">' + text + '</p>' +
        '</div>';

      
      $("div#chats").append(messageAppend);
      
	},
  htmlEscape: function(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')

  },
  addNewRooms: function(messages) {
    var $roomSelect = $("select#roomSelect")
    
    for (var j = 0; j < messages.length; j++) {
      if (app.collectionOfRoomNames.indexOf(messages[j].roomname) < 0) {
          var room = app.htmlEscape(messages[j].roomname)
          app.collectionOfRoomNames.push(room)
      }
    }
    for (var k = 0; k < app.collectionOfRoomNames.length; k++) {
    $roomSelect.append('<option>' + app.collectionOfRoomNames[k] + '</option>');
    }
  },
	addRoom: function(roomname) {
    var $roomSelect = $("select#roomSelect")
    $roomSelect.append('<option>' + roomname + '</option>');
  },
  addFriend: function() {
  },
  handleSubmit: function() {

		var username = $("input#user").val()
		var message = $("textarea#message").val()
		var roomname = app.currentRoom
		var message = { 
			"username": username,
			"text": message,
			"roomname" : roomname
		}
		app.send(message)
    app.addMessage(message)
	},

  enterRoom: function(roomname) {
  },
 
  filterRoom: function(roomName) {
    this.clearMessages();
    this.currentRoom = roomName;
    this.fetch();
  },
}

$(document).on('click', '.username', function() {
  app.addFriend();
  // var friend = $(this).text()
});

$(document).on('click', '.display', function() {
  app.displayMessages();
});

$(document).on('click', '.create', function() {
  var roomname = $("input#room").val()
  app.addRoom(roomname);
});


$(document).on('click', '.submit', function(e) {
  e.preventDefault();
  app.handleSubmit();
});

$(document).on('change', '#roomSelect', function() {
  var roomname = $("option:selected").text()
  app.filterRoom(roomname);
});

$(document).on('click', 'button', function() {
  var friendName = $(this).text();
  app.friends.push(friendName)
  $("ul#friends").append("<div>" + friendName + "</div>");
  $("p." + friendName + "").css('font-weight','bold')

  });

$(document).ready(function(){
  app.init();
});


 








>>>>>>> 435cdf4500258f238179a5b6507f2f215e05414b
