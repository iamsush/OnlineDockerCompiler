var extension = {
  'C++' : 'cpp',
  'C' : 'c',
  'Python' : 'py',
  'Node JS' : 'js',
  'R' : 'something'
}

$("#submitButtonDirect").click(function(event){
  event.preventDefault();
  event.stopPropagation();
  var send = {
    code : $('#code').val(),
    language : $('#language').val(),
    args : $('#args').val(),
    exts : extension[$('#language').val()]
  };
  $.post('http://localhost:3000/code/online', send, function(data){
    $('#output').val(data);
    $(function() {
       $('#output').each(function() {
           $(this).height($(this).prop('scrollHeight'));
       });
   });
  }).fail(function(err){
    console.log(err)
  });
});

$("form#direct").submit(function(event){
  event.preventDefault();
  event.stopPropagation();
  var formData = new FormData(this);

  $.ajax({
    url: 'http://localhost:3000/code/file',
    data : formData,
    processData: false,
    contentType: false,
    type: 'POST',
    success: function(data){
      // $('#msg').text(data.msg.code);
      //$('#downloadButton').append('<button type="button" class="btn btn-primary">Primary</button>');
      console.log(data);
    }
  }).fail(function(err){
    console.log(err)
  });
});

// var socket = io();
// socket.on('compileComplete', function(data){
//   console.log(data);
// })

function myFunction(){
  var li = ""
  $.each($('#file-to-upload').prop("files"), function(k,v){
    var filename = v['name'];
    li = li + ('<li class="list-group-item">'+filename+'</li>');
  });
  $('#file-to-upload').next().after().text($('#file-to-upload').val().split('\\').slice(-1)[0]);
  document.getElementById("files").innerHTML = li;
}
