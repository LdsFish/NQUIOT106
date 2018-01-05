var led1;
var led2;
var timer;


boardReady({device: ''}, function (board) {
  board.systemReset();
  board.samplingInterval = 20;
  led1 = getLed(board, 10);
  led2 = getLed(board, 11);
  document.getElementById("demo-area-02-light").addEventListener("click", function(){
    if (document.getElementById("demo-area-02-light").className == "off") {
      document.getElementById("demo-area-02-light").className = "on";
      var repeat = function(){
        var time;
        var repeatDelay = function(time){
          return new Promise(function(resolve){
            timer = setTimeout(resolve,time);
          });
        };
        var repeatPromise = function(){
          repeatDelay(1).then(function(){
              led1.on();
        led2.off();
            return repeatDelay(500);
          }).then(function(){
              led1.off();
        led2.on();
            return repeatDelay(500);
          }).then(function(){
              repeatPromise();
          });
        };
        repeatPromise();
      };
      repeat();
    } else {
      document.getElementById("demo-area-02-light").className = "off";
      clearTimeout(timer);
      led1.off();
      led2.off();
    }
  });
});
