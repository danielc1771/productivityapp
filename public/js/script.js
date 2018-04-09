

(function($) {
    $.fn.clickToggle = function(func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function() {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };
}(jQuery));


// $(".timerButton").click(function(){
// 	var name = $(this).attr("name");
// 	startTimer(name);
// });

var timer;
var totalTime;
$(".timerButton").clickToggle(function() {
	var name = $(this).attr("name");
  	startTimer(name);
}, function() {
	var name = $(this).attr("name");
	console.log(totalTime);
	clearInterval(timer);
  	$("button[name="+name+"]").text("Start Timer");
});


function startTimer(name){
	$("button[name="+name+"]").text("0:00:00");
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	totalTime = 0;
	var clicked = false;
	timer = setInterval(function() {
		if(seconds < 59) {
			seconds++;
			if(seconds < 10 && minutes < 10) {
				$("button[name="+name+"]").text("0:0" + minutes + ":0" + seconds);
			}
			else if(seconds < 10 && minutes >= 10) {
				$("button[name="+name+"]").text("0:" + minutes + ":0" + seconds);
			}
			else if(seconds >= 10 && minutes >= 10) {
				$("button[name="+name+"]").text("0:" + minutes + ":" + seconds);
			}
			else if(seconds >= 10 && minutes < 10) {
				$("button[name="+name+"]").text("0:0" + minutes + ":" + seconds);
			}	
			
		} else {
			seconds = 0;
			minutes++;
		} 
		totalTime = seconds + (minutes * 60) + (hours * 3600);
	}, 1000);

}

