// to pause a setInterval -- store the remaining time and resume on click


// html element
var displayTime, displaySession, displayBreak;
displayTime = document.querySelector('.display-time-amount');
displaySession = document.querySelector('.session-time-amount');
displayBreak = document.querySelector('.break-time-amount');

// ints
var timeLeft, sessionTimeAmount, breakTimeAmount;
timeLeft = document.querySelector('.display-time-amount').textContent;
sessionTimeAmount = parseInt(document.querySelector('.session-time-amount').textContent);
breakTimeAmount = parseInt(document.querySelector('.break-time-amount').textContent);

// buttons
var buttons, startButton, pauseButton, resetButton, substractSessionButton, subtractBreakButton, addSessionButton, addBreakButton;
buttons = document.querySelectorAll('button');
startButton = buttons[4];
pauseButton = buttons[5];
resetButton = buttons[6];
subtractSessionButton = buttons[0];
subtractBreakButton = buttons[2];
addSessionButton = buttons[1];
addBreakButton = buttons[3];

// support
var timerFlag, pauseFlag, sessionFlag, countdown, pauseTime;
timerFlag = 0; // 0 means off, 1 means on
pauseFlag = 0; // 0 means off, 1 means on
sessionFlag = 0; // 0 means session, 1 means break

// event listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', reset);
subtractSessionButton.addEventListener('click', lessSessionTime);
subtractBreakButton.addEventListener('click', lessBreakTime);
addSessionButton.addEventListener('click', moreSessionTime);
addBreakButton.addEventListener('click', moreBreakTime);





// event listener functions
function startTimer() {
    var seconds = 0;
    if (sessionFlag === 0) {
        timer(sessionTimeAmount, seconds);
    } else {
        timer(breakTimeAmount, seconds);
    }
}


function reset() {
    timerFlag = 0;
    pauseFlag = 0;
    sessionFlag = 0;
    
    clearInterval(countdown);
    sessionTimeAmount = 25;
    breakTimeAmount = 5;
    
    updateDisplay();
}


function lessSessionTime() {
    if (sessionTimeAmount > 5) {
        sessionTimeAmount--;
    } else {
        sessionTimeAmount = 5;
    }
    
    updateDisplay();
}


function lessBreakTime() {
    if (breakTimeAmount > 2) {
        breakTimeAmount--;
    } else {
        breakTimeAmount = 2;
    }
    
    updateDisplay();
}


function moreSessionTime() {
    if (sessionTimeAmount < 90) {
        sessionTimeAmount++;
    } else {
        sessionTimeAmount = 90;
    }
    
    updateDisplay();
}


function moreBreakTime() {
    if (breakTimeAmount < 30) {
        breakTimeAmount++;
    } else {
        breakTimeAmount = 30;
    }
    
    updateDisplay();
}





// supporting functions
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


function updateDisplay() {
    displaySession.textContent = '' + sessionTimeAmount;
    displayBreak.textContent = '' + breakTimeAmount;
    displayTime.textContent = sessionTimeAmount + ':00';
}