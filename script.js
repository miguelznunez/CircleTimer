const circle = document.getElementsByClassName('progress-ring__circle_meter')[0],
    radius = circle.r.baseVal.value,
    circumference = radius * 2 * Math.PI;
var timeBegan = null,
    timeStopped= null,
    stoppedDuration = 0,
    started = null,
    on = false;

circle.style.strokeDasharray = circumference + " " + circumference;
circle.style.strokeDashoffset = circumference;

circle.addEventListener("click", function(){
    if(on == false){
        startTimer();
        on = true;
    }
    else{
        stopTimer();
        on = false;
    } 
});

circle.addEventListener("dblclick", function(){
    resetTimer();
});

function setProgress(percent){
  const offset = circumference - percent / 60 * circumference;
  circle.style.strokeDashoffset = offset;
}

function startTimer(){
    if (timeBegan === null) {
        timeBegan = new Date();
    }

    if (timeStopped !== null) {
        stoppedDuration += (new Date() - timeStopped);
    }

    started = setInterval(clockRunning, 10);
}

function stopTimer(){ 
    timeStopped = new Date();
    clearInterval(started);
}

function resetTimer(){
    clearInterval(started);
    timeBegan = null;
    timeStopped = null;
    stoppedDuration = 0;
    document.getElementById("time-display").innerHTML = "00:00.00";
    setProgress(0);
    on = false;
}

function clockRunning(){
    var currentTime = new Date(),
        timeElapsed = new Date(currentTime - timeBegan - stoppedDuration),
        minutes = timeElapsed.getUTCMinutes(),
        seconds = timeElapsed.getUTCSeconds(),
        milliseconds = timeElapsed.getUTCMilliseconds();

    milliseconds = Math.floor(milliseconds/10);
    
    document.getElementById("time-display").innerHTML = 
    (minutes = minutes < 10 ? "0" + minutes:minutes) + ":"+
    (seconds = seconds < 10 ? '0' + seconds:seconds) + "." +
    (milliseconds = milliseconds < 10 ? '0' + milliseconds:milliseconds);

    setProgress(seconds);
}
