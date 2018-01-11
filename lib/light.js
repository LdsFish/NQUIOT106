require("webduino-js");
require("webduino-blockly");
var firebase = require('firebase');

var firebase;
var blue;
var red;
var config = {
  databaseURL: "https://chatbot-firebase-c52b9.firebaseio.com/"
};

firebase.initializeApp(config);
var database = firebase.database().ref();

console.log('裝置連線中...');

boardReady({device: 'Rml1'}, function(board) {
  board.systemReset();
  board.samplingInterval = 250;
  blue = getLed(board, 10);
  red = getLed(board, 7);
  database.push({
    name: '智慧燈泡',
    content: '我上線囉！',
    time: getTime()
  });

  var event = [
    {
     text:'開燈',
     msg:'燈泡已經打開！',
     fn:function(){blue.on();},
     
    }, {
     text:'開燈',
   
     fn:function(){red.off();},
    },
    {
     text:'關燈',
     msg:'燈泡已經關起來了！',
     fn:function(){blue.off();}
    }, {
     text:'關燈',
     fn:function(){red.on();}
    },
    {
     text:'全關',
     msg:'close it all！',
     fn:function(){blue.off();}
    },
    {
     text:'全關',
     fn:function(){red.off();}
    },
    {
     text:'閃爍',
     msg:'一閃一閃亮晶晶~',
     fn:function(){blue.blink(500);}
    },     {
     text:'閃爍',
    
     fn:function(){red.blink(1000);}
    }
    
  ];


  database.limitToLast(1).on('value', function(snapshot) {
    var s = {};
    for(var i in snapshot.val()){
      s = snapshot.val()[i];
      console.log('('+s.time+') '+s.name+' 說：'+s.content);
      for(var j in event){
        if(s.content.indexOf(event[j].text)!=-1){
          
          event[j].fn();
          database.push({
            name: '智慧燈泡',
            content:event[j].msg,
            time: getTime()
          });
        }
      }     
    }
  });
});


function getTime() {
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  if (h < 10) {
    h = '0' + h;
  }
  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }
  var now = h + ':' + m + ':' + s;
  return now;
}
