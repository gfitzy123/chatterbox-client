// YOUR CODE HERE:

var app = {}
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
        url: "https://api.parse.com/1/classes/chatterbox",
        data: JSON.stringify(message),
        success: function(data){
          console.log('chatterbox: message sent')
        },
        error: function(data){
          console.log('oops: chatterbox boxchattered')
        }
      })
}


app.fetch = function(){
  
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