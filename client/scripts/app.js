// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'
}
app.init = function(){

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





// jQuery.post( url [, data ] [, success ] [, dataType ] )
// shorthand for
// $.ajax({
//   type: "POST",
//   url: url,
//   data: data,
//   success: success,
//   dataType: dataType
// });