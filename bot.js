var firebase;
$(function(){
  var $name = $('#name'),
      $content = $('#content'),
      $btn = $('#btn'),
      $show = $('#show'),
      ms = new Date().getTime();
  var config = {
    databaseURL: "https://chatbot-firebase-c52b9.firebaseio.com/"
  };
  firebase.initializeApp(config);
  var database = firebase.database().ref();
  
  $btn.on('click',write);
  $content.on('keydown', function(e){
    if(e.keyCode == 13){
      write();
    }
  });
  
  function write(){
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if(h<10){
      h = '0'+h;
    }
    if(m<10){
      m = '0' + m;
    }
    if(s<10){
      s = '0' + s;
    }
    var now = h+':'+m+':'+s;
    var postData = {
      name:$('#name').val(),
      content:$('#content').val(),
      time:now,
      id:'id'+ms
    };
    database.push(postData);
    $content.val('');
  }
  
  database.once('value', function(snapshot) {
    $show.html('');
    for(var i in snapshot.val()){
       $show.prepend('<div><div>'+snapshot.val()[i].time+'</div>'+snapshot.val()[i].name+' 說：'+snapshot.val()[i].content+'</div>');
    }
  });

  database.limitToLast(1).on('value', function(snapshot) {
    for(var i in snapshot.val()){
       $show.prepend('<div class="'+snapshot.val()[i].id+'"><div>'+snapshot.val()[i].time+'</div>'+snapshot.val()[i].name+' 說：'+snapshot.val()[i].content+'</div>');
    }
    $show.find('.id'+ms).css({
      color:'#f00'
    });
    $show.find('.id'+ms+' div').css({
      color:'#f00'
    });
  });
  
  
});