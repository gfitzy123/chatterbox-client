// YOUR CODE HERE:


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


 








