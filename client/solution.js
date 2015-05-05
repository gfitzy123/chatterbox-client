
function fetchMessages () {
  return $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    type: 'GET',
    contentType: 'application/json'
  })
  .then(function(response) {
    return response.results.reverse()
  })
}


function renderMessages (messages) {
  console.log("Rendering messages")
  $('#messages').empty().append(
    messages.map(function(msg) {
      return $('<div class="chat">').append(
        $('<span class="roomname">').text("[" + msg.roomname + "] "),
        $('<strong class="username">').text(msg.username),
        $('<span class="text">').text(" " + msg.text)
      )
    })
  )
}

function fetchAndRenderMessages () {
  fetchMessages().then(renderMessages)
}

function pollMessages () {
  fetchAndRenderMessages()
  setInterval(fetchAndRenderMessages, 3000)
}

pollMessages()


$('form.new-message').on('submit', function (e) {
  e.preventDefault()
  var messageText = e.currentTarget.message.value
  console.log("Sending message:", messageText)
  // Clear the input field
  e.currentTarget.message.value = ''

  createMessage({
    text: messageText,
    roomname: 'public',
    username: getCurrentUsername()
  })
  .then(fetchAndRenderMessages)
})


function createMessage (messageObj) {
  return $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(messageObj),
    contentType: 'application/json'
  })
}

