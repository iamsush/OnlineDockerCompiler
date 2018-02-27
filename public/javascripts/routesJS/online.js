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
    exts : extension[$('#language').val()],
    socket: 0
  };
  $.post('http://localhost:3000/code/online', send, function(data){
    console.log(data);
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
