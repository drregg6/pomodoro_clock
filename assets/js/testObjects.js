var displayTime = document.querySelector('.display-time-amount');
var timeLeft = document.querySelector('.display-time-amount').textContent;
var sessionTimeAmount = parseInt(document.querySelector('.session-time-amount').textContent);
var breakTimeAmount = parseInt(document.querySelector('.break-time-amount').textContent);

var startButton = document.querySelectorAll('button')[4];
var sessionFlag = 0; // 0 means session, 1 means break


startButton.addEventListener('click', startTimer);


function startTimer() {
    var seconds = 0;
    if (sessionFlag === 0) {
        timer(sessionTimeAmount, seconds);
    } else {
        timer(breakTimeAmount, seconds);
    }
}


function timer(minutes, seconds) {
    countdown = setInterval(function() {
        
        if (minutes === 0 && seconds === 0) {
            
            if (sessionFlag === 0) {
                timeLeft = breakTimeAmount + ':' + '00';
                sessionFlag += 1;
            } else {
                timeLeft = sessionTimeAmount + ':' + '00';
                sessionFlag -= 1;
            }
            
            clearInterval(countdown);
            
        } else if (seconds === 0) {
            seconds = 59;
            minutes--;
            timeLeft = minutes + ':' + seconds;
        } else if (seconds <= 10) {
            seconds--;
            timeLeft = minutes + ':0' + seconds;
        } else {
            seconds--;
            timeLeft = minutes + ':' + seconds;
        }
        
        displayTime.textContent = timeLeft;
        
    }, 1000);
};